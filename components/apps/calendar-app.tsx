"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, MapPin, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import calendarEvents from "@/data/calendar-events.json"

interface CalendarEvent {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string
  importance: "low" | "medium" | "high"
  reachable: boolean
  location: string
  description: string
  category: string
}

type ViewMode = "day" | "week" | "month" | "year" | "5year" | "10year"

export default function CalendarApp() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<ViewMode>("month")
  const [events] = useState<CalendarEvent[]>(calendarEvents.events as CalendarEvent[])

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high": return "border-red-500 bg-red-50 dark:bg-red-900/20"
      case "medium": return "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
      default: return "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "work": return "💼"
      case "competitive": return "🏆"
      case "deadline": return "⏰"
      default: return "📅"
    }
  }

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    switch (viewMode) {
      case "day":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
        break
      case "week":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
        break
      case "month":
        newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
        break
      case "year":
        newDate.setFullYear(newDate.getFullYear() + (direction === "next" ? 1 : -1))
        break
      case "5year":
        newDate.setFullYear(newDate.getFullYear() + (direction === "next" ? 5 : -5))
        break
      case "10year":
        newDate.setFullYear(newDate.getFullYear() + (direction === "next" ? 10 : -10))
        break
    }
    setCurrentDate(newDate)
  }

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date)
  }

  const formatDateRange = () => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long',
      ...(viewMode === 'day' && { day: 'numeric' })
    }
    return currentDate.toLocaleDateString('en-US', options)
  }

  const renderMonthView = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const currentDateStr = new Date().toISOString().split('T')[0]

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      const dateStr = date.toISOString().split('T')[0]
      const dayEvents = getEventsForDate(dateStr)
      const isCurrentMonth = date.getMonth() === month
      const isToday = dateStr === currentDateStr

      days.push(
        <div
          key={i}
          className={`min-h-24 p-2 border border-gray-200 dark:border-gray-700 ${
            isCurrentMonth ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'
          } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
        >
          <div className={`text-sm font-medium ${isToday ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
            {date.getDate()}
          </div>
          <div className="space-y-1 mt-1">
            {dayEvents.slice(0, 2).map(event => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded truncate ${getImportanceColor(event.importance)}`}
                title={event.title}
              >
                {getCategoryIcon(event.category)} {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-7 gap-0 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-gray-100 dark:bg-gray-700 p-3 text-center font-medium text-sm">
            {day}
          </div>
        ))}
        {days}
      </div>
    )
  }

  const renderEventsList = () => {
    const today = new Date().toISOString().split('T')[0]
    const upcomingEvents = events
      .filter(event => event.date >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 10)

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Events</h3>
        {upcomingEvents.map(event => (
          <Card key={event.id} className={`${getImportanceColor(event.importance)} dark:border-gray-600`}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <span>{getCategoryIcon(event.category)}</span>
                  <span className="dark:text-white">{event.title}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {event.importance === 'high' && <AlertCircle className="w-4 h-4 text-red-500" />}
                  {!event.reachable && <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">Busy</span>}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{event.startTime} - {event.endTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <p className="text-xs">{event.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto p-6 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <CalendarIcon className="w-6 h-6 mr-2 text-blue-500" />
              Calendar
            </h1>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => navigateDate("prev")}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-lg font-medium text-gray-900 dark:text-white min-w-48 text-center">
                {formatDateRange()}
              </span>
              <Button variant="outline" size="sm" onClick={() => navigateDate("next")}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex space-x-2">
            {(["day", "week", "month", "year", "5year", "10year"] as ViewMode[]).map(mode => (
              <Button
                key={mode}
                variant={viewMode === mode ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode(mode)}
              >
                {mode === "5year" ? "5Y" : mode === "10year" ? "10Y" : mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {viewMode === "month" ? renderMonthView() : (
              <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} view coming soon...
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            {renderEventsList()}
          </div>
        </div>
      </div>
    </div>
  )
}