"use client"

import { useState } from "react"
import { Keyboard, X } from "lucide-react"

export default function KeyboardShortcutsGuide() {
  const [isVisible, setIsVisible] = useState(true)

  const shortcuts = [
    { key: "⌘/ctrl + K", action: "Open Spotlight" },
    { key: "⌘/ctrl + W", action: "Close Window" },
    { key: "⌘/ctrl + M", action: "Minimize Window" },
    { key: "⌘/ctrl + Q", action: "Close All Windows" },
    { key: "⌘/ctrl + H", action: "Hide All Windows" },
    { key: "⌘/ctrl + 1-8", action: "Quick Launch Apps" },
    { key: "Right Click", action: "Context Menu" },
    { key: "Double Click", action: "Fullscreen Window" },
  ]

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-20 right-6 p-2 bg-black/20 backdrop-blur-md rounded-lg border border-white/20 text-white hover:bg-black/30 transition-colors z-30"
      >
        <Keyboard className="w-4 h-4" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-20 right-6 bg-black/20 backdrop-blur-md rounded-xl border border-white/20 p-4 text-white text-xs z-30 max-w-64">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Keyboard className="w-4 h-4" />
          <span className="font-medium macos-font">Shortcuts</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:bg-white/10 rounded"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
      <div className="space-y-2">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-300">{shortcut.action}</span>
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs font-mono macos-font">
                {shortcut.key}
              </kbd>
            </div>
          ))}
      </div>
    </div>
  )
}