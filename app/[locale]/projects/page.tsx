import type { Metadata } from "next";
import { WorkIndex } from "./WorkIndex";

export const metadata: Metadata = {
  title: "Work",
  description: "Four projects, end-to-end — selected UX, IA, and interaction design work.",
};

export default function ProjectsPage() {
  return <WorkIndex />;
}
