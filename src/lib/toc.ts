import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";

export interface TOCItem {
  text: string;
  id: string;
  level: number;
}

interface PhrasingNode {
  type: string;
  value?: string;
  children?: PhrasingNode[];
}

interface HeadingNode {
  type: "heading";
  depth: number;
  children: PhrasingNode[];
}

function extractNodeText(nodes: PhrasingNode[]): string {
  return nodes
    .map((node) => {
      if (node.type === "text" || node.type === "inlineCode") {
        return node.value || "";
      }
      if (Array.isArray(node.children)) {
        return extractNodeText(node.children);
      }
      return "";
    })
    .join("");
}

export function extractTOC(content: string): TOCItem[] {
  const slugger = new GithubSlugger();
  const toc: TOCItem[] = [];

  const tree = unified().use(remarkParse).parse(content);

  visit(tree, "heading", (node: HeadingNode) => {
    if (node.depth >= 2 && node.depth <= 3) {
      const text = extractNodeText(node.children);

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
