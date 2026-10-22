"use client"

import { MapPin, Mail, Phone, User, GraduationCap, ExternalLink } from "lucide-react"
import type { PortfolioData } from "@/types/portfolio"
import ProfileAvatar from "@/components/profile-avatar"
import { getEducation, getSocialLinks } from "@/lib/portfolio"

interface AboutAppProps {
  data: PortfolioData
}

export default function AboutApp({ data }: AboutAppProps) {
  const education = getEducation(data)
  const socialLinks = getSocialLinks(data)

  return (
    <div className="h-full overflow-y-auto p-6 bg-gradient-to-br from-violet-50 to-orange-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <ProfileAvatar data={data} className="w-32 h-32 mx-auto mb-4 rounded-full shadow-lg" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.basics.name}</h1>
          <p className="text-lg text-gray-600 mb-4">{data.basics.tagline}</p>
          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            {data.basics.status}
          </span>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">About</h2>
          <p className="text-gray-700 leading-relaxed">{data.resume.summary}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-violet-500" />
            Contact Information
          </h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">{data.basics.location}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <a href={`mailto:${data.basics.email}`} className="text-violet-600 hover:underline">
                {data.basics.email}
              </a>
            </div>
            {data.basics.phone && (
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <a href={`tel:${data.basics.phone}`} className="text-violet-600 hover:underline">
                  {data.basics.phone}
                </a>
              </div>
            )}
            {socialLinks.map((link) => (
              <div key={link.name} className="flex items-center space-x-3">
                <ExternalLink className="w-5 h-5 text-gray-400" />
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">
                  {link.name}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <GraduationCap className="w-5 h-5 mr-2 text-violet-500" />
            Education
          </h2>
          <div className="space-y-4">
            {education.map((item) => (
              <div key={item.degree} className="border-l-2 border-violet-300 pl-4">
                <p className="font-medium text-gray-900">{item.degree}</p>
                <p className="text-sm text-gray-600">{item.institute}</p>
                <p className="text-sm text-gray-500">{[item.year, item.gpa].filter(Boolean).join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">System Information</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">Name:</span>
              <p className="text-gray-900">{data.basics.name}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Focus:</span>
              <p className="text-gray-900">AI/ML, Data Science, Full-Stack</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Projects:</span>
              <p className="text-gray-900">{data.projects.length}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Skills:</span>
              <p className="text-gray-900">{data.skills.reduce((count, group) => count + group.items.length, 0)}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Experience:</span>
              <p className="text-gray-900">{data.experience.length} {data.experience.length === 1 ? "role" : "roles"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Status:</span>
              <p className="text-green-600">Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
