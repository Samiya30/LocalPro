import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { authenticate, authorize, } from "../middleware/auth.js";
const router = Router();
/**
 * Admin dashboard
 */
router.get("/dashboard", authenticate, authorize("ADMIN"), async (_req, res) => {
    try {
        const [totalUsers, totalCustomers, totalProviders, pendingProviders, verifiedProviders, totalBookings, completedBookings, totalQuoteRequests, totalReviews,] = await Promise.all([
            prisma.user.count(),
            prisma.user.count({
                where: {
                    role: "CUSTOMER",
                },
            }),
            prisma.user.count({
                where: {
                    role: "PROVIDER",
                },
            }),
            prisma.providerProfile.count({
                where: {
                    verificationStatus: "PENDING",
                },
            }),
            prisma.providerProfile.count({
                where: {
                    verificationStatus: "VERIFIED",
                },
            }),
            prisma.booking.count(),
            prisma.booking.count({
                where: {
                    status: "COMPLETED",
                },
            }),
            prisma.quoteRequest.count(),
            prisma.review.count(),
        ]);
        return res.json({
            success: true,
            data: {
                stats: {
                    totalUsers,
                    totalCustomers,
                    totalProviders,
                    pendingProviders,
                    verifiedProviders,
                    totalBookings,
                    completedBookings,
                    totalQuoteRequests,
                    totalReviews,
                },
            },
        });
    }
    catch (error) {
        console.error("Admin dashboard error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to load admin dashboard",
        });
    }
});
/**
 * Get all users
 */
router.get("/users", authenticate, authorize("ADMIN"), async (_req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                createdAt: true,
                providerProfile: {
                    select: {
                        id: true,
                        businessName: true,
                        verificationStatus: true,
                        rating: true,
                        totalReviews: true,
                    },
                },
                customerProfile: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.json({
            success: true,
            data: {
                users,
            },
        });
    }
    catch (error) {
        console.error("Fetch admin users error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch users",
        });
    }
});
/**
 * Get pending provider verification requests
 */
router.get("/providers/pending", authenticate, authorize("ADMIN"), async (_req, res) => {
    try {
        const providers = await prisma.providerProfile.findMany({
            where: {
                verificationStatus: "PENDING",
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                        createdAt: true,
                    },
                },
                services: {
                    include: {
                        category: true,
                    },
                },
                areas: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });
        return res.json({
            success: true,
            data: {
                providers,
            },
        });
    }
    catch (error) {
        console.error("Fetch pending providers error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch pending providers",
        });
    }
});
/**
 * Verify or reject provider
 */
router.patch("/providers/:providerId/verification", authenticate, authorize("ADMIN"), async (req, res) => {
    try {
        const providerId = String(req.params.providerId);
        const { status } = req.body;
        if (!["VERIFIED", "REJECTED", "PENDING"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid verification status",
            });
        }
        const provider = await prisma.providerProfile.findUnique({
            where: {
                id: providerId,
            },
        });
        if (!provider) {
            return res.status(404).json({
                success: false,
                message: "Provider not found",
            });
        }
        const updatedProvider = await prisma.providerProfile.update({
            where: {
                id: providerId,
            },
            data: {
                verificationStatus: status,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        return res.json({
            success: true,
            message: `Provider status updated to ${status}`,
            data: {
                provider: updatedProvider,
            },
        });
    }
    catch (error) {
        console.error("Update provider verification error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to update provider verification",
        });
    }
});
/**
 * Get all categories
 */
router.get("/categories", authenticate, authorize("ADMIN"), async (_req, res) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: {
                        services: true,
                    },
                },
            },
            orderBy: {
                name: "asc",
            },
        });
        return res.json({
            success: true,
            data: {
                categories,
            },
        });
    }
    catch (error) {
        console.error("Fetch admin categories error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch categories",
        });
    }
});
/**
 * Activate or deactivate category
 */
router.patch("/categories/:categoryId/status", authenticate, authorize("ADMIN"), async (req, res) => {
    try {
        const categoryId = String(req.params.categoryId);
        const { isActive } = req.body;
        if (typeof isActive !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "isActive must be a boolean",
            });
        }
        const category = await prisma.category.update({
            where: {
                id: categoryId,
            },
            data: {
                isActive,
            },
        });
        return res.json({
            success: true,
            message: `Category ${isActive ? "activated" : "deactivated"} successfully`,
            data: {
                category,
            },
        });
    }
    catch (error) {
        console.error("Update category status error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to update category status",
        });
    }
});
/**
 * Get all bookings
 */
router.get("/bookings", authenticate, authorize("ADMIN"), async (_req, res) => {
    try {
        const bookings = await prisma.booking.findMany({
            include: {
                customer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
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
                service: {
                    include: {
                        category: true,
                    },
                },
                payment: true,
                review: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.json({
            success: true,
            data: {
                bookings,
            },
        });
    }
    catch (error) {
        console.error("Fetch admin bookings error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch bookings",
        });
    }
});
export default router;
