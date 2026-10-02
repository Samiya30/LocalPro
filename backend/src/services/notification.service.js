import { prisma } from "../lib/prisma.js";
export async function createNotification({ userId, title, message, type, }) {
    return prisma.notification.create({
        data: {
            userId,
            title,
            message,
            type,
        },
    });
}
export async function createNotifications(notifications) {
    if (notifications.length === 0) {
        return;
    }
    return prisma.notification.createMany({
        data: notifications,
    });
}
