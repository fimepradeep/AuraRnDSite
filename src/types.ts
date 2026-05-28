export interface SystemNode {
  id: string;
  label: string;
  type: 'client' | 'gateway' | 'server' | 'database' | 'auth' | 'cache' | 'worker';
  status: 'active' | 'synced' | 'pending';
  latency?: string;
  details?: string;
  x: number; // Percentage horizontal position (0-100)
  y: number; // Percentage vertical position (0-100)
}

export interface SystemEdge {
  from: string;
  to: string;
  label: string;
  flowDirection?: 'forward' | 'backward' | 'both';
  active?: boolean;
}

export interface ArchitectureTemplate {
  id: string;
  title: string;
  description: string;
  category: 'Android Mobile' | 'Distributed Systems' | 'Cloud Native' | 'Security & AI';
  nodes: SystemNode[];
  edges: SystemEdge[];
}

export interface ResearchArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'Android OS' | 'Play Store Compliance' | 'Systems Cryptography' | 'Parallel Computing';
  readTime: string;
  publishedDate: string;
  author: string;
  tags: string[];
}

export interface ShowcaseProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  platform: 'Android' | 'Web Framework' | 'Embedded / Systems' | 'AI SDK';
  status: 'Published' | 'Under Play Audit' | 'R&D Labs';
  iconName: string;
  playStoreUrl?: string;
  highlights: string[];
}
