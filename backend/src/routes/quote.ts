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
 * Customer creates a quote request
 */
router.post(
  "/requests",
  authenticate,
  authorize("CUSTOMER"),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { serviceId, description } = req.body;

      if (!serviceId) {
        return res.status(400).json({
          success: false,
          message: "Service is required",
        });
      }

      const service = await prisma.service.findFirst({
        where: {
          id: serviceId,
          isActive: true,
        },
        include: {
          provider: true,
          category: true,
        },
      });

      if (!service) {
        return res.status(404).json({
          success: false,
          message: "Service not found",
        });
      }

      if (service.provider.verificationStatus !== "VERIFIED") {
        return res.status(400).json({
          success: false,
          message: "This provider is not currently verified",
        });
      }

      const quoteRequest = await prisma.quoteRequest.create({
        data: {
          customerId: req.user!.id,
          serviceId,
          description,
        },
        include: {
          service: {
            include: {
              category: true,
              provider: {
                include: {
                  user: {
                    select: {
                      id: true,
                      name: true,
                      phone: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      await createNotification({
        userId: service.provider.userId,
        title: "New Quote Request",
        message: `You received a new quote request for ${service.name}.`,
        type: "QUOTE_REQUEST",
      });

      return res.status(201).json({
        success: true,
        message: "Quote request submitted successfully",
        data: {
          quoteRequest,
        },
      });
    } catch (error) {
      console.error("Create quote request error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to create quote request",
      });
    }
  }
);

/**
 * Customer gets their quote requests
 */
router.get(
  "/requests",
  authenticate,
  authorize("CUSTOMER"),
  async (req: AuthenticatedRequest, res) => {
    try {
      const quoteRequests = await prisma.quoteRequest.findMany({
        where: {
          customerId: req.user!.id,
        },
        include: {
          service: {
            include: {
              category: true,
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
            },
          },
          quotes: {
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
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.json({
        success: true,
        data: {
          quoteRequests,
        },
      });
    } catch (error) {
      console.error("Fetch customer quote requests error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch quote requests",
      });
    }
  }
);

/**
 * Provider gets quote requests for their services
 */
router.get(
  "/provider/requests",
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

      const quoteRequests = await prisma.quoteRequest.findMany({
        where: {
          service: {
            providerId: provider.id,
          },
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
          service: {
            include: {
              category: true,
            },
          },
          quotes: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.json({
        success: true,
        data: {
          quoteRequests,
        },
      });
    } catch (error) {
      console.error("Fetch provider quote requests error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch quote requests",
      });
    }
  }
);

/**
 * Provider submits a quote
 */
router.post(
  "/requests/:requestId/quotes",
  authenticate,
  authorize("PROVIDER"),
  async (req: AuthenticatedRequest, res) => {
    try {
      const requestId = String(req.params.requestId);
      const { amount, message } = req.body;

      if (!amount || Number(amount) <= 0) {
        return res.status(400).json({
          success: false,
          message: "A valid quote amount is required",
        });
      }

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

      const quoteRequest = await prisma.quoteRequest.findUnique({
        where: {
          id: requestId,
        },
        include: {
          service: true,
        },
      });

      if (!quoteRequest) {
        return res.status(404).json({
          success: false,
          message: "Quote request not found",
        });
      }

      if (quoteRequest.service.providerId !== provider.id) {
        return res.status(403).json({
          success: false,
          message: "You cannot quote on this request",
        });
      }

      if (quoteRequest.status !== "PENDING") {
        return res.status(400).json({
          success: false,
          message: "This quote request is no longer pending",
        });
      }

      const existingQuote = await prisma.quote.findFirst({
        where: {
          quoteRequestId: requestId,
          providerId: provider.id,
        },
      });

      if (existingQuote) {
        return res.status(409).json({
          success: false,
          message: "You have already submitted a quote",
        });
      }

      const quote = await prisma.quote.create({
        data: {
          quoteRequestId: requestId,
          providerId: provider.id,
          amount: Number(amount),
          message,
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
          quoteRequest: {
            include: {
              service: true,
            },
          },
        },
      });

      await createNotification({
        userId: quoteRequest.customerId,
        title: "New Quote Received",
        message: `A provider has submitted a quote of ₹${Number(
          amount
        ).toLocaleString("en-IN")} for your request.`,
        type: "QUOTE_RECEIVED",
      });

      return res.status(201).json({
        success: true,
        message: "Quote submitted successfully",
        data: {
          quote,
        },
      });
    } catch (error) {
      console.error("Submit quote error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to submit quote",
      });
    }
  }
);

/**
 * Customer accepts a provider quote and creates a booking
 */
router.post(
  "/:quoteId/accept",
  authenticate,
  authorize("CUSTOMER"),
  async (req: AuthenticatedRequest, res) => {
    try {
      const quoteId = String(req.params.quoteId);

      const { bookingDate, startTime, endTime, notes } = req.body;

      if (!bookingDate || !startTime || !endTime) {
        return res.status(400).json({
          success: false,
          message: "Booking date, start time, and end time are required",
        });
      }

      const quote = await prisma.quote.findUnique({
        where: {
          id: quoteId,
        },
        include: {
          provider: true,
          quoteRequest: {
            include: {
              service: true,
            },
          },
          booking: true,
        },
      });

      if (!quote) {
        return res.status(404).json({
          success: false,
          message: "Quote not found",
        });
      }

      if (quote.quoteRequest.customerId !== req.user!.id) {
        return res.status(403).json({
          success: false,
          message: "You cannot accept this quote",
        });
      }

      if (quote.status !== "PENDING") {
        return res.status(400).json({
          success: false,
          message: "This quote is no longer available",
        });
      }

      if (quote.booking) {
        return res.status(409).json({
          success: false,
          message: "A booking already exists for this quote",
        });
      }

      if (quote.provider.verificationStatus !== "VERIFIED") {
        return res.status(400).json({
          success: false,
          message: "This provider is no longer verified",
        });
      }

      const booking = await prisma.$transaction(async (tx) => {
        const createdBooking = await tx.booking.create({
          data: {
            customerId: req.user!.id,
            providerId: quote.providerId,
            serviceId: quote.quoteRequest.serviceId,
            quoteId: quote.id,
            bookingDate: new Date(bookingDate),
            startTime,
            endTime,
            amount: quote.amount,
            notes,
            status: "PENDING",
          },
          include: {
            service: {
              include: {
                category: true,
              },
            },
            provider: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    phone: true,
                  },
                },
              },
            },
          },
        });

        await tx.quote.update({
          where: {
            id: quote.id,
          },
          data: {
            status: "ACCEPTED",
          },
        });

        await tx.quoteRequest.update({
          where: {
            id: quote.quoteRequestId,
          },
          data: {
            status: "ACCEPTED",
          },
        });

        return createdBooking;
      });

      await createNotification({
        userId: quote.provider.userId,
        title: "Booking Request Created",
        message: `A customer accepted your quote for ${quote.quoteRequest.service.name}.`,
        type: "BOOKING_CREATED",
      });

      await createNotification({
        userId: req.user!.id,
        title: "Booking Created",
        message: `Your booking for ${quote.quoteRequest.service.name} has been created successfully.`,
        type: "BOOKING_CREATED",
      });

      return res.status(201).json({
        success: true,
        message: "Quote accepted and booking created successfully",
        data: {
          booking,
        },
      });
    } catch (error) {
      console.error("Accept quote error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to accept quote",
      });
    }
  }
);

export default router;