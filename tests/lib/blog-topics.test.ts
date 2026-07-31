import { describe, expect, it } from "vitest";
import { getFilterableBlogTags } from "@/lib/blog-topics";

describe("getFilterableBlogTags", () => {
  it("only exposes topics that help readers narrow more than one article", () => {
    const tags = ["AI Design", "UX Research", "Accessibility"];
    const posts = [
      { tags: ["AI Design", "UX Research"] },
      { tags: ["AI Design"] },
      { tags: ["Accessibility"] },
    ];

    expect(getFilterableBlogTags(posts, tags)).toEqual(["AI Design"]);
  });

  it("removes the filter entirely when every topic maps to one article", () => {
    const tags = ["AI Design", "UX Research", "Accessibility"];
    const posts = [
      { tags: ["AI Design"] },
      { tags: ["UX Research"] },
      { tags: ["Accessibility"] },
    ];

    expect(getFilterableBlogTags(posts, tags)).toEqual([]);
  });

  it("hides a topic shared by every article because it cannot narrow the list", () => {
    const tags = ["Design"];
    const posts = [{ tags: ["Design"] }, { tags: ["Design"] }];

    expect(getFilterableBlogTags(posts, tags)).toEqual([]);
  });
});
