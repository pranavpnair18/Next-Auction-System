"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useNotificationStore } from "@/app/store/useNotificationStore";

export default function DashboardPage() {
  const { data: session } = useSession();
  const { notifications, addNotification, clearNotifications } = useNotificationStore();
  const userId = session?.user?.id;

  useEffect(() => {
    // 🕓 When user logs in, check for any ended auctions they won
    async function checkAuctions() {
      if (!userId) return;

      try {
        const res = await fetch("/api/auction/check");
        const data = await res.json();

        if (res.ok && data.notifications) {
          const myWins = data.notifications.filter(
            (note: { userId: number }) => note.userId === Number(userId)
          );

          // Add each new notification to local store
          myWins.forEach((win: any) => addNotification(String(win.userId), win.message));
        }
      } catch (err) {
        console.error("❌ Error checking auction winners:", err);
      }
    }

    checkAuctions();
  }, [userId, addNotification]);

  // 🧠 Get user notifications
  const userNotifications = userId ? notifications[userId] || [] : [];

  return (
    <main className="p-8 text-white text-center">
      

      {userId ? (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Your Notifications 🔔</h2>

            {userNotifications.length > 0 ? (
              <>
                <ul className="space-y-2">
                  {userNotifications.map((note, index) => (
                    <li
                      key={index}
                      className="bg-gray-800 p-3 rounded-md flex justify-between"
                    >
                      <span>{note.message}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(note.timestamp).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => clearNotifications(userId)}
                  className="mt-4 bg-red-500 px-3 py-2 rounded-lg hover:bg-red-600"
                >
                  Clear All Notifications
                </button>
              </>
            ) : (
              <p className="text-gray-400">No notifications yet 💤</p>
            )}
          </div>
        </>
      ) : (
        <p className="text-gray-400">Please log in to view your dashboard.</p>
      )}
    </main>
  );
}
