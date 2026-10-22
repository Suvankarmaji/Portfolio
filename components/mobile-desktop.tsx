"use client"

import { useState, useCallback } from "react"
import { Home, ArrowLeft, Square } from "lucide-react"
import type { PortfolioData, AppType } from "@/types/portfolio"
import ResumeApp from "./apps/resume-app"
import AchievementsApp from "./apps/achievements-app"
import CalendarApp from "./apps/calendar-app"
import ExperienceApp from "./apps/experience-app"
import ProjectsApp from "./apps/projects-app"
import FilesApp from "./apps/files-app"
import TerminalApp from "./apps/terminal-app"
import AboutApp from "./apps/about-app"
import SkillsApp from "./apps/skills-app"
import ContactApp from "./apps/contact-app"

const apps: {
  type: AppType
  title: string
  icon: string // path or emoji
  isImage: boolean
  color: string
}[] = [
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
    color: "bg-gradient-to-br from-gray-400 to-gray-600",
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

export default function MobileDesktop({ data }: { data: PortfolioData }) {
  const [activeApp, setActiveApp] = useState<AppType | null>(null)
  const [runningApps, setRunningApps] = useState<AppType[]>([])
  const [showAppSwitcher, setShowAppSwitcher] = useState(false)

  const openApp = useCallback((appType: AppType) => {
    setActiveApp(appType)
    if (!runningApps.includes(appType)) {
      setRunningApps(prev => [...prev, appType])
    }
    setShowAppSwitcher(false)
  }, [runningApps])

  const closeApp = useCallback((appType: AppType) => {
    setRunningApps(prev => prev.filter(app => app !== appType))
    if (activeApp === appType) {
      setActiveApp(null)
    }
  }, [activeApp])

  const goHome = useCallback(() => {
    setActiveApp(null)
    setShowAppSwitcher(false)
  }, [])

  const goBack = useCallback(() => {
    setActiveApp(null)
  }, [])

  const renderAppContent = (appType: AppType) => {
    switch (appType) {
      case "resume": return <ResumeApp data={data} />
      case "achievements": return <AchievementsApp data={data} />
      case "calender": return <CalendarApp />
      case "experience": return <ExperienceApp data={data} />
      case "projects": return <ProjectsApp data={data} />
      case "files": return <FilesApp data={data} />
      case "terminal": return <TerminalApp data={data} />
      case "about": return <AboutApp data={data} />
      case "skills": return <SkillsApp data={data} />
      case "contact": return <ContactApp data={data} />
      default: return <div>Unknown app</div>
    }
  }

  const getAppTitle = (appType: AppType) =>
    apps.find(app => app.type === appType)?.title || "App"

  /** ---------- iOS HOME ---------- **/
  if (!activeApp && !showAppSwitcher) {
    return (
      <div
        className="h-screen flex flex-col font-[SF Pro Display] text-[15px]"
        style={{
          background: "linear-gradient(135deg,#1e1b4b,#7c3aed,#f97316)",
          backgroundSize: "400% 400%",
          animation: "gradient-bg 15s ease infinite",
        }}
      >
        {/* Status Bar */}
        <div className="h-12 flex items-center justify-between px-4 text-white text-[13px] font-medium backdrop-blur-lg bg-black/10">
          <span>9:41</span>
          <span className="tracking-wide">{data.basics.name.split(" ")[0]}</span>
          <span className="flex items-center space-x-1">
            <span>📶</span><span>🔋</span>
          </span>
        </div>

        {/* Home Grid */}
        <div className="flex-1 p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-white drop-shadow-lg">{data.basics.name}</h1>
            <p className="text-white/80 text-sm">{data.basics.tagline}</p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {apps.map(app => (
              <button
                key={app.type}
                onClick={() => openApp(app.type as AppType)}
                className="flex flex-col items-center transition-transform active:scale-95"
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${app.color} flex items-center justify-center text-white text-2xl shadow-[0_4px_8px_rgba(0,0,0,0.3)]`}
                  style={{ backdropFilter: "blur(12px)" }}
                >
                  {app.isImage ? (
                    <img
                      src={app.icon}
                      alt={app.title}
                      className="w-11 h-11 object-contain rounded-[36%/25%] shadow-[0_4px_12px_rgba(0,0,0,0.18)] pointer-events-none select-none"
                      draggable={false}
                    />
                  ) : (
                    <span className="text-2xl">{app.icon}</span>
                  )}
                </div>
                <span className="text-white text-xs mt-1">{app.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* iOS Style Dock */}
        <div className="h-20 flex items-center justify-center pb-2">
          <div className="w-36 h-14 bg-white/25 backdrop-blur-xl rounded-3xl"></div>
        </div>
      </div>
    )
  }

  /** ---------- APP VIEW ---------- **/
  if (activeApp && !showAppSwitcher) {
    return (
      <div className="h-screen bg-white dark:bg-black font-[SF Pro Display] flex flex-col">
        {/* Top Bar */}
        <div className="h-12 bg-white/80 dark:bg-black/50 backdrop-blur-lg flex items-center justify-between px-4 text-sm border-b border-white/20 dark:border-gray-800">
          <button onClick={goBack} className="flex items-center space-x-1 text-blue-500">
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <span className="font-medium">{getAppTitle(activeApp)}</span>
          <div className="w-10" />
        </div>
        <div className="flex-1 overflow-hidden">{renderAppContent(activeApp)}</div>

        {/* Bottom Controls */}
        <div className="h-20 bg-white/80 dark:bg-black/50 backdrop-blur-xl flex items-center justify-around border-t border-white/20 dark:border-gray-800">
          <button onClick={goHome} className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <Home className="w-6 h-6" />
          </button>
          <button onClick={() => setShowAppSwitcher(true)} className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <Square className="w-6 h-6" />
          </button>
        </div>
      </div>
    )
  }

  /** ---------- APP SWITCHER ---------- **/
  if (showAppSwitcher) {
    return (
      <div className="h-screen bg-black text-white">
        <div className="h-12 px-4 flex items-center justify-between text-sm bg-black/50 backdrop-blur-xl">
          <span>9:41</span>
          <span>100%</span>
        </div>
        <div className="flex-1 p-4 space-y-4">
          <h2 className="font-semibold">Running Apps</h2>
          {runningApps.map(appType => {
            const app = apps.find(a => a.type === appType)
            if (!app) return null
            return (
              <div key={appType} className="relative bg-white/10 rounded-xl flex items-center p-3 space-x-4">
                <div className={`w-12 h-12 ${app.color} rounded-lg flex items-center justify-center`}>
                  {app.isImage ? (
                    <img
                      src={app.icon}
                      alt={app.title}
                      className="w-9 h-9 object-contain rounded-[36%/25%]"
                      draggable={false}
                    />
                  ) : (
                    <span className="text-xl">{app.icon}</span>
                  )}
                </div>
                <span>{app.title}</span>
                <button
                  onClick={() => closeApp(appType)}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                >×</button>
              </div>
            )
          })}
        </div>
        <div className="h-20 flex justify-center items-center bg-white/10 backdrop-blur-xl">
          <button onClick={goHome} className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <Home className="w-6 h-6 text-black" />
          </button>
        </div>
      </div>
    )
  }

  // Fallback (should never appear)
  return null
}
