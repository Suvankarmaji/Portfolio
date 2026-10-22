"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Minus, Square, X, Maximize2 } from "lucide-react"
import type { WindowState } from "@/types/portfolio"

interface WindowProps {
  window: WindowState
  isActive: boolean
  children: React.ReactNode
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
  onUpdate: (updates: Partial<WindowState>) => void
}

export default function Window({ window, isActive, children, onClose, onMinimize, onFocus, onUpdate }: WindowProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState<string | null>(null)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [previousState, setPreviousState] = useState<{
    position: { x: number; y: number }
    size: { width: number; height: number }
  } | null>(null)

  const windowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const newX = Math.max(0, Math.min(globalThis.window.innerWidth - window.size.width, e.clientX - dragStart.x))
        const newY = Math.max(24, Math.min(globalThis.window.innerHeight - window.size.height - 100, e.clientY - dragStart.y))

        onUpdate({
          position: { x: newX, y: newY },
        })
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.x
        const deltaY = e.clientY - resizeStart.y

        let newWidth = resizeStart.width
        let newHeight = resizeStart.height
        let newX = window.position.x
        let newY = window.position.y

        // Handle different resize directions
        if (isResizing.includes("right")) {
          newWidth = Math.max(300, resizeStart.width + deltaX)
        }
        if (isResizing.includes("left")) {
          newWidth = Math.max(300, resizeStart.width - deltaX)
          newX = Math.min(resizeStart.x + resizeStart.width - 300, resizeStart.x + deltaX)
        }
        if (isResizing.includes("bottom")) {
          newHeight = Math.max(200, resizeStart.height + deltaY)
        }
        if (isResizing.includes("top")) {
          newHeight = Math.max(200, resizeStart.height - deltaY)
          newY = Math.min(resizeStart.y + resizeStart.height - 200, resizeStart.y + deltaY)
        }

        // Ensure window stays within bounds
        newWidth = Math.min(newWidth, globalThis.window.innerWidth - newX)
        newHeight = Math.min(newHeight, globalThis.window.innerHeight - newY - 100)

        onUpdate({
          position: { x: newX, y: newY },
          size: { width: newWidth, height: newHeight },
        })
      }
    },
    [isDragging, isResizing, dragStart, resizeStart, window, onUpdate],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    setIsResizing(null)
  }, [])

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp])

  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains("window-header")) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - window.position.x,
        y: e.clientY - window.position.y,
      })
      onFocus()
    }
  }

  const handleResizeMouseDown = (direction: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(direction)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: window.size.width,
      height: window.size.height,
    })
    onFocus()
  }

  const toggleFullscreen = () => {
    if (isFullscreen) {
      // Restore previous state
      if (previousState) {
        onUpdate({
          position: previousState.position,
          size: previousState.size,
        })
      }
      setIsFullscreen(false)
    } else {
      // Save current state and go fullscreen
      setPreviousState({
        position: window.position,
        size: window.size,
      })
      onUpdate({
        position: { x: 0, y: 24 },
        size: { width: globalThis.window.innerWidth, height: globalThis.window.innerHeight - 124 },
      })
      setIsFullscreen(true)
    }
  }

  const handleDoubleClick = () => {
    toggleFullscreen()
  }

  if (window.isMinimized) return null

  return (
    <div
      ref={windowRef}
      className={`
        absolute bg-white/95 backdrop-blur-md rounded-lg shadow-2xl border border-gray-200/50
        ${isActive ? "ring-2 ring-blue-500/50" : ""}
        ${isDragging ? "cursor-grabbing" : "cursor-default"}
        transition-all duration-200
      `}
      style={{
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
        zIndex: window.zIndex,
      }}
      onClick={onFocus}
    >
      {/* Resize Handles */}
      {!isFullscreen && (
        <>
          {/* Corner handles */}
          <div
            className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize"
            onMouseDown={handleResizeMouseDown("top-left")}
          />
          <div
            className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize"
            onMouseDown={handleResizeMouseDown("top-right")}
          />
          <div
            className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize"
            onMouseDown={handleResizeMouseDown("bottom-left")}
          />
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize"
            onMouseDown={handleResizeMouseDown("bottom-right")}
          />

          {/* Edge handles */}
          <div
            className="absolute top-0 left-3 right-3 h-1 cursor-n-resize"
            onMouseDown={handleResizeMouseDown("top")}
          />
          <div
            className="absolute bottom-0 left-3 right-3 h-1 cursor-s-resize"
            onMouseDown={handleResizeMouseDown("bottom")}
          />
          <div
            className="absolute left-0 top-3 bottom-3 w-1 cursor-w-resize"
            onMouseDown={handleResizeMouseDown("left")}
          />
          <div
            className="absolute right-0 top-3 bottom-3 w-1 cursor-e-resize"
            onMouseDown={handleResizeMouseDown("right")}
          />
        </>
      )}

      {/* Window Header */}
      <div
        className="window-header h-8 bg-gray-100/80 backdrop-blur-md rounded-t-lg flex items-center justify-between px-4 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleHeaderMouseDown}
        onDoubleClick={handleDoubleClick}
      >
        <div className="flex items-center space-x-2">
          <button
            onClick={onClose}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 flex items-center justify-center group transition-colors"
          >
            <X className="w-2 h-2 text-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button
            onClick={onMinimize}
            className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 flex items-center justify-center group transition-colors"
          >
            <Minus className="w-2 h-2 text-yellow-800 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 flex items-center justify-center group transition-colors"
          >
            {isFullscreen ? (
              <Square className="w-1.5 h-1.5 text-green-800 opacity-0 group-hover:opacity-100 transition-opacity" />
            ) : (
              <Maximize2 className="w-1.5 h-1.5 text-green-800 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>
        </div>

        <div className="text-sm font-medium text-gray-700 flex-1 text-center pointer-events-none macos-font">{window.title}</div>

        <div className="w-16" />
      </div>

      {/* Window Content */}
      <div className="h-[calc(100%-2rem)] overflow-hidden">{children}</div>
    </div>
  )
}
