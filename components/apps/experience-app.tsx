"use client"

import { Briefcase, Calendar, MapPin } from "lucide-react"
import type { PortfolioData } from "@/types/portfolio"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ExperienceAppProps {
  data: PortfolioData
}

export default function ExperienceApp({ data }: ExperienceAppProps) {
  return (
    <div className="h-full overflow-y-auto p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
          <Briefcase className="w-6 h-6 mr-2 text-violet-500" />
          Work Experience
        </h1>
        <p className="text-gray-600">Professional experience and roles</p>
      </div>

      <div className="space-y-6">
        {data.experience.map((exp, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {exp.company}
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {exp.year}
                </div>
              </CardTitle>
              <CardDescription className="flex items-center justify-between">
                <span className="text-lg font-medium text-violet-600">{exp.role}</span>
                {exp.location && (
                  <span className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    {exp.location}
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{exp.description}</p>
              {exp.highlights && (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
                  {exp.highlights.map((highlight, highlightIndex) => (
                    <li key={highlightIndex}>{highlight}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
