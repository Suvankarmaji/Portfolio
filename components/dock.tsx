"use client"

import { useState } from "react"
import type { WindowState, AppType } from "@/types/portfolio"

interface DockProps {
  windows: WindowState[]
  onOpenApp: (appType: AppType, title: string) => void
  onFocusWindow: (windowId: string) => void
}

const dockApps: { type: AppType; title: string; icon: string; isImage: boolean; color: string }[] = [
  {
    type: "files",
    title: "Files",
    icon: "images/finder.png",
    isImage: true,
    color: "bg-gradient-to-br from-gray-400 to-gray-600",
  },
  {
    type: "resume",
    title: "Resume",
    icon: "images/profile.png",
    isImage: true,
    color: "bg-gradient-to-br from-gray-400 to-gray-600", // transparent icon, so use light bg
  },
  {
    type: "achievements",
    title: "Achievements",
    icon: "🏆",
    isImage: false,
    color: "bg-gradient-to-br from-yellow-400 to-orange-500",
  },
  {
    type: "calender",
    title: "Calendar",
    icon: "images/events.jpg",
    isImage: true,
    color: "bg-gradient-to-br from-purple-400 to-pink-500",
  },
  {
    type: "experience",
    title: "Experience",
    icon: "images/timemachine.webp",
    isImage: true,
    color: "bg-gradient-to-br from-green-400 to-emerald-500",
  },
  {
    type: "projects",
    title: "Projects",
    icon: "images/apps.webp",
    isImage: true,
    color: "bg-gradient-to-br from-red-400 to-rose-500",
  },
  {
    type: "terminal",
    title: "Terminal",
    icon: "images/terminal.png",
    isImage: true,
    color: "bg-gradient-to-br from-gray-800 to-black",
  },
  {
    type: "about",
    title: "About Me",
    icon: "images/contacts.png",
    isImage: true,
    color: "bg-gradient-to-br from-indigo-400 to-purple-500",
  },
  {
    type: "skills",
    title: "Skills",
    icon: "🧠",
    isImage: false,
    color: "bg-gradient-to-br from-violet-500 to-fuchsia-500",
  },
  {
    type: "contact",
    title: "Contact",
    icon: "✉️",
    isImage: false,
    color: "bg-gradient-to-br from-orange-400 to-rose-500",
  },
]

export default function Dock({ windows, onOpenApp, onFocusWindow }: DockProps) {
  const [hoveredApp, setHoveredApp] = useState<string | null>(null)

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
        <div className="flex items-end space-x-2">
          {dockApps.map((app) => {
            const isOpen = windows.some((w) => w.appType === app.type)
            const isHovered = hoveredApp === app.type

            return (
              <div
                key={app.type}
                className="relative group"
                onMouseEnter={() => setHoveredApp(app.type)}
                onMouseLeave={() => setHoveredApp(null)}
              >
                <button
                  onClick={() => {
                    const existingWindow = windows.find((w) => w.appType === app.type)
                    if (existingWindow) {
                      onFocusWindow(existingWindow.id)
                    } else {
                      onOpenApp(app.type, app.title)
                    }
                  }}
                  className={`
                    w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl shadow-lg
                    transition-all duration-200 hover:scale-110 active:scale-95
                    ${app.color} ${isOpen ? "ring-2 ring-white/50" : ""}
                    ${isHovered ? "transform scale-110" : ""}
                  `}
                  style={
                    app.isImage
                      ? {
                          backgroundImage: `url('${app.icon}')`,
                          backgroundSize: "contain",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }
                      : undefined
                  }
                >
                  {!app.isImage && app.icon}
                </button>

                {isOpen && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                )}

                {isHovered && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap macos-font">
                    {app.title}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}