import { ReactNode } from "react";

export interface NavigationItem {
  id: number;
  to: string;
  label: string;
}

export interface SocialLink {
  href: string;
  icon: ReactNode;
  label: string;
}

export interface TechStackItem {
  icon: ReactNode;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  sprite: string;
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleDelay: number;
  twinkleDuration: number;
  depth: number;
}

export interface Position {
  x: number;
  y: number;
}
