import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  X,
} from "lucide-react";

import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  type Notification,
} from "../../services/notificationService";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  async function loadNotifications(showLoader = false) {
    try {
      if (showLoader) {
        setLoading(true);
      }

      const data = await getNotifications();

      setNotifications(data);
    } catch (error) {
      console.error("Failed to load notifications:", error);
    } finally {
      if (showLoader) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    loadNotifications();

    const interval = window.setInterval(() => {
      loadNotifications();
    }, 30000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handleNotificationClick(
    notification: Notification
  ) {
    if (notification.isRead) {
      return;
    }

    try {
      await markNotificationAsRead(notification.id);

      setNotifications((current) =>
        current.map((item) =>
          item.id === notification.id
            ? {
                ...item,
                isRead: true,
              }
            : item
        )
      );
    } catch (error) {
      console.error(
        "Failed to mark notification as read:",
        error
      );
    }
  }

  async function handleMarkAllAsRead() {
    if (unreadCount === 0) {
      return;
    }

    try {
      await markAllNotificationsAsRead();

      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
    } catch (error) {
      console.error(
        "Failed to mark all notifications as read:",
        error
      );
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return (
    <div
      ref={containerRef}
      className="relative"
    >
      <button
        type="button"
        onClick={() => {
          setIsOpen((current) => !current);

          if (!isOpen) {
            loadNotifications(true);
          }
        }}
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        aria-label="Notifications"
      >
        <Bell size={20} />

        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-[380px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Notifications
              </h3>

              {unreadCount > 0 && (
                <p className="mt-0.5 text-xs text-slate-500">
                  {unreadCount} unread
                </p>
              )}
            </div>

            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={handleMarkAllAsRead}
                  className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  title="Mark all as read"
                >
                  <CheckCheck size={17} />
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                title="Close"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          <div className="max-h-[420px] overflow-y-auto">
            {loading ? (
              <div className="px-4 py-10 text-center">
                <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />

                <p className="mt-3 text-sm text-slate-500">
                  Loading notifications...
                </p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="px-4 py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                  <Bell
                    size={21}
                    className="text-slate-400"
                  />
                </div>

                <p className="mt-3 text-sm font-medium text-slate-700">
                  No notifications
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  You're all caught up.
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() =>
                    handleNotificationClick(notification)
                  }
                  className={`flex w-full gap-3 border-b border-slate-100 px-4 py-4 text-left transition hover:bg-slate-50 ${
                    !notification.isRead
                      ? "bg-blue-50/50"
                      : "bg-white"
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      notification.isRead
                        ? "bg-slate-100 text-slate-500"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {notification.isRead ? (
                      <Check size={16} />
                    ) : (
                      <Bell size={16} />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-900">
                        {notification.title}
                      </p>

                      {!notification.isRead && (
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                      )}
                    </div>

                    <p className="mt-1 text-sm leading-5 text-slate-600">
                      {notification.message}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      {formatDate(notification.createdAt)}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}