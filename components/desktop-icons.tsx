"use client"

import type { AppType } from "@/types/portfolio"

interface DesktopIconsProps {
  onOpenApp: (appType: AppType, title: string) => void
}

const desktopIcons: { type: AppType; title: string; icon: string; x: number; y: number; isImage: boolean }[] = [
  { type: "resume", title: "Resume", icon: "images/activity_monitor.png", x: 50, y: 100, isImage: true },
  { type: "projects", title: "Projects", icon: "images/apps.webp", x: 50, y: 200, isImage: true },
  { type: "terminal", title: "Terminal", icon: "images/terminal.png", x: 50, y: 300, isImage: true },
  { type: "about", title: "About", icon: "images/contacts.png", x: 150, y: 100, isImage: true },
  { type: "skills", title: "Skills", icon: "🧠", x: 150, y: 200, isImage: false },
  { type: "contact", title: "Contact", icon: "✉️", x: 150, y: 300, isImage: false },
]

export default function DesktopIcons({ onOpenApp }: DesktopIconsProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {desktopIcons.map((icon) => (
        <button
          key={icon.type}
          onClick={() => onOpenApp(icon.type, icon.title)}
          className="absolute pointer-events-auto group"
          style={{ left: icon.x, top: icon.y }}
        >
          <div className="flex flex-col items-center space-y-1">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl group-hover:bg-white/20 transition-colors shadow-lg overflow-hidden">
              {icon.isImage ? (
                <img src={icon.icon} alt={icon.title} className="w-10 h-10 object-contain" />
              ) : (
                <span>{icon.icon}</span>
              )}
            </div>
            <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded macos-font">{icon.title}</span>
          </div>
        </button>
      ))}
    </div>
  )
}