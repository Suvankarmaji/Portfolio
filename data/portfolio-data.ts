import type { PortfolioData } from "@/types/portfolio"
export const portfolioData: PortfolioData = {
  basics: {
    name: "Suvankar Maji",
    tagline: "AI/ML & Data Science | Generative AI (LLMs, RAG) | Full-Stack (React, FastAPI) | CS @ VIT Vellore 2027",
    location: "Howrah, India",
    email: "suvankarmaji72@gmail.com",
    phone: "+91-9474303177",
    photo: "",
    status: "Open to AI/ML, Data Science & SDE roles",
  },
  resume: {
    downloadLink: "resume.pdf",
    summary:
      "AI/ML and Data Science fresher with hands-on experience in machine learning, deep learning, data analysis with Python and SQL, and generative AI (LLMs, RAG). Strong in data structures and algorithms, with a focus on clean, efficient code. Able to build end-to-end solutions with React, FastAPI and MongoDB, from model to working application.",
    sections: [
      {
        title: "Education",
        items: [
          {
            degree: "B.Tech in Computer Science & Engineering",
            institute: "Vellore Institute of Technology (VIT), Vellore",
            year: "2023–2027",
            gpa: "CGPA: 8.1/10",
          },
          {
            degree: "Higher Secondary (Class XII)",
            institute: "KPHS, Howrah",
            gpa: "85%",
          },
          {
            degree: "Secondary (Class X)",
            institute: "KPHS, Howrah",
            gpa: "73%",
          },
        ],
      },
      {
        title: "Programming Languages",
        items: ["Python", "Java", "C++", "JavaScript", "SQL"],
      },
      {
        title: "Technologies",
        items: ["PyTorch", "scikit-learn", "React", "Next.js", "FastAPI", "Node.js", "MongoDB", "MySQL", "AWS"],
      },
    ],
  },
  skills: [
    { category: "Languages", items: ["Python", "Java", "C++", "JavaScript", "SQL"] },
    {
      category: "ML / AI",
      items: [
        "PyTorch",
        "scikit-learn",
        "XGBoost",
        "CNN",
        "ResNet",
        "EfficientNet",
        "YOLOv5",
        "LLMs",
        "RAG",
        "Prompt Engineering",
      ],
    },
    { category: "Data", items: ["Pandas", "NumPy", "Matplotlib"] },
    { category: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Redux"] },
    { category: "Backend & Databases", items: ["Node.js", "Express", "FastAPI", "MongoDB", "MySQL"] },
    { category: "Tools", items: ["Git", "GitHub", "Linux", "AWS"] },
  ],
  achievements: [
    {
      title: "Generative AI Intern - IBM",
      year: "2026",
      description: "Built retrieval-augmented generation (RAG) workflows and LLM prompts with IBM Watson tools.",
    },
    {
      title: "LeetCode - Regular DSA Practice",
      year: "Ongoing",
      description:
        "Regularly solve data structures and algorithms problems across arrays, trees and dynamic programming. [profile](https://leetcode.com/u/Suvankar72/)",
    },
    {
      title: "Hackathon Participant",
      year: "VIT",
      description: "Took part in multiple hackathons, building working prototypes under time pressure.",
    },
    {
      title: "Core Member, Spanish Club - VIT Vellore",
      year: "VIT",
      description: "Helped organize language and cultural events and club activities.",
    },
    {
      title: "Social Service Volunteer",
      year: "Ongoing",
      description: "Volunteer in social service activities, including blood donation drives.",
    },
  ],
  experience: [
    {
      company: "IBM",
      role: "Generative AI Intern",
      year: "May 2026 – Jul 2026",
      location: "Remote",
      description: "Worked with large language models, RAG and conversational AI on IBM Watson.",
      highlights: [
        "Designed and tested prompts for large language models to improve the relevance and accuracy of generated outputs.",
        "Built and explored retrieval-augmented generation (RAG) workflows using IBM Watson tools to ground responses in source documents.",
        "Studied conversational AI design, including intent handling and multi-turn dialogue, through hands-on exercises on IBM Watson.",
      ],
    },
  ],
  projects: [
    {
      name: "Plant Disease Detection",
      tech: ["Python", "CNN", "ResNet", "EfficientNet", "YOLOv5"],
      description: "Deep learning system that detects plant diseases from leaf images (PlantVillage dataset).",
      highlights: [
        "Trained and compared ResNet and EfficientNet CNN models, and used YOLOv5 for disease detection.",
        "Achieved 93% accuracy and a 0.91 F1-score.",
      ],
      link: "",
    },
    {
      name: "Hospital Bed Management with ML Wait-Time Prediction",
      tech: ["React", "FastAPI", "MongoDB", "XGBoost"],
      description: "Full-stack platform for admissions, bed allocation and wait-time prediction on 1,000+ records.",
      highlights: [
        "Tuned Random Forest and XGBoost models, reaching 85% accuracy.",
        "Served predictions via sub-100ms FastAPI APIs to a React dashboard with 15+ reusable components.",
        "Cut page load time 40% (3.2s to 1.9s) with code splitting and lazy loading.",
      ],
      link: "https://github.com/Suvankarmaji/Hospital-Bed-Prediction-System",
    },
    {
      name: "ShopZone",
      tech: ["React", "Vite", "Express", "Node.js", "MongoDB", "JWT", "Razorpay"],
      description: "Full-stack e-commerce store with an admin dashboard, online payments and Cash on Delivery.",
      highlights: [
        "Built a React 18 + Vite frontend backed by an Express + MongoDB REST API.",
        "Implemented JWT authentication stored in httpOnly cookies.",
        "Computed prices server-side and handled stock updates in database transactions to prevent overselling.",
        "Integrated Razorpay payments with webhook reconciliation, plus Cash on Delivery.",
      ],
      link: "https://github.com/Suvankarmaji/shopZone",
      demo: "https://shopzone-yoe4.onrender.com",
    },
    {
      name: "Habit Tracker",
      tech: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Redux"],
      description: "Full-stack habit tracking app with daily and weekly habits, streaks and progress charts.",
      highlights: [
        "Managed state with Hooks and Redux for real-time updates and accurate streak calculations.",
        "Stored habits, completion history and streaks in MongoDB, with charts for completion rates and long-term trends.",
      ],
      link: "https://github.com/Suvankarmaji/Habit-Tracker",
    },
    {
      name: "Portfolio Website",
      tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      description:
        "macOS-style interactive portfolio with a terminal, window manager, Spotlight search and an iOS-style mobile view.",
      link: "https://github.com/Suvankarmaji/Portfolio",
    },
  ],
  socials: {
    github: "https://github.com/Suvankarmaji",
    linkedin: "https://www.linkedin.com/in/suvankar-maji-508832283",
    leetcode: "https://leetcode.com/u/Suvankar72/",
  },
  cli: {
    commands: {
      resume: "Displays resume information",
      achievements: "Lists all achievements and activities",
      projects: "Shows project portfolio",
      experience: "Displays work experience",
      skills: "Shows skills by category",
      education: "Shows education details",
      contact: "Shows how to reach me",
      socials: "Shows social media links",
      neofetch: "Shows colorful system-like summary",
      help: "Lists all available commands",
      clear: "Clears the terminal screen",
      about: "Shows about information",
      ls: "Lists available sections",
      whoami: "Displays current user",
    },
  },
}
