"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import type { PortfolioData } from "@/types/portfolio"
import { techLogos } from "@/lib/portfolio"

interface SkillsAppProps {
  data: PortfolioData
}

export default function SkillsApp({ data }: SkillsAppProps) {
  const [activeCategory, setActiveCategory] = useState("All")
  const categories = ["All", ...data.skills.map((group) => group.category)]
  const visibleGroups =
    activeCategory === "All" ? data.skills : data.skills.filter((group) => group.category === activeCategory)

  // Projects that use a given skill, so each card can show where it was applied
  const usedIn = (skill: string) =>
    data.projects.filter((project) => project.tech.some((tech) => tech.toLowerCase() === skill.toLowerCase()))

  return (
    <div className="h-full overflow-y-auto p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
          <Sparkles className="w-6 h-6 mr-2 text-violet-500" />
          Skills
        </h1>
        <p className="text-gray-600">Tools and technologies I work with, and where I've used them</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? "bg-violet-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-violet-50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {visibleGroups.map((group) => (
          <section key={group.category}>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{group.category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {group.items.map((skill) => {
                const projects = usedIn(skill)
                return (
                  <div
                    key={skill}
                    title={projects.length ? `Used in: ${projects.map((project) => project.name).join(", ")}` : undefined}
                    className="bg-white border border-gray-100 rounded-xl p-4 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    {techLogos[skill] ? (
                      <img src={techLogos[skill]} alt="" className="w-9 h-9 mb-2" />
                    ) : (
                      <div className="w-9 h-9 mb-2 rounded-lg bg-gradient-to-br from-violet-500 to-orange-400 text-white text-sm font-bold flex items-center justify-center">
                        {skill.slice(0, 2)}
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-900">{skill}</span>
                    {projects.length > 0 && (
                      <span className="mt-1 text-xs text-violet-600">
                        {projects.length} {projects.length === 1 ? "project" : "projects"}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
