type TaggablePost = {
  tags: readonly string[];
};

/**
 * A filter is only useful when it narrows a reader's choice across multiple
 * articles. Sparse, one-post topics remain visible on each article instead.
 */
export function getFilterableBlogTags<T extends TaggablePost>(
  posts: readonly T[],
  tags: readonly string[]
) {
  const counts = new Map<string, number>();

  for (const post of posts) {
    post.tags.forEach((tag, index) => {
      if (post.tags.indexOf(tag) !== index) return;
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    });
  }

  return tags.filter((tag) => {
    const count = counts.get(tag) ?? 0;
    return count > 1 && count < posts.length;
  });
}
