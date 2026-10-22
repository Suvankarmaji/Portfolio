"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, Command } from "lucide-react"
import type { PortfolioData, AppType } from "@/types/portfolio"

interface SpotlightProps {
  data: PortfolioData
  onOpenApp: (appType: AppType, title: string) => void
}

interface SearchResult {
  id: string
  title: string
  subtitle: string
  type: "app" | "command" | "content"
  action: () => void
  icon: string
}

export default function Spotlight({ data, onOpenApp }: SpotlightProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const searchableItems: SearchResult[] = [
    {
      id: "resume",
      title: "Resume",
      subtitle: "View resume and download PDF",
      type: "app",
      action: () => onOpenApp("resume", "Resume"),
      icon: "📄",
    },
    {
      id: "terminal",
      title: "Terminal",
      subtitle: "Open terminal application",
      type: "app",
      action: () => onOpenApp("terminal", "Terminal"),
      icon: "⚡",
    },
    {
      id: "projects",
      title: "Projects",
      subtitle: "Browse project portfolio",
      type: "app",
      action: () => onOpenApp("projects", "Projects"),
      icon: "🚀",
    },
    {
      id: "achievements",
      title: "Achievements",
      subtitle: "View accomplishments and awards",
      type: "app",
      action: () => onOpenApp("achievements", "Achievements"),
      icon: "🏆",
    },
    {
      id: "experience",
      title: "Experience",
      subtitle: "Professional work history",
      type: "app",
      action: () => onOpenApp("experience", "Experience"),
      icon: "💼",
    },
    {
      id: "skills",
      title: "Skills",
      subtitle: "Languages, ML/AI, frontend, backend and tools",
      type: "app",
      action: () => onOpenApp("skills", "Skills"),
      icon: "🧠",
    },
    {
      id: "contact",
      title: "Contact",
      subtitle: "Email, phone and send a message",
      type: "app",
      action: () => onOpenApp("contact", "Contact"),
      icon: "✉️",
    },
    {
      id: "about",
      title: "About Me",
      subtitle: "Personal information and bio",
      type: "app",
      action: () => onOpenApp("about", "About Me"),
      icon: "👤",
    },
    ...data.projects.map((project) => ({
      id: `project-${project.name}`,
      title: project.name,
      subtitle: project.description,
      type: "content" as const,
      action: () => onOpenApp("projects", "Projects"),
      icon: "🔧",
    })),
    ...data.skills.flatMap((group) =>
      group.items.map((skill) => ({
        id: `skill-${skill}`,
        title: skill,
        subtitle: `Skill · ${group.category}`,
        type: "content" as const,
        action: () => onOpenApp("skills", "Skills"),
        icon: "🧠",
      })),
    ),
    ...data.achievements.map((achievement) => ({
      id: `achievement-${achievement.title}`,
      title: achievement.title,
      subtitle: achievement.description,
      type: "content" as const,
      action: () => onOpenApp("achievements", "Achievements"),
      icon: "🏅",
    })),
  ]
  
  useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault()
      setIsOpen(true)
      setTimeout(() => inputRef.current?.focus(), 100)
    } else if (e.key === "Escape") {
      setIsOpen(false)
      setQuery("")
      setSelectedIndex(0)
    }
  }

  document.addEventListener("keydown", handleKeyDown)
  return () => document.removeEventListener("keydown", handleKeyDown)
}, [])

  useEffect(() => {
    if (query.trim()) {
      const filtered = searchableItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filtered.slice(0, 8))
      setSelectedIndex(0)
    } else {
      setResults(searchableItems.slice(0, 6))
      setSelectedIndex(0)
    }
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (results[selectedIndex]) {
        results[selectedIndex].action()
        setIsOpen(false)
        setQuery("")
        setSelectedIndex(0)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-32">
      <div className="w-full max-w-2xl mx-4">
        <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden">
          <div className="flex items-center p-4 border-b border-gray-200/50">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search applications, projects, and more..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500"
            />
            <div className="flex items-center space-x-1 text-xs text-gray-400">
              <Command className="w-3 h-3" />
              <span>+ k</span>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {results.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No results found for "{query}"</div>
            ) : (
              results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => {
                    result.action()
                    setIsOpen(false)
                    setQuery("")
                    setSelectedIndex(0)
                  }}
                  className={`w-full p-4 text-left hover:bg-blue-50 flex items-center space-x-3 ${
                    index === selectedIndex ? "bg-blue-50 border-r-2 border-blue-500" : ""
                  }`}
                >
                  <span className="text-2xl">{result.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">{result.title}</div>
                    <div className="text-sm text-gray-500 truncate">{result.subtitle}</div>
                  </div>
                  <div className="text-xs text-gray-400 capitalize">{result.type}</div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
