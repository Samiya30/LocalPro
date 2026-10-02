import { Router } from "express";

import { prisma } from "../lib/prisma.js";
import {
  authenticate,
  authorize,
  type AuthenticatedRequest,
} from "../middleware/auth.js";

const router = Router();

/**
 * Customer creates a review for a completed booking
 */
router.post(
  "/",
  authenticate,
  authorize("CUSTOMER"),
  async (req: AuthenticatedRequest, res) => {
    try {
      const { bookingId, rating, comment } = req.body;

      if (!bookingId || rating === undefined) {
        return res.status(400).json({
          success: false,
          message: "Booking ID and rating are required",
        });
      }

      const numericRating = Number(rating);

      if (
        !Number.isInteger(numericRating) ||
        numericRating < 1 ||
        numericRating > 5
      ) {
        return res.status(400).json({
          success: false,
          message: "Rating must be an integer between 1 and 5",
        });
      }

      const booking = await prisma.booking.findUnique({
        where: {
          id: String(bookingId),
        },
        include: {
          review: true,
          provider: true,
          service: true,
        },
      });

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }

      if (booking.customerId !== req.user!.id) {
        return res.status(403).json({
          success: false,
          message: "You can only review your own bookings",
        });
      }

      if (booking.status !== "COMPLETED") {
        return res.status(400).json({
          success: false,
          message: "You can only review completed bookings",
        });
      }

      if (booking.review) {
        return res.status(409).json({
          success: false,
          message: "You have already reviewed this booking",
        });
      }

      const review = await prisma.$transaction(async (tx) => {
        const createdReview = await tx.review.create({
          data: {
            customerId: req.user!.id,
            providerId: booking.providerId,
            bookingId: booking.id,
            rating: numericRating,
            comment: comment?.trim() || null,
          },
          include: {
            customer: {
              select: {
                id: true,
                name: true,
              },
            },
            provider: {
              select: {
                id: true,
                businessName: true,
              },
            },
          },
        });

        const providerReviews = await tx.review.findMany({
          where: {
            providerId: booking.providerId,
          },
          select: {
            rating: true,
          },
        });

        const totalReviews = providerReviews.length;

        const totalRating = providerReviews.reduce(
          (sum, currentReview) => sum + currentReview.rating,
          0
        );

        const averageRating =
          totalReviews > 0 ? totalRating / totalReviews : 0;

        await tx.providerProfile.update({
          where: {
            id: booking.providerId,
          },
          data: {
            rating: Number(averageRating.toFixed(1)),
            totalReviews,
          },
        });

        return createdReview;
      });

      return res.status(201).json({
        success: true,
        message: "Review submitted successfully",
        data: {
          review,
        },
      });
    } catch (error) {
      console.error("Create review error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to create review",
      });
    }
  }
);

/**
 * Get reviews for a provider
 */
router.get("/provider/:providerId", async (req, res) => {
  try {
    const providerId = String(req.params.providerId);

    const reviews = await prisma.review.findMany({
      where: {
        providerId,
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
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
        reviews,
      },
    });
  } catch (error) {
    console.error("Fetch provider reviews error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch provider reviews",
    });
  }
});

/**
 * Get the logged-in customer's reviews
 */
router.get(
  "/my-reviews",
  authenticate,
  authorize("CUSTOMER"),
  async (req: AuthenticatedRequest, res) => {
    try {
      const reviews = await prisma.review.findMany({
        where: {
          customerId: req.user!.id,
        },
        include: {
          provider: {
            select: {
              id: true,
              businessName: true,
              rating: true,
            },
          },
          booking: {
            include: {
              service: {
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
      });

      return res.json({
        success: true,
        data: {
          reviews,
        },
      });
    } catch (error) {
      console.error("Fetch customer reviews error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch reviews",
      });
    }
  }
);

export default router;