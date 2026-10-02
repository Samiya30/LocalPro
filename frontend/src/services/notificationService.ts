import api from "./api";

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

export async function getNotifications() {
  const response = await api.get<{
    success: boolean;
    data: {
      notifications: Notification[];
    };
  }>("/api/notifications");

  return response.data.data.notifications;
}

export async function markNotificationAsRead(
  notificationId: string
) {
  const response = await api.patch<{
    success: boolean;
    message: string;
  }>(`/api/notifications/${notificationId}/read`);

  return response.data;
}

export async function markAllNotificationsAsRead() {
  const response = await api.patch<{
    success: boolean;
    message: string;
  }>("/api/notifications/read-all");

  return response.data;
}