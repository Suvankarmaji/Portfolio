"use client"

import type { AppType } from "@/types/portfolio"

interface ContextMenuProps {
  x: number
  y: number
  onOpenApp: (appType: AppType, title: string) => void
  onCloseAll: () => void
  onMinimizeAll: () => void
}

const contextMenuItems = [
  { type: "resume" as AppType, title: "Resume", icon: "📄" },
  { type: "terminal" as AppType, title: "Terminal", icon: "⚡" },
  { type: "projects" as AppType, title: "Projects", icon: "🚀" },
  { type: "skills" as AppType, title: "Skills", icon: "🧠" },
  { type: "contact" as AppType, title: "Contact", icon: "✉️" },
  { type: "about" as AppType, title: "About Me", icon: "👤" },
]

export default function ContextMenu({ x, y, onOpenApp, onCloseAll, onMinimizeAll }: ContextMenuProps) {
  return (
    <div
      className="fixed bg-white/90 backdrop-blur-md rounded-lg shadow-xl border border-gray-200/50 py-2 z-50 min-w-48"
      style={{ left: x, top: y }}
    >
      <div className="px-3 py-1 text-xs font-medium text-gray-500 border-b border-gray-200/50 mb-1">Quick Actions</div>

      {contextMenuItems.map((item) => (
        <button
          key={item.type}
          onClick={() => onOpenApp(item.type, item.title)}
          className="w-full px-3 py-2 text-left hover:bg-blue-500/10 flex items-center space-x-2 text-sm"
        >
          <span>{item.icon}</span>
          <span>Open {item.title}</span>
        </button>
      ))}

      <div className="border-t border-gray-200/50 mt-1 pt-1">
        <button
          onClick={onMinimizeAll}
          className="w-full px-3 py-2 text-left hover:bg-blue-500/10 text-sm text-gray-600"
        >
          Minimize All Windows
        </button>
        <button onClick={onCloseAll} className="w-full px-3 py-2 text-left hover:bg-red-500/10 text-sm text-red-600">
          Close All Windows
        </button>
      </div>
    </div>
  )
}
