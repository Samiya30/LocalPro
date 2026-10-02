import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { authenticate, authorize, } from "../middleware/auth.js";
import { createNotification } from "../services/notification.service.js";
const router = Router();
/**
 * Customer gets their bookings
 */
router.get("/customer", authenticate, authorize("CUSTOMER"), async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany({
            where: {
                customerId: req.user.id,
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
                                email: true,
                                phone: true,
                            },
                        },
                    },
                },
                quote: true,
                payment: true,
                review: true,
            },
            orderBy: {
                bookingDate: "desc",
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
        console.error("Fetch customer bookings error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch bookings",
        });
    }
});
/**
 * Provider gets their bookings
 */
router.get("/provider", authenticate, authorize("PROVIDER"), async (req, res) => {
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
        const bookings = await prisma.booking.findMany({
            where: {
                providerId: provider.id,
            },
            include: {
                service: {
                    include: {
                        category: true,
                    },
                },
                customer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    },
                },
                quote: true,
                payment: true,
                review: true,
            },
            orderBy: {
                bookingDate: "desc",
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
        console.error("Fetch provider bookings error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch bookings",
        });
    }
});
/**
 * Provider sets their availability
 */
router.post("/availability", authenticate, authorize("PROVIDER"), async (req, res) => {
    try {
        const { dayOfWeek, startTime, endTime } = req.body;
        if (dayOfWeek === undefined ||
            !startTime ||
            !endTime) {
            return res.status(400).json({
                success: false,
                message: "Day, start time, and end time are required",
            });
        }
        const numericDay = Number(dayOfWeek);
        if (!Number.isInteger(numericDay) ||
            numericDay < 0 ||
            numericDay > 6) {
            return res.status(400).json({
                success: false,
                message: "dayOfWeek must be between 0 and 6",
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
        const availability = await prisma.providerAvailability.create({
            data: {
                providerId: provider.id,
                dayOfWeek: numericDay,
                startTime,
                endTime,
            },
        });
        return res.status(201).json({
            success: true,
            message: "Availability added successfully",
            data: {
                availability,
            },
        });
    }
    catch (error) {
        console.error("Create availability error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to add availability",
        });
    }
});
/**
 * Provider gets their availability
 */
router.get("/availability", authenticate, authorize("PROVIDER"), async (req, res) => {
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
        const availability = await prisma.providerAvailability.findMany({
            where: {
                providerId: provider.id,
            },
            orderBy: [
                {
                    dayOfWeek: "asc",
                },
                {
                    startTime: "asc",
                },
            ],
        });
        return res.json({
            success: true,
            data: {
                availability,
            },
        });
    }
    catch (error) {
        console.error("Fetch availability error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch availability",
        });
    }
});
/**
 * Update booking status
 *
 * Provider can change:
 * PENDING -> CONFIRMED / REJECTED
 * CONFIRMED -> IN_PROGRESS
 * IN_PROGRESS -> COMPLETED
 * CONFIRMED -> CANCELLED
 * IN_PROGRESS -> CANCELLED
 *
 * Customer can cancel a PENDING or CONFIRMED booking.
 */
router.patch("/:bookingId/status", authenticate, async (req, res) => {
    try {
        const bookingId = String(req.params.bookingId);
        const { status } = req.body;
        const allowedStatuses = [
            "PENDING",
            "CONFIRMED",
            "IN_PROGRESS",
            "COMPLETED",
            "CANCELLED",
            "REJECTED",
        ];
        if (!status || !allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid booking status",
            });
        }
        const booking = await prisma.booking.findUnique({
            where: {
                id: bookingId,
            },
            include: {
                service: true,
                customer: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
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
        });
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }
        const isCustomer = booking.customerId === req.user.id;
        const isProvider = booking.provider.userId === req.user.id;
        if (!isCustomer && !isProvider) {
            return res.status(403).json({
                success: false,
                message: "You do not have access to this booking",
            });
        }
        if (isCustomer) {
            if (status !== "CANCELLED") {
                return res.status(403).json({
                    success: false,
                    message: "Customers can only cancel bookings",
                });
            }
            if (booking.status !== "PENDING" &&
                booking.status !== "CONFIRMED") {
                return res.status(400).json({
                    success: false,
                    message: "This booking cannot be cancelled",
                });
            }
        }
        if (isProvider) {
            const validTransitions = {
                PENDING: ["CONFIRMED", "REJECTED"],
                CONFIRMED: ["IN_PROGRESS", "CANCELLED"],
                IN_PROGRESS: ["COMPLETED", "CANCELLED"],
                COMPLETED: [],
                CANCELLED: [],
                REJECTED: [],
            };
            if (!validTransitions[booking.status]?.includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: `Booking cannot move from ${booking.status} to ${status}`,
                });
            }
        }
        const updatedBooking = await prisma.booking.update({
            where: {
                id: bookingId,
            },
            data: {
                status,
            },
            include: {
                service: {
                    include: {
                        category: true,
                    },
                },
                customer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    },
                },
                provider: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                phone: true,
                            },
                        },
                    },
                },
                payment: true,
                review: true,
            },
        });
        let notificationUserId;
        let notificationTitle;
        let notificationMessage;
        if (isProvider) {
            notificationUserId = booking.customerId;
            notificationTitle = "Booking Status Updated";
            notificationMessage = `Your booking for ${booking.service.name} is now ${status.replace("_", " ").toLowerCase()}.`;
        }
        else {
            notificationUserId = booking.provider.userId;
            notificationTitle = "Booking Cancelled";
            notificationMessage = `The customer cancelled the booking for ${booking.service.name}.`;
        }
        await createNotification({
            userId: notificationUserId,
            title: notificationTitle,
            message: notificationMessage,
            type: "BOOKING_STATUS",
        });
        return res.json({
            success: true,
            message: "Booking status updated successfully",
            data: {
                booking: updatedBooking,
            },
        });
    }
    catch (error) {
        console.error("Update booking status error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to update booking status",
        });
    }
});
export default router;
