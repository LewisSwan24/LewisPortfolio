#!/usr/bin/env node

import matter from "gray-matter";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { join, relative } from "node:path";
import { cwd, exit } from "node:process";

const blogRequiredFields = ["title", "date", "excerpt", "tags", "author", "published"];
const projectRequiredFields = [
  "slug",
  "title",
  "oneLiner",
  "role",
  "timeframe",
  "tools",
  "tags",
  "featured",
  "status",
  "cover",
  "date",
];

function parseArgs(argv) {
  const [command, ...rest] = argv;
  const positional = [];
  const options = { root: cwd() };

  for (let index = 0; index < rest.length; index += 1) {
    const value = rest[index];

    if (!value.startsWith("--")) {
      positional.push(value);
      continue;
    }

    const key = value.slice(2);
    const next = rest[index + 1];

    if (!next || next.startsWith("--")) {
      options[key] = true;
      continue;
    }

    options[key] = next;
    index += 1;
  }

  return { command, positional, options };
}

function slugify(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function escapeYamlString(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function asList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (!value) return [];

  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function isIsoDate(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return true;
  }

  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function listMdxFiles(root, directory) {
  const absoluteDirectory = join(root, directory);

  if (!existsSync(absoluteDirectory)) return [];

  return readdirSync(absoluteDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .sort()
    .map((file) => join(absoluteDirectory, file));
}

function formatPath(root, filePath) {
  return relative(root, filePath).replace(/\\/g, "/");
}

function readMdx(filePath) {
  return matter(readFileSync(filePath, "utf8"));
}

function addError(errors, root, filePath, message) {
  errors.push(`${formatPath(root, filePath)}: ${message}`);
}

function validateStringField(data, field, errors, root, filePath) {
  if (typeof data[field] !== "string" || !data[field].trim()) {
    addError(errors, root, filePath, `missing or empty ${field}`);
  }
}

function validateArrayField(data, field, errors, root, filePath) {
  if (!Array.isArray(data[field]) || data[field].length === 0) {
    addError(errors, root, filePath, `missing or empty ${field}`);
    return;
  }

  if (data[field].some((item) => typeof item !== "string" || !item.trim())) {
    addError(errors, root, filePath, `${field} must contain non-empty strings`);
  }
}

function validateBooleanField(data, field, errors, root, filePath) {
  if (typeof data[field] !== "boolean") {
    addError(errors, root, filePath, `${field} must be true or false`);
  }
}

function validateDateField(data, field, errors, root, filePath) {
  const value = data[field];

  if (!isIsoDate(value)) {
    addError(errors, root, filePath, `${field} must use YYYY-MM-DD`);
  }
}

function validateBlog(root) {
  const errors = [];
  const seenSlugs = new Set();

  for (const filePath of listMdxFiles(root, "content/blog")) {
    const fileSlug = filePath.split(/[\\/]/).pop().replace(/\.mdx$/, "");
    const { data, content } = readMdx(filePath);

    for (const field of blogRequiredFields) {
      if (!(field in data)) {
        addError(errors, root, filePath, `missing ${field}`);
      }
    }

    validateStringField(data, "title", errors, root, filePath);
    validateStringField(data, "excerpt", errors, root, filePath);
    validateStringField(data, "author", errors, root, filePath);
    validateArrayField(data, "tags", errors, root, filePath);
    validateBooleanField(data, "published", errors, root, filePath);
    validateDateField(data, "date", errors, root, filePath);

    if (data.slug && data.slug !== fileSlug) {
      addError(errors, root, filePath, `slug must match filename (${fileSlug})`);
    }

    if (!/^([a-z0-9]+-)*[a-z0-9]+$/.test(fileSlug)) {
      addError(errors, root, filePath, "filename slug must be lowercase kebab-case");
    }

    const lowerSlug = fileSlug.toLowerCase();
    if (seenSlugs.has(lowerSlug)) {
      addError(errors, root, filePath, `duplicate blog slug ${fileSlug}`);
    }
    seenSlugs.add(lowerSlug);

    if (!/^##\s+/m.test(content)) {
      addError(errors, root, filePath, "content must include at least one level-2 heading");
    }
  }

  return errors;
}

function validateProjects(root) {
  const errors = [];

  for (const filePath of listMdxFiles(root, "content/projects")) {
    const fileSlug = filePath.split(/[\\/]/).pop().replace(/\.mdx$/, "");
    const { data, content } = readMdx(filePath);

    for (const field of projectRequiredFields) {
      if (!(field in data)) {
        addError(errors, root, filePath, `missing ${field}`);
      }
    }

    for (const field of ["slug", "title", "oneLiner", "role", "timeframe", "status", "cover"]) {
      validateStringField(data, field, errors, root, filePath);
    }

    validateArrayField(data, "tools", errors, root, filePath);
    validateArrayField(data, "tags", errors, root, filePath);
    validateBooleanField(data, "featured", errors, root, filePath);

    if (data.slug && data.slug !== fileSlug) {
      addError(errors, root, filePath, `slug must match filename (${fileSlug})`);
    }

    validateDateField(data, "date", errors, root, filePath);

    if (typeof data.cover === "string" && data.cover.startsWith("/")) {
      const coverPath = join(root, "public", data.cover.slice(1));
      if (!existsSync(coverPath)) {
        addError(errors, root, filePath, `cover file does not exist: ${data.cover}`);
      }
    }

    if (!/^##\s+/m.test(content)) {
      addError(errors, root, filePath, "content must include at least one level-2 heading");
    }
  }

  return errors;
}

function validateContent(root) {
  return [...validateBlog(root), ...validateProjects(root)];
}

function createBlogDraft(root, positional, options) {
  const title = positional.join(" ").trim();

  if (!title) {
    throw new Error('blog:new requires a title, for example: pnpm blog:new "My Post"');
  }

  const slug = options.slug ? slugify(options.slug) : slugify(title);

  if (!slug) {
    throw new Error("Could not derive a slug. Pass --slug my-post.");
  }

  const blogDirectory = join(root, "content", "blog");
  const filePath = join(blogDirectory, `${slug}.mdx`);

  if (existsSync(filePath)) {
    throw new Error(`Blog post already exists: ${formatPath(root, filePath)}`);
  }

  const tags = asList(options.tags);
  const date = options.date ? String(options.date) : todayIsoDate();
  const excerpt = options.excerpt
    ? String(options.excerpt)
    : "Draft excerpt. Replace this with a one-sentence summary before publishing.";
  const author = options.author ? String(options.author) : "Lewis Dong";
  const published = options.publish === true;

  mkdirSync(blogDirectory, { recursive: true });
  writeFileSync(
    filePath,
    [
      "---",
      `title: "${escapeYamlString(title)}"`,
      `date: "${escapeYamlString(date)}"`,
      `excerpt: "${escapeYamlString(excerpt)}"`,
      "tags:",
      ...(tags.length > 0 ? tags : ["Draft"]).map((tag) => `  - ${escapeYamlString(tag)}`),
      `author: "${escapeYamlString(author)}"`,
      `published: ${published ? "true" : "false"}`,
      "---",
      "",
      "## Draft notes",
      "",
      "Replace this section with the article body.",
      "",
    ].join("\n"),
    "utf8"
  );

  return `Created draft: ${formatPath(root, filePath)}`;
}

function publishBlog(root, positional) {
  const slug = slugify(positional[0] ?? "");

  if (!slug) {
    throw new Error("blog:publish requires a slug, for example: pnpm blog:publish my-post");
  }

  const filePath = join(root, "content", "blog", `${slug}.mdx`);

  if (!existsSync(filePath)) {
    throw new Error(`Blog post not found: content/blog/${slug}.mdx`);
  }

  const parsed = readMdx(filePath);
  parsed.data.published = true;

  writeFileSync(filePath, matter.stringify(parsed.content.trimStart(), parsed.data), "utf8");

  return `Published blog post: ${formatPath(root, filePath)}`;
}

function run() {
  const { command, positional, options } = parseArgs(process.argv.slice(2));
  const root = String(options.root ?? cwd());

  if (!command || command === "help" || command === "--help") {
    console.log(
      [
        "Content automation",
        "",
        "Commands:",
        '  blog:new "Title" --excerpt "Summary" --tags "UX,AI" [--date YYYY-MM-DD]',
        "  blog:publish slug",
        "  content:validate",
      ].join("\n")
    );
    return;
  }

  if (command === "blog:new") {
    console.log(createBlogDraft(root, positional, options));
    return;
  }

  if (command === "blog:publish") {
    console.log(publishBlog(root, positional));
    return;
  }

  if (command === "content:validate") {
    const errors = validateContent(root);

    if (errors.length > 0) {
      console.error("Content validation failed");
      for (const error of errors) {
        console.error(`- ${error}`);
      }
      exit(1);
    }

    console.log("Content validation passed");
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

try {
  run();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  exit(1);
}
