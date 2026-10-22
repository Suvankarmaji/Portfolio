"use client"

import type { PortfolioData } from "@/types/portfolio"
import { getInitials } from "@/lib/portfolio"

interface ProfileAvatarProps {
  data: PortfolioData
  className?: string
  textClassName?: string
}

export default function ProfileAvatar({ data, className = "", textClassName = "text-4xl" }: ProfileAvatarProps) {
  if (data.basics.photo) {
    return <img src={data.basics.photo} alt={data.basics.name} className={`object-cover ${className}`} />
  }

  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 text-white font-bold select-none ${className}`}
    >
      <span className={textClassName}>{getInitials(data.basics.name)}</span>
    </div>
  )
}
