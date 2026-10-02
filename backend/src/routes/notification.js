import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { authenticate, } from "../middleware/auth.js";
const router = Router();
/**
 * Get current user's notifications
 */
router.get("/", authenticate, async (req, res) => {
    try {
        const notifications = await prisma.notification.findMany({
            where: {
                userId: req.user.id,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        const unreadCount = notifications.filter((notification) => !notification.isRead).length;
        return res.json({
            success: true,
            data: {
                notifications,
                unreadCount,
            },
        });
    }
    catch (error) {
        console.error("Fetch notifications error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch notifications",
        });
    }
});
/**
 * Mark one notification as read
 */
router.patch("/:notificationId/read", authenticate, async (req, res) => {
    try {
        const notificationId = String(req.params.notificationId);
        const notification = await prisma.notification.findFirst({
            where: {
                id: notificationId,
                userId: req.user.id,
            },
        });
        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found",
            });
        }
        const updatedNotification = await prisma.notification.update({
            where: {
                id: notificationId,
            },
            data: {
                isRead: true,
            },
        });
        return res.json({
            success: true,
            message: "Notification marked as read",
            data: {
                notification: updatedNotification,
            },
        });
    }
    catch (error) {
        console.error("Mark notification as read error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to update notification",
        });
    }
});
/**
 * Mark all notifications as read
 */
router.patch("/read-all", authenticate, async (req, res) => {
    try {
        await prisma.notification.updateMany({
            where: {
                userId: req.user.id,
                isRead: false,
            },
            data: {
                isRead: true,
            },
        });
        return res.json({
            success: true,
            message: "All notifications marked as read",
        });
    }
    catch (error) {
        console.error("Mark all notifications as read error:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to update notifications",
        });
    }
});
export default router;
