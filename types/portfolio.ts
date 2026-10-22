export interface PortfolioData {
  basics: {
    name: string
    tagline: string
    location: string
    email: string
    phone: string
    // Leave empty to show initials instead of a photo
    photo: string
    status: string
  }
  resume: {
    downloadLink: string
    summary: string
    sections: {
      title: string
      items: (string | Record<string, any>)[]
    }[]
  }
  skills: {
    category: string
    items: string[]
  }[]
  achievements: {
    title: string
    year: string
    description: string
  }[]
  experience: {
    company: string
    role: string
    year: string
    location?: string
    description: string
    highlights?: string[]
  }[]
  projects: {
    name: string
    tech: string[]
    description: string
    highlights?: string[]
    // Leave empty to hide the project's link buttons
    link: string
    // Deployed site, shown as a "Live Demo" button
    demo?: string
  }[]
  // Leave a link empty to hide it everywhere on the site
  socials: {
    github: string
    linkedin: string
    leetcode: string
  }
  cli: {
    commands: Record<string, string>
  }
}

export type AppType =
  | "resume"
  | "achievements"
  | "calender"
  | "experience"
  | "projects"
  | "files"
  | "terminal"
  | "about"
  | "skills"
  | "contact"

export interface WindowState {
  id: string
  appType: AppType
  title: string
  isMinimized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
}
