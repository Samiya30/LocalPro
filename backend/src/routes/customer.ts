import { Router } from "express";

import { prisma } from "../lib/prisma.js";
import {
  authenticate,
  authorize,
  type AuthenticatedRequest,
} from "../middleware/auth.js";

const router = Router();

/**
 * Get customer dashboard
 */
router.get(
  "/dashboard",
  authenticate,
  authorize("CUSTOMER"),
  async (req: AuthenticatedRequest, res) => {
    try {
      const customerId = req.user!.id;

      const [
        customer,
        quoteRequests,
        bookings,
        favorites,
        reviews,
      ] = await Promise.all([
        prisma.user.findUnique({
          where: {
            id: customerId,
          },
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            createdAt: true,
            customerProfile: true,
          },
        }),

        prisma.quoteRequest.findMany({
          where: {
            customerId,
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
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        }),

        prisma.booking.findMany({
          where: {
            customerId,
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
            service: {
              include: {
                category: true,
              },
            },
            payment: true,
            review: true,
          },
          orderBy: {
            bookingDate: "desc",
          },
          take: 10,
        }),

        prisma.favorite.findMany({
          where: {
            customerId,
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
                services: {
                  where: {
                    isActive: true,
                  },
                  include: {
                    category: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        }),

        prisma.review.findMany({
          where: {
            customerId,
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
          take: 10,
        }),
      ]);

      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      const activeBookings = bookings.filter(
        (booking) =>
          booking.status === "PENDING" ||
          booking.status === "CONFIRMED" ||
          booking.status === "IN_PROGRESS"
      ).length;

      const completedBookings = bookings.filter(
        (booking) => booking.status === "COMPLETED"
      ).length;

      const pendingQuotes = quoteRequests.filter(
        (request) => request.status === "PENDING"
      ).length;

      return res.json({
        success: true,
        data: {
          customer,
          stats: {
            activeBookings,
            completedBookings,
            pendingQuotes,
            favorites: favorites.length,
            reviews: reviews.length,
          },
          quoteRequests,
          bookings,
          favorites,
          reviews,
        },
      });
    } catch (error) {
      console.error("Customer dashboard error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to load customer dashboard",
      });
    }
  }
);

/**
 * Get customer profile
 */
router.get(
  "/profile",
  authenticate,
  authorize("CUSTOMER"),
  async (req: AuthenticatedRequest, res) => {
    try {
      const customer = await prisma.user.findUnique({
        where: {
          id: req.user!.id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          createdAt: true,
          customerProfile: true,
        },
      });

      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      return res.json({
        success: true,
        data: {
          customer,
        },
      });
    } catch (error) {
      console.error("Customer profile error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to fetch customer profile",
      });
    }
  }
);

/**
 * Update customer profile
 */
router.put(
  "/profile",
  authenticate,
  authorize("CUSTOMER"),
  async (req: AuthenticatedRequest, res) => {
    try {
      const {
        name,
        phone,
        address,
        city,
        state,
        pincode,
      } = req.body;

      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Name is required",
        });
      }

      const customer = await prisma.user.update({
        where: {
          id: req.user!.id,
        },
        data: {
          name,
          phone,
          customerProfile: {
            upsert: {
              create: {
                address,
                city,
                state,
                pincode,
              },
              update: {
                address,
                city,
                state,
                pincode,
              },
            },
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          role: true,
          customerProfile: true,
        },
      });

      return res.json({
        success: true,
        message: "Customer profile updated successfully",
        data: {
          customer,
        },
      });
    } catch (error) {
      console.error("Update customer profile error:", error);

      return res.status(500).json({
        success: false,
        message: "Unable to update customer profile",
      });
    }
  }
);

export default router;