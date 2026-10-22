"use client"

import { ExternalLink, Folder } from "lucide-react"
import type { PortfolioData } from "@/types/portfolio"
import { Button } from "@/components/ui/button"
import { getSocialLinks } from "@/lib/portfolio"

interface FilesAppProps {
  data: PortfolioData
}

export default function FilesApp({ data }: FilesAppProps) {
  const socialLinks = getSocialLinks(data)

  return (
    <div className="h-full overflow-y-auto p-6 bg-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
          <Folder className="w-6 h-6 mr-2 text-blue-500" />
          Important Files
        </h1>
        <p className="text-gray-600">Links to my profiles and resume</p>
      </div>

      <div className="space-y-4">
        {socialLinks.length === 0 && (
          <p className="text-sm text-gray-500">Profile links coming soon.</p>
        )}
        {socialLinks.map((link, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{link.icon}</span>
              <div>
                <h3 className="font-medium text-gray-900">{link.name}</h3>
                <p className="text-sm text-gray-500">{link.url}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Resume</h2>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">📄</span>
              <div>
                <h3 className="font-medium text-gray-900">Resume.pdf</h3>
                <p className="text-sm text-gray-500">Latest version</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <a href={data.resume.downloadLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
