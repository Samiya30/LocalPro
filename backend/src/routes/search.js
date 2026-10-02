import { Router } from "express";
import { prisma } from "../lib/prisma.js";
const router = Router();
/**
 * Search verified providers
 *
 * Supported query parameters:
 * ?search=electrician
 * ?city=Panchkula
 * ?category=electrician
 * ?minRating=4
 * ?maxPrice=2000
 * ?available=true
 */
router.get("/providers", async (req, res) => {
    try {
        const { search, city, category, minRating, maxPrice, available, } = req.query;
        const providers = await prisma.providerProfile.findMany({
            where: {
                verificationStatus: "VERIFIED",
                ...(city
                    ? {
                        OR: [
                            {
                                city: {
                                    contains: String(city),
                                    mode: "insensitive",
                                },
                            },
                            {
                                areas: {
                                    some: {
                                        city: {
                                            contains: String(city),
                                            mode: "insensitive",
                                        },
                                    },
                                },
                            },
                        ],
                    }
                    : {}),
                ...(minRating
                    ? {
                        rating: {
                            gte: Number(minRating),
                        },
                    }
                    : {}),
                ...(available === "true"
                    ? {
                        isAvailable: true,
                    }
                    : {}),
                ...(search
                    ? {
                        OR: [
                            {
                                businessName: {
                                    contains: String(search),
                                    mode: "insensitive",
                                },
                            },
                            {
                                description: {
                                    contains: String(search),
                                    mode: "insensitive",
                                },
                            },
                            {
                                services: {
                                    some: {
                                        name: {
                                            contains: String(search),
                                            mode: "insensitive",
                                        },
                                        isActive: true,
                                    },
                                },
                            },
                        ],
                    }
                    : {}),
                ...(category
                    ? {
                        services: {
                            some: {
                                isActive: true,
                                category: {
                                    slug: String(category),
                                    isActive: true,
                                },
                            },
                        },
                    }
                    : {}),
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
                },
                areas: true,
            },
            orderBy: [
                {
                    rating: "desc",
                },
                {
                    totalReviews: "desc",
                },
            ],
        });
        const filteredProviders = maxPrice
            ? providers.filter((provider) => provider.services.some((service) => service.price <= Number(maxPrice)))
            : providers;
        return res.json({
            success: true,
            data: {
                providers: filteredProviders,
                total: filteredProviders.length,
            },
        });
    }
    catch (error) {
        console.error("Provider search error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to search providers",
        });
    }
});
export default router;
