"use client"

import { useState, useEffect } from "react"
import Desktop from "@/components/desktop"
import { portfolioData } from "@/data/portfolio-data"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <main className="h-screen w-screen overflow-hidden">
      <Desktop data={portfolioData} />
    </main>
  )
}
