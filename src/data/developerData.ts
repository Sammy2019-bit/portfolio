import { Project, Skill, Experience } from '../types';

export const DEVELOPER_PROFILE = {
  name: "Alex Rivera",
  pronouns: "he/him",
  title: "Senior Full-Stack Engineer",
  subtitle: "Building performance-first web systems",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400",
  bio: "I craft resilient, fluid web systems combining clean code with expressive UI details. Drawing from 6+ years of full-stack experience, I focus on performance, robust architecture, and polished micro-interactions.",
  location: "San Francisco, CA",
  availability: "Available for contract / freelance",
  stats: [
    { label: "Years Experience", value: "6+" },
    { label: "Completed Projects", value: "24" },
    { label: "OSS Contributions", value: "1.2k+" },
  ],
  socials: {
    github: "https://github.com/alexrivera",
    linkedin: "https://linkedin.com/in/alexrivera",
    twitter: "https://twitter.com/alexrivera_dev",
    email: "buttysongs@gmail.com"
  }
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "proj_1",
    title: "EdgePress CDN Platform",
    description: "An automated serverless publishing engine deploying static builds and lightweight edge functions across 30+ edge nodes globally. Built-in instant invalidation pipeline.",
    category: "devops",
    tags: ["Docker", "Go", "AWS", "GitHub Actions", "Vercel"],
    stats: { stars: 218, lighthouseScore: 99 },
    featured: true,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: "proj_2",
    title: "Aura Component Library",
    description: "A highly accessible, headless React component framework. Features built-in state routers, fluid spring-physics layouts, and automatic dark-mode contrast checking.",
    category: "frontend",
    tags: ["TypeScript", "React", "Motion", "Tailwind CSS"],
    stats: { stars: 640, downloads: "18k/mo" },
    featured: true,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: "proj_3",
    title: "Chronos Sync Server",
    description: "A high-concurrency Node.js database synchronization server utilizing hybrid logical clocks. Safely handles off-grid operations and reconciles multi-tenant replication logs.",
    category: "fullstack",
    tags: ["Node.js", "Redis", "PostgreSQL", "WebSockets"],
    stats: { stars: 154, lighthouseScore: 96 },
    featured: true,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: "proj_4",
    title: "Scribe Markdown Engine",
    description: "An interactive, web-based writing editor with real-time markdown tokenization, smart autocompletion, context summaries, and dynamic PDF compiler pipelines.",
    category: "frontend",
    tags: ["React", "TypeScript", "Vite", "WebAssembly"],
    stats: { stars: 312, lighthouseScore: 97 },
    featured: false,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: "proj_5",
    title: "Metris API Proxy",
    description: "A lightweight, low-latency API proxy and query consolidator. Integrates memory caching, adaptive rate-limiting, and microsecond performance log exports.",
    category: "fullstack",
    tags: ["Express", "TypeScript", "Redis", "Docker"],
    stats: { stars: 95, lighthouseScore: 98 },
    featured: false,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400"
  }
];

export const SKILLS_DATA: Skill[] = [
  // Languages
  { name: "TypeScript / JavaScript", category: "languages", level: 95, iconName: "code-2" },
  { name: "Node.js", category: "languages", level: 90, iconName: "server" },
  { name: "Python", category: "languages", level: 75, iconName: "terminal" },
  { name: "Go", category: "languages", level: 70, iconName: "cpu" },
  
  // Frameworks
  { name: "React / React Native", category: "frameworks", level: 95, iconName: "layers" },
  { name: "Next.js", category: "frameworks", level: 92, iconName: "layout" },
  { name: "Express.js", category: "frameworks", level: 88, iconName: "network" },
  { name: "Tailwind CSS", category: "frameworks", level: 95, iconName: "palette" },
  
  // Tools & DBs
  { name: "PostgreSQL & Redis", category: "tools", level: 85, iconName: "database" },
  { name: "Docker & AWS", category: "tools", level: 80, iconName: "cloud" },
  { name: "Git & CI/CD", category: "tools", level: 90, iconName: "git-branch" },
  { name: "Motion & UI Design", category: "tools", level: 85, iconName: "sparkles" },
];

export const EXPERIENCES_DATA: Experience[] = [
  {
    id: "exp_1",
    role: "Senior Systems Engineer",
    company: "Vortex Labs",
    period: "2024 - Present",
    description: "Leading the core platform team building cloud systems and scalable client portals.",
    achievements: [
      "Designed and deployed a serverless rendering layer that reduced global TTFB by 42%.",
      "Migrated monolithic real-time dashboards to optimized WebSockets, cutting bandwidth by 65%.",
      "Mentored 6 junior engineers and standardized strict TypeScript guidelines across 12 services."
    ]
  },
  {
    id: "exp_2",
    role: "Full-Stack Developer",
    company: "Synthetix Corp",
    period: "2022 - 2024",
    description: "Developed and managed premium enterprise client dashboards and tooling.",
    achievements: [
      "Engineered an interactive drag-and-drop analytics dashboard utilizing SVG layout layers.",
      "Optimized cold-start database queries, improving dashboard load times from 2.4s to 450ms.",
      "Built an internal component toolkit used by 18 designers and developers, speeding up shipping time by 4x."
    ]
  },
  {
    id: "exp_3",
    role: "Frontend Engineer",
    company: "Nebula Software",
    period: "2020 - 2022",
    description: "Crafted sleek and accessible user-facing layouts and micro-services.",
    achievements: [
      "Wrote responsive, component-focused React code targeting strict WCAG AA accessibility rules.",
      "Built custom visual modules using canvas and D3 for complex astronomical data charting."
    ]
  }
];
