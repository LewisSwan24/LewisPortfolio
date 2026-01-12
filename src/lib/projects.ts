import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export interface ProjectFrontmatter {
  slug: string;
  title: string;
  oneLiner: string;
  highlights: string[];
  role: string;
  timeframe: string;
  tools: string[];
  tags: string[];
  featured: boolean;
  status: string;
  cover: string;
  date: string;
}

export interface Project extends ProjectFrontmatter {
  content: string;
}

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }
  const files = fs.readdirSync(projectsDirectory);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getProjectBySlug(slug: string): Project | null {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: data.slug || slug,
    title: data.title || "Untitled Project",
    oneLiner: data.oneLiner || "",
    highlights: Array.isArray(data.highlights) ? data.highlights : [],
    role: data.role || "",
    timeframe: data.timeframe || "",
    tools: data.tools || [],
    tags: data.tags || [],
    featured: data.featured || false,
    status: data.status || "",
    cover: data.cover || "",
    date: data.date || "",
    content,
  };
}

export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs();
  const projects = slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is Project => project !== null)
    .sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });

  return projects;
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.featured);
}

export function getAllTags(): string[] {
  const projects = getAllProjects();
  const tagSet = new Set<string>();

  projects.forEach((project) => {
    project.tags.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}
