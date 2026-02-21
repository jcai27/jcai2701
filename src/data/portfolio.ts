export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
  bio: string;
  avatarUrl: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  logoUrl?: string;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  description: string;
  logoUrl?: string;
}

export interface ResumeAsset {
  fileName: string;
  dataUrl: string;
}

export interface BeyondWorkSection {
  title: string;
  description: string;
  imageUrls: string[];
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  beyondWorkSections: BeyondWorkSection[];
  skills: string[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  resume: ResumeAsset | null;
}

export const DEFAULT_RESUME_URL = "/resume-joshua-cai.pdf";
export const PORTFOLIO_STORAGE_KEY = "portfolio-cms-v1";

export const defaultPortfolioData: PortfolioData = {
  personalInfo: {
    name: "Joshua Cai",
    title: "Full-Stack Developer",
    tagline: "I build elegant, performant web applications that solve real problems.",
    email: "alex@example.com",
    github: "https://github.com/alexjohnson",
    linkedin: "https://linkedin.com/in/alexjohnson",
    location: "San Francisco, CA",
    bio: "I'm a passionate full-stack developer with 5+ years of experience building web applications. I love working with modern technologies and creating clean, user-friendly interfaces. When I'm not coding, you'll find me hiking, reading, or contributing to open-source projects.",
    avatarUrl: "/placeholder.svg",
  },
  beyondWorkSections: [
    {
      title: "Tennis",
      description: "I play tennis to stay sharp and competitive. I enjoy singles matches and the focus it takes to adapt point by point.",
      imageUrls: ["", ""],
    },
    {
      title: "Chess",
      description: "Chess helps me think in systems, plan ahead, and stay calm under pressure. I especially enjoy studying positional games.",
      imageUrls: ["", ""],
    },
    {
      title: "Swimming",
      description: "Swimming is my reset routine. It keeps me disciplined, consistent, and gives me space to think through ideas.",
      imageUrls: ["", ""],
    },
  ],
  skills: [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "PostgreSQL",
    "Tailwind CSS",
    "Next.js",
    "Docker",
    "GraphQL",
    "AWS",
    "Git",
    "REST APIs",
  ],
  projects: [
    {
      title: "TaskFlow",
      description: "A project management tool with real-time collaboration, kanban boards, and team analytics.",
      tech: ["React", "Node.js", "PostgreSQL", "WebSocket"],
      github: "https://github.com/alexjohnson/taskflow",
      live: "https://taskflow-demo.vercel.app",
    },
    {
      title: "CodeSnap",
      description: "Beautiful code snippet sharing platform with syntax highlighting and embed support.",
      tech: ["TypeScript", "Next.js", "Prisma", "Tailwind CSS"],
      github: "https://github.com/alexjohnson/codesnap",
      live: "https://codesnap.dev",
    },
    {
      title: "WeatherLens",
      description: "A sleek weather dashboard with 7-day forecasts, interactive maps, and location-based alerts.",
      tech: ["React", "Python", "FastAPI", "Chart.js"],
      github: "https://github.com/alexjohnson/weatherlens",
      live: "",
    },
    {
      title: "DevBlog Engine",
      description: "A minimal, blazing-fast static blog engine built for developers who write in Markdown.",
      tech: ["TypeScript", "Astro", "MDX", "Tailwind CSS"],
      github: "https://github.com/alexjohnson/devblog-engine",
      live: "https://devblog-engine.netlify.app",
    },
  ],
  experience: [
    {
      role: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      period: "2022 - Present",
      description: "Lead frontend architecture for a SaaS platform serving 50k+ users. Built design system, improved performance by 40%, and mentored junior developers.",
      logoUrl: "",
    },
    {
      role: "Full-Stack Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      description: "Developed and maintained multiple client-facing applications using React and Node.js. Implemented CI/CD pipelines and automated testing.",
      logoUrl: "",
    },
    {
      role: "Junior Developer",
      company: "WebAgency Co.",
      period: "2018 - 2020",
      description: "Built responsive websites and web applications for clients across various industries. Collaborated with designers to implement pixel-perfect UIs.",
      logoUrl: "",
    },
  ],
  education: [
    {
      degree: "B.S. Computer Science",
      school: "University of California, Berkeley",
      period: "2014 - 2018",
      description: "Graduated with honors. Focused on software engineering and human-computer interaction.",
      logoUrl: "",
    },
  ],
  resume: null,
};
