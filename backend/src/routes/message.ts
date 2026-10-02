import { Router } from "express";
import { prisma } from "../lib/prisma.js";

import {
  authenticate,
  authorize,
  type AuthenticatedRequest,
} from "../middleware/auth.js";

import { createNotification } from "../services/notification.service.js";

const router = Router();

/**
 * Customer creates or gets a conversation with a provider
 */
router.post(
  "/conversations",
  authenticate,
  authorize("CUSTOMER"),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { providerId } = req.body;

      if (!providerId) {
        return res.status(400).json({
          success: false,
          message: "Provider is required",
        });
      }

      const provider = await prisma.providerProfile.findUnique({
        where: {
          id: providerId,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      if (!provider) {
        return res.status(404).json({
          success: false,
          message: "Provider not found",
        });
      }

      if (provider.verificationStatus !== "VERIFIED") {
        return res.status(400).json({
          success: false,
          message: "This provider is not currently verified",
        });
      }

      const conversation = await prisma.conversation.upsert({
        where: {
          customerId_providerId: {
            customerId: req.user!.id,
            providerId: provider.id,
          },
        },
        update: {},
        create: {
          customerId: req.user!.id,
          providerId: provider.id,
        },
        include: {
          provider: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
          messages: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });

      return res.status(200).json({
        success: true,
        data: {
          conversation,
        },
      });
    } catch (error) {
      console.error("Create conversation error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to create conversation",
      });
    }
  }
);

/**
 * Send a message
 */
router.post(
  "/conversations/:conversationId/messages",
  authenticate,
  async (req: AuthenticatedRequest, res) => {
    try {
      const conversationId = String(req.params.conversationId);
      const { content } = req.body;

      if (!content || !content.trim()) {
        return res.status(400).json({
          success: false,
          message: "Message content is required",
        });
      }

      const conversation = await prisma.conversation.findUnique({
        where: {
          id: conversationId,
        },
        include: {
          provider: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          customer: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      if (!conversation) {
        return res.status(404).json({
          success: false,
          message: "Conversation not found",
        });
      }

      const isCustomer =
        conversation.customerId === req.user!.id;

      const isProvider =
        conversation.provider.userId === req.user!.id;

      if (!isCustomer && !isProvider) {
        return res.status(403).json({
          success: false,
          message: "You do not have access to this conversation",
        });
      }

      const message = await prisma.message.create({
        data: {
          conversationId,
          senderId: req.user!.id,
          content: content.trim(),
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      await prisma.conversation.update({
        where: {
          id: conversationId,
        },
        data: {
          updatedAt: new Date(),
        },
      });

      const recipientId = isCustomer
        ? conversation.provider.user.id
        : conversation.customer.id;

      await createNotification({
        userId: recipientId,
        title: "New Message",
        message: `You received a new message from ${message.sender.name}.`,
        type: "MESSAGE",
      });

      return res.status(201).json({
        success: true,
        message: "Message sent successfully",
        data: {
          message,
        },
      });
    } catch (error) {
      console.error("Send message error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to send message",
      });
    }
  }
);

/**
 * Get conversation messages
 */
router.get(
  "/conversations/:conversationId/messages",
  authenticate,
  async (req: AuthenticatedRequest, res) => {
    try {
      const conversationId = String(req.params.conversationId);

      const conversation = await prisma.conversation.findUnique({
        where: {
          id: conversationId,
        },
      });

      if (!conversation) {
        return res.status(404).json({
          success: false,
          message: "Conversation not found",
        });
      }

      const provider = await prisma.providerProfile.findUnique({
        where: {
          id: conversation.providerId,
        },
        select: {
          userId: true,
        },
      });

      if (!provider) {
        return res.status(404).json({
          success: false,
          message: "Provider not found",
        });
      }

      const isCustomer =
        conversation.customerId === req.user!.id;

      const isProvider =
        provider.userId === req.user!.id;

      if (!isCustomer && !isProvider) {
        return res.status(403).json({
          success: false,
          message: "You do not have access to this conversation",
        });
      }

      const messages = await prisma.message.findMany({
        where: {
          conversationId,
        },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return res.json({
        success: true,
        data: {
          messages,
        },
      });
    } catch (error) {
      console.error("Fetch messages error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch messages",
      });
    }
  }
);

/**
 * Mark conversation messages as read
 */
router.patch(
  "/conversations/:conversationId/read",
  authenticate,
  async (req: AuthenticatedRequest, res) => {
    try {
      const conversationId = String(req.params.conversationId);

      const conversation = await prisma.conversation.findUnique({
        where: {
          id: conversationId,
        },
      });

      if (!conversation) {
        return res.status(404).json({
          success: false,
          message: "Conversation not found",
        });
      }

      const provider = await prisma.providerProfile.findUnique({
        where: {
          id: conversation.providerId,
        },
        select: {
          userId: true,
        },
      });

      if (!provider) {
        return res.status(404).json({
          success: false,
          message: "Provider not found",
        });
      }

      const isCustomer =
        conversation.customerId === req.user!.id;

      const isProvider =
        provider.userId === req.user!.id;

      if (!isCustomer && !isProvider) {
        return res.status(403).json({
          success: false,
          message: "You do not have access to this conversation",
        });
      }

      await prisma.message.updateMany({
        where: {
          conversationId,
          senderId: {
            not: req.user!.id,
          },
          isRead: false,
        },
        data: {
          isRead: true,
        },
      });

      return res.json({
        success: true,
        message: "Messages marked as read",
      });
    } catch (error) {
      console.error("Mark messages as read error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to mark messages as read",
      });
    }
  }
);

/**
 * Get customer's conversations
 */
router.get(
  "/conversations/customer",
  authenticate,
  authorize("CUSTOMER"),
  async (req: AuthenticatedRequest, res) => {
    try {
      const conversations = await prisma.conversation.findMany({
        where: {
          customerId: req.user!.id,
        },
        include: {
          provider: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
          messages: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
            include: {
              sender: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
      });

      return res.json({
        success: true,
        data: {
          conversations,
        },
      });
    } catch (error) {
      console.error("Fetch customer conversations error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch conversations",
      });
    }
  }
);

/**
 * Get provider's conversations
 */
router.get(
  "/conversations/provider",
  authenticate,
  authorize("PROVIDER"),
  async (req: AuthenticatedRequest, res) => {
    try {
      const provider = await prisma.providerProfile.findUnique({
        where: {
          userId: req.user!.id,
        },
      });

      if (!provider) {
        return res.status(404).json({
          success: false,
          message: "Provider profile not found",
        });
      }

      const conversations = await prisma.conversation.findMany({
        where: {
          providerId: provider.id,
        },
        include: {
          customer: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
          messages: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
            include: {
              sender: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
      });

      return res.json({
        success: true,
        data: {
          conversations,
        },
      });
    } catch (error) {
      console.error("Fetch provider conversations error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch conversations",
      });
    }
  }
);

export default router;