"use client"

import { ExternalLink, Github } from "lucide-react"
import type { PortfolioData } from "@/types/portfolio"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ProjectsAppProps {
  data: PortfolioData
}

export default function ProjectsApp({ data }: ProjectsAppProps) {
  return (
    <div className="h-full overflow-y-auto p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Projects</h1>
        <p className="text-gray-600">A collection of my work and side projects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.projects.map((project, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-2">
                {project.name}
                {project.link && (
                  <Button variant="ghost" size="sm" asChild>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                )}
              </CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              {project.highlights && (
                <ul className="mb-4 list-disc space-y-1 pl-5 text-sm text-gray-700">
                  {project.highlights.map((highlight, highlightIndex) => (
                    <li key={highlightIndex}>{highlight}</li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="inline-block bg-violet-100 text-violet-800 px-2 py-1 rounded text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {project.demo && (
                  <Button size="sm" asChild className="bg-violet-600 hover:bg-violet-700">
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.link && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View Project
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
