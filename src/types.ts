export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'frontend' | 'fullstack' | 'devops';
  tags: string[];
  stats: {
    stars?: number;
    downloads?: string;
    lighthouseScore?: number;
  };
  featured: boolean;
  image: string;
}

export interface Skill {
  name: string;
  category: 'languages' | 'frameworks' | 'tools';
  level: number; // 0 to 100
  iconName: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface ServiceEstimate {
  serviceType: string;
  complexity: 'simple' | 'medium' | 'complex';
  timeline: string;
  priceEstimate: number;
}
