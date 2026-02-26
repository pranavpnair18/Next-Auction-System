
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Notification {
  message: string;
  timestamp: string;
}

interface NotificationStore {
  notifications: Record<string, Notification[]>;
  addNotification: (userId: string, message: string) => void;
  clearNotifications: (userId: string) => void;
}

export const useNotificationStore = create<NotificationStore>()(
  persist((set, get) => ({
      notifications: {},

      addNotification: (userId, message) => {
        const existing = get().notifications[userId] || [];
        const newNotification: Notification = {
          message,
          timestamp: new Date().toISOString(),
        };
        set({
          notifications: {
            ...get().notifications,
            [userId]: [newNotification, ...existing],
          },
        });
      },

      clearNotifications: (userId) => {
        const all = { ...get().notifications };
        delete all[userId];
        set({ notifications: all });
      },
    }),
    { name: "auction-notifications" } // key in localStorage
  )
);
