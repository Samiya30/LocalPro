import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { authenticate, authorize, } from "../middleware/auth.js";
const router = Router();
/**
 * Get the logged-in provider's profile
 */
router.get("/me", authenticate, authorize("PROVIDER"), async (req, res) => {
    try {
        const provider = await prisma.providerProfile.findUnique({
            where: {
                userId: req.user.id,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
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
                areas: true,
            },
        });
        if (!provider) {
            return res.status(404).json({
                success: false,
                message: "Provider profile not found",
            });
        }
        return res.json({
            success: true,
            data: {
                provider,
            },
        });
    }
    catch (error) {
        console.error("Fetch provider profile error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch provider profile",
        });
    }
});
/**
 * Update the logged-in provider's profile
 */
router.put("/me", authenticate, authorize("PROVIDER"), async (req, res) => {
    try {
        const { businessName, description, address, city, state, pincode, experienceYears, isAvailable, } = req.body;
        if (!businessName) {
            return res.status(400).json({
                success: false,
                message: "Business name is required",
            });
        }
        const provider = await prisma.providerProfile.update({
            where: {
                userId: req.user.id,
            },
            data: {
                businessName,
                description,
                address,
                city,
                state,
                pincode,
                experienceYears: experienceYears !== undefined
                    ? Number(experienceYears)
                    : undefined,
                isAvailable: isAvailable !== undefined ? Boolean(isAvailable) : undefined,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    },
                },
                services: true,
                areas: true,
            },
        });
        return res.json({
            success: true,
            message: "Provider profile updated successfully",
            data: {
                provider,
            },
        });
    }
    catch (error) {
        console.error("Update provider profile error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to update provider profile",
        });
    }
});
/**
 * Add a service
 */
router.post("/services", authenticate, authorize("PROVIDER"), async (req, res) => {
    try {
        const { categoryId, name, description, price } = req.body;
        if (!categoryId || !name || price === undefined) {
            return res.status(400).json({
                success: false,
                message: "Category, service name, and price are required",
            });
        }
        const provider = await prisma.providerProfile.findUnique({
            where: {
                userId: req.user.id,
            },
        });
        if (!provider) {
            return res.status(404).json({
                success: false,
                message: "Provider profile not found",
            });
        }
        const category = await prisma.category.findUnique({
            where: {
                id: categoryId,
            },
        });
        if (!category || !category.isActive) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        const service = await prisma.service.create({
            data: {
                providerId: provider.id,
                categoryId,
                name,
                description,
                price: Number(price),
            },
            include: {
                category: true,
            },
        });
        return res.status(201).json({
            success: true,
            message: "Service added successfully",
            data: {
                service,
            },
        });
    }
    catch (error) {
        console.error("Add provider service error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to add service",
        });
    }
});
/**
 * Get the logged-in provider's services
 */
router.get("/services", authenticate, authorize("PROVIDER"), async (req, res) => {
    try {
        const provider = await prisma.providerProfile.findUnique({
            where: {
                userId: req.user.id,
            },
        });
        if (!provider) {
            return res.status(404).json({
                success: false,
                message: "Provider profile not found",
            });
        }
        const services = await prisma.service.findMany({
            where: {
                providerId: provider.id,
            },
            include: {
                category: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.json({
            success: true,
            data: {
                services,
            },
        });
    }
    catch (error) {
        console.error("Fetch provider services error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch provider services",
        });
    }
});
/**
 * Add a service area
 */
router.post("/areas", authenticate, authorize("PROVIDER"), async (req, res) => {
    try {
        const { city, state, pincode } = req.body;
        if (!city || !state) {
            return res.status(400).json({
                success: false,
                message: "City and state are required",
            });
        }
        const provider = await prisma.providerProfile.findUnique({
            where: {
                userId: req.user.id,
            },
        });
        if (!provider) {
            return res.status(404).json({
                success: false,
                message: "Provider profile not found",
            });
        }
        const area = await prisma.serviceArea.create({
            data: {
                providerId: provider.id,
                city,
                state,
                pincode,
            },
        });
        return res.status(201).json({
            success: true,
            message: "Service area added successfully",
            data: {
                area,
            },
        });
    }
    catch (error) {
        console.error("Add service area error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to add service area",
        });
    }
});
/**
 * Get the logged-in provider's service areas
 */
router.get("/areas", authenticate, authorize("PROVIDER"), async (req, res) => {
    try {
        const provider = await prisma.providerProfile.findUnique({
            where: {
                userId: req.user.id,
            },
        });
        if (!provider) {
            return res.status(404).json({
                success: false,
                message: "Provider profile not found",
            });
        }
        const areas = await prisma.serviceArea.findMany({
            where: {
                providerId: provider.id,
            },
            orderBy: {
                city: "asc",
            },
        });
        return res.json({
            success: true,
            data: {
                areas,
            },
        });
    }
    catch (error) {
        console.error("Fetch service areas error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch service areas",
        });
    }
});
/**
 * Get a public provider profile
 */
router.get("/:providerId", async (req, res) => {
    try {
        const { providerId } = req.params;
        const provider = await prisma.providerProfile.findFirst({
            where: {
                id: providerId,
                verificationStatus: "VERIFIED",
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        phone: true,
                    },
                },
                services: {
                    where: {
                        isActive: true,
                    },
                    include: {
                        category: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                areas: {
                    orderBy: {
                        city: "asc",
                    },
                },
                reviews: {
                    include: {
                        customer: {
                            select: {
                                name: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: 10,
                },
            },
        });
        if (!provider) {
            return res.status(404).json({
                success: false,
                message: "Provider not found",
            });
        }
        return res.json({
            success: true,
            data: {
                provider,
            },
        });
    }
    catch (error) {
        console.error("Fetch public provider profile error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch provider profile",
        });
    }
});
/**
 * Provider dashboard
 */
router.get("/dashboard", authenticate, authorize("PROVIDER"), async (req, res) => {
    try {
        const provider = await prisma.providerProfile.findUnique({
            where: {
                userId: req.user.id,
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
                    where: {
                        isActive: true,
                    },
                    include: {
                        category: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
                areas: {
                    orderBy: {
                        city: "asc",
                    },
                },
                availability: {
                    where: {
                        isActive: true,
                    },
                    orderBy: {
                        dayOfWeek: "asc",
                    },
                },
                reviews: {
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
                    take: 10,
                },
            },
        });
        if (!provider) {
            return res.status(404).json({
                success: false,
                message: "Provider profile not found",
            });
        }
        const [quoteRequests, bookings, completedBookings,] = await Promise.all([
            prisma.quoteRequest.findMany({
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
                take: 10,
            }),
            prisma.booking.findMany({
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
            prisma.booking.findMany({
                where: {
                    providerId: provider.id,
                    status: "COMPLETED",
                },
                select: {
                    amount: true,
                },
            }),
        ]);
        const pendingRequests = quoteRequests.filter((request) => request.status === "PENDING").length;
        const activeBookings = bookings.filter((booking) => booking.status === "PENDING" ||
            booking.status === "CONFIRMED" ||
            booking.status === "IN_PROGRESS").length;
        const completedCount = bookings.filter((booking) => booking.status === "COMPLETED").length;
        const totalEarnings = completedBookings.reduce((total, booking) => total + booking.amount, 0);
        return res.json({
            success: true,
            data: {
                provider,
                stats: {
                    pendingRequests,
                    activeBookings,
                    completedBookings: completedCount,
                    totalEarnings,
                    rating: provider.rating,
                    totalReviews: provider.totalReviews,
                    totalServices: provider.services.length,
                },
                quoteRequests,
                bookings,
                reviews: provider.reviews,
            },
        });
    }
    catch (error) {
        console.error("Provider dashboard error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to load provider dashboard",
        });
    }
});
export default router;
