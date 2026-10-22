"use client"

import type React from "react"
import { useState } from "react"
import { Check, Copy, Mail, MapPin, Phone, Send } from "lucide-react"
import type { PortfolioData } from "@/types/portfolio"
import { Button } from "@/components/ui/button"
import { getSocialLinks } from "@/lib/portfolio"
import ProfileAvatar from "@/components/profile-avatar"

interface ContactAppProps {
  data: PortfolioData
}

export default function ContactApp({ data }: ContactAppProps) {
  const [copied, setCopied] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const copy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(label)
      setTimeout(() => setCopied(null), 1500)
    } catch {
      // Clipboard can be blocked (e.g. non-secure context); the value is still visible to copy by hand
    }
  }

  // The site is static, so the form hands off to the visitor's mail app
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = `${message}\n\n— ${name}`
    window.location.href = `mailto:${data.basics.email}?subject=${encodeURIComponent(
      subject || `Hello from ${name || "your portfolio"}`,
    )}&body=${encodeURIComponent(body)}`
  }

  const contactRows = [
    { label: "Email", value: data.basics.email, href: `mailto:${data.basics.email}`, icon: Mail },
    { label: "Phone", value: data.basics.phone, href: `tel:${data.basics.phone}`, icon: Phone },
    { label: "Location", value: data.basics.location, icon: MapPin },
  ].filter((row) => row.value)

  return (
    <div className="h-full overflow-y-auto p-6 bg-gradient-to-br from-violet-50 to-orange-50">
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <ProfileAvatar data={data} className="w-16 h-16 rounded-full shadow" textClassName="text-xl" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Let's talk</h1>
              <p className="text-sm text-gray-600">{data.basics.status}</p>
            </div>
          </div>

          {contactRows.map(({ label, value, href, icon: Icon }) => (
            <div key={label} className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
              <div className="flex items-center gap-3 min-w-0">
                <Icon className="w-5 h-5 text-violet-500 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm font-medium text-gray-900 hover:underline break-all">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-gray-900">{value}</p>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => copy(label, value)} aria-label={`Copy ${label}`}>
                {copied === label ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          ))}

          {getSocialLinks(data).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {getSocialLinks(data).map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-violet-100"
                >
                  <span>{link.icon}</span>
                  {link.name}
                </a>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-5 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Send a message</h2>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-violet-400"
          />
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject (e.g. Internship opportunity)"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-violet-400"
          />
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
            rows={6}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-violet-400 resize-none"
          />
          <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700">
            <Send className="w-4 h-4 mr-2" />
            Open in mail app
          </Button>
        </form>
      </div>
    </div>
  )
}
