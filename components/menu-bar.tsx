"use client"

import { useState, useEffect } from "react"
import { Wifi, Battery, Volume2 } from "lucide-react"
import NotificationCenter from "./notification-center"
import QuickSettings from "./quick-settings"
import type { PortfolioData } from "@/types/portfolio"
import ProfileAvatar from "./profile-avatar"

interface MenuBarProps {
  data: PortfolioData
}

export default function MenuBar({ data }: MenuBarProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="h-6 bg-black/20 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 text-white text-sm font-medium relative z-50 macos-font">
      <div className="flex items-center space-x-4">
        <div className="font-bold"></div>
        <span>{data.basics.name}</span>
        <span className="hidden md:inline text-white/70 font-normal">AI/ML · Data Science · Full-Stack</span>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Wifi className="w-4 h-4" />
          <Volume2 className="w-4 h-4" />
          <Battery className="w-4 h-4" />
          <QuickSettings />
          <NotificationCenter />
        </div>
        <div className="font-mono">
          {currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </div>
        <ProfileAvatar data={data} className="w-5 h-5 rounded-full" textClassName="text-[9px]" />
      </div>
    </div>
  )
}
