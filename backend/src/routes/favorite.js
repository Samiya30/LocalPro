import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { authenticate, authorize, } from "../middleware/auth.js";
const router = Router();
/**
 * Add provider to favorites
 */
router.post("/:providerId", authenticate, authorize("CUSTOMER"), async (req, res) => {
    try {
        const providerId = String(req.params.providerId);
        const provider = await prisma.providerProfile.findFirst({
            where: {
                id: providerId,
                verificationStatus: "VERIFIED",
            },
        });
        if (!provider) {
            return res.status(404).json({
                success: false,
                message: "Provider not found",
            });
        }
        const existingFavorite = await prisma.favorite.findUnique({
            where: {
                customerId_providerId: {
                    customerId: req.user.id,
                    providerId,
                },
            },
        });
        if (existingFavorite) {
            return res.status(409).json({
                success: false,
                message: "Provider is already in your favorites",
            });
        }
        const favorite = await prisma.favorite.create({
            data: {
                customerId: req.user.id,
                providerId,
            },
        });
        return res.status(201).json({
            success: true,
            message: "Provider added to favorites",
            data: {
                favorite,
            },
        });
    }
    catch (error) {
        console.error("Add favorite error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to add provider to favorites",
        });
    }
});
/**
 * Remove provider from favorites
 */
router.delete("/:providerId", authenticate, authorize("CUSTOMER"), async (req, res) => {
    try {
        const providerId = String(req.params.providerId);
        const favorite = await prisma.favorite.findUnique({
            where: {
                customerId_providerId: {
                    customerId: req.user.id,
                    providerId,
                },
            },
        });
        if (!favorite) {
            return res.status(404).json({
                success: false,
                message: "Provider is not in your favorites",
            });
        }
        await prisma.favorite.delete({
            where: {
                id: favorite.id,
            },
        });
        return res.json({
            success: true,
            message: "Provider removed from favorites",
        });
    }
    catch (error) {
        console.error("Remove favorite error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to remove provider from favorites",
        });
    }
});
/**
 * Get customer's favorite providers
 */
router.get("/", authenticate, authorize("CUSTOMER"), async (req, res) => {
    try {
        const favorites = await prisma.favorite.findMany({
            where: {
                customerId: req.user.id,
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
                        areas: true,
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
                favorites,
            },
        });
    }
    catch (error) {
        console.error("Fetch favorites error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch favorites",
        });
    }
});
/**
 * Check whether a provider is favorited
 */
router.get("/:providerId/status", authenticate, authorize("CUSTOMER"), async (req, res) => {
    try {
        const providerId = String(req.params.providerId);
        const favorite = await prisma.favorite.findUnique({
            where: {
                customerId_providerId: {
                    customerId: req.user.id,
                    providerId,
                },
            },
        });
        return res.json({
            success: true,
            data: {
                isFavorite: Boolean(favorite),
            },
        });
    }
    catch (error) {
        console.error("Check favorite status error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to check favorite status",
        });
    }
});
export default router;
