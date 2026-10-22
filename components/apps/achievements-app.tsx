"use client"

import { Trophy, Calendar } from "lucide-react"
import type { PortfolioData } from "@/types/portfolio"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AchievementsAppProps {
  data: PortfolioData
}

export default function AchievementsApp({ data }: AchievementsAppProps) {
  const getAchievementIcon = (title: string) => {
    if (title.includes("LeetCode")) return "https://leetcode.com/favicon-16x16.png"
    if (title.includes("IBM")) return "🤖"
    if (title.includes("Hackathon")) return "⚡"
    if (title.includes("Spanish")) return "🇪🇸"
    if (title.includes("Volunteer")) return "🩸"
    return "🎖️"
  }

  const extractLink = (description: string) => {
    const linkMatch = description.match(/\[.*?\]\((.*?)\)/)
    return linkMatch ? linkMatch[1] : null
  }

  return (
    <div className="h-full overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
          Achievements
        </h1>
        <p className="text-gray-600 dark:text-gray-300">Milestones and accomplishments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.achievements.map((achievement, index) => {
          const link = extractLink(achievement.description)
          const icon = getAchievementIcon(achievement.title)

          const cardContent = (
            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {typeof icon === 'string' && icon.startsWith('http') ? (
                      <img src={icon} alt="" className="w-6 h-6" />
                    ) : (
                      <span className="text-2xl">{icon}</span>
                    )}
                    <span className="dark:text-white">{achievement.title}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    {achievement.year}
                  </div>
                </CardTitle>
                <CardDescription className="dark:text-gray-300">
                  {achievement.description.replace(/\[.*?\]\(.*?\)/g, '').trim()}
                </CardDescription>
              </CardHeader>
            </Card>
          )

          return (
            <div key={index}>
              {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {cardContent}
                </a>
              ) : (
                cardContent
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}