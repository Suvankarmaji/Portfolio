import type { PortfolioData } from "@/types/portfolio"

const devicon = (path: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`

export const techLogos: Record<string, string> = {
  "C++": devicon("cplusplus/cplusplus-original.svg"),
  Python: devicon("python/python-original.svg"),
  Java: devicon("java/java-original.svg"),
  JavaScript: devicon("javascript/javascript-original.svg"),
  TypeScript: devicon("typescript/typescript-original.svg"),
  SQL: devicon("azuresqldatabase/azuresqldatabase-original.svg"),
  React: devicon("react/react-original.svg"),
  "Next.js": devicon("nextjs/nextjs-original.svg"),
  "Tailwind CSS": devicon("tailwindcss/tailwindcss-original.svg"),
  Redux: devicon("redux/redux-original.svg"),
  "Node.js": devicon("nodejs/nodejs-original.svg"),
  FastAPI: devicon("fastapi/fastapi-original.svg"),
  Express: devicon("express/express-original.svg"),
  Vite: devicon("vitejs/vitejs-original.svg"),
  MongoDB: devicon("mongodb/mongodb-original.svg"),
  MySQL: devicon("mysql/mysql-original.svg"),
  PostgreSQL: devicon("postgresql/postgresql-original.svg"),
  Docker: devicon("docker/docker-original.svg"),
  Git: devicon("git/git-original.svg"),
  GitHub: devicon("github/github-original.svg"),
  Linux: devicon("linux/linux-original.svg"),
  AWS: devicon("amazonwebservices/amazonwebservices-plain-wordmark.svg"),
  PyTorch: devicon("pytorch/pytorch-original.svg"),
  TensorFlow: devicon("tensorflow/tensorflow-original.svg"),
  "scikit-learn": devicon("scikitlearn/scikitlearn-original.svg"),
  Pandas: devicon("pandas/pandas-original.svg"),
  NumPy: devicon("numpy/numpy-original.svg"),
  Matplotlib: devicon("matplotlib/matplotlib-original.svg"),
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase())
    .slice(0, 2)
    .join("")
}

// Only the socials that have a link filled in
export function getSocialLinks(data: PortfolioData) {
  return [
    { name: "GitHub", url: data.socials.github, icon: "🐙" },
    { name: "LinkedIn", url: data.socials.linkedin, icon: "💼" },
    { name: "LeetCode", url: data.socials.leetcode, icon: "💻" },
  ].filter((link) => link.url)
}

export function getEducation(data: PortfolioData) {
  return (data.resume.sections.find((section) => section.title === "Education")?.items ?? []) as {
    degree: string
    institute: string
    year?: string
    gpa?: string
  }[]
}
