import { describe, expect, it } from "vitest";
import { extractTOC } from "@/lib/toc";

describe("extractTOC", () => {
  it("keeps inlineCode text inside headings so TOC hashes match rendered DOM ids", () => {
    const markdown = [
      "## 斩断 `/projects` 列表页的客户端传染链路",
      "",
      "### Keep `useState` and **nested** *formatting*",
      "",
      "## 斩断 `/projects` 列表页的客户端传染链路",
    ].join("\n");

    const toc = extractTOC(markdown);

    expect(toc).toEqual([
      {
        text: "斩断 /projects 列表页的客户端传染链路",
        id: "斩断-projects-列表页的客户端传染链路",
        level: 2,
      },
      {
        text: "Keep useState and nested formatting",
        id: "keep-usestate-and-nested-formatting",
        level: 3,
      },
      {
        text: "斩断 /projects 列表页的客户端传染链路",
        id: "斩断-projects-列表页的客户端传染链路-1",
        level: 2,
      },
    ]);
  });
});
