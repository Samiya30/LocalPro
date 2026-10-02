import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { authenticate, } from "../middleware/auth.js";
const router = Router();
/**
 * Create or get a conversation between two users
 */
router.post("/conversations", authenticate, async (req, res) => {
    try {
        const { participantId } = req.body;
        if (!participantId) {
            return res.status(400).json({
                success: false,
                message: "Participant ID is required",
            });
        }
        if (participantId === req.user.id) {
            return res.status(400).json({
                success: false,
                message: "You cannot create a conversation with yourself",
            });
        }
        const participant = await prisma.user.findUnique({
            where: {
                id: participantId,
            },
            select: {
                id: true,
                name: true,
                role: true,
            },
        });
        if (!participant) {
            return res.status(404).json({
                success: false,
                message: "Participant not found",
            });
        }
        const existingConversation = await prisma.conversation.findFirst({
            where: {
                messages: {
                    some: {
                        senderId: req.user.id,
                    },
                },
                AND: {
                    messages: {
                        some: {
                            senderId: participantId,
                        },
                    },
                },
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
        });
        if (existingConversation) {
            return res.json({
                success: true,
                data: {
                    conversation: existingConversation,
                },
            });
        }
        const conversation = await prisma.conversation.create({
            data: {},
            include: {
                messages: true,
            },
        });
        return res.status(201).json({
            success: true,
            message: "Conversation created successfully",
            data: {
                conversation,
                participant,
            },
        });
    }
    catch (error) {
        console.error("Create conversation error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to create conversation",
        });
    }
});
/**
 * Send a message
 */
router.post("/conversations/:conversationId/messages", authenticate, async (req, res) => {
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
                messages: {
                    select: {
                        senderId: true,
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
        const isParticipant = conversation.messages.some((message) => message.senderId === req.user.id);
        if (!isParticipant) {
            return res.status(403).json({
                success: false,
                message: "You are not a participant in this conversation",
            });
        }
        const message = await prisma.message.create({
            data: {
                conversationId,
                senderId: req.user.id,
                content: content.trim(),
            },
        });
        return res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: {
                message,
            },
        });
    }
    catch (error) {
        console.error("Send message error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to send message",
        });
    }
});
/**
 * Get conversation messages
 */
router.get("/conversations/:conversationId/messages", authenticate, async (req, res) => {
    try {
        const conversationId = String(req.params.conversationId);
        const messages = await prisma.message.findMany({
            where: {
                conversationId,
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                    },
                },
            },
            orderBy: {
                createdAt: "asc",
            },
        });
        const isParticipant = messages.some((message) => message.sender.id === req.user.id);
        if (!isParticipant) {
            return res.status(403).json({
                success: false,
                message: "You are not a participant in this conversation",
            });
        }
        return res.json({
            success: true,
            data: {
                messages,
            },
        });
    }
    catch (error) {
        console.error("Fetch messages error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch messages",
        });
    }
});
/**
 * Mark messages as read
 */
router.patch("/conversations/:conversationId/read", authenticate, async (req, res) => {
    try {
        const conversationId = String(req.params.conversationId);
        const messages = await prisma.message.findMany({
            where: {
                conversationId,
            },
            select: {
                id: true,
                senderId: true,
            },
        });
        const isParticipant = messages.some((message) => message.senderId === req.user.id);
        if (!isParticipant) {
            return res.status(403).json({
                success: false,
                message: "You are not a participant in this conversation",
            });
        }
        await prisma.message.updateMany({
            where: {
                conversationId,
                senderId: {
                    not: req.user.id,
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
    }
    catch (error) {
        console.error("Mark messages as read error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to mark messages as read",
        });
    }
});
export default router;
