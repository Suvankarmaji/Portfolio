"use client"

import { useState, useEffect } from "react"
import { X, Bell } from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  timestamp: Date
  type: "info" | "success" | "warning" | "error"
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Add welcome notification
    const welcomeNotification: Notification = {
      id: "1",
      title: "Welcome!",
      message: "Explore the desktop, press ⌘/Ctrl + K to search, or open Contact to say hi.",
      timestamp: new Date(),
      type: "info",
    }
    setNotifications([welcomeNotification])
  }, [])

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "border-green-500 bg-green-50"
      case "warning":
        return "border-yellow-500 bg-yellow-50"
      case "error":
        return "border-red-500 bg-red-50"
      default:
        return "border-blue-500 bg-blue-50"
    }
  }

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 hover:bg-white/10 rounded transition-colors">
        <Bell className="w-4 h-4 text-white" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-8 right-0 w-80 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-gray-200/50 p-4 z-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No notifications</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border-l-4 ${getNotificationColor(notification.type)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                      <p className="text-gray-600 text-xs mt-1">{notification.message}</p>
                      <p className="text-gray-400 text-xs mt-2">{notification.timestamp.toLocaleTimeString()}</p>
                    </div>
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="p-1 hover:bg-gray-200 rounded ml-2"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  )
}
