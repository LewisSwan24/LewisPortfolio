import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";

export interface TOCItem {
  text: string;
  id: string;
  level: number;
}

interface HeadingNode {
  type: "heading";
  depth: number;
  children: Array<{ type: string; value?: string }>;
}

export function extractTOC(content: string): TOCItem[] {
  const slugger = new GithubSlugger();
  const toc: TOCItem[] = [];

  const tree = unified().use(remarkParse).parse(content);

  visit(tree, "heading", (node: HeadingNode) => {
    if (node.depth >= 2 && node.depth <= 3) {
      const text = node.children
        .filter((child) => child.type === "text")
        .map((child) => child.value || "")
        .join("");

      if (text) {
        toc.push({
          text,
          id: slugger.slug(text),
          level: node.depth,
        });
      }
    }
  });

  return toc;
}

export function slugify(text: string): string {
  const slugger = new GithubSlugger();
  return slugger.slug(text);
}
