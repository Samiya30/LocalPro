import { prisma } from "../lib/prisma.js";

interface CreateNotificationInput {
  userId: string;
  title: string;
  message: string;
  type: string;
}

export async function createNotification({
  userId,
  title,
  message,
  type,
}: CreateNotificationInput) {
  return prisma.notification.create({
    data: {
      userId,
      title,
      message,
      type,
    },
  });
}

export async function createNotifications(
  notifications: CreateNotificationInput[]
) {
  if (notifications.length === 0) {
    return;
  }

  return prisma.notification.createMany({
    data: notifications,
  });
}