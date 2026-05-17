import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Locale = "pt" | "en";

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  draft?: boolean;
  translation_slug?: string;
};

export type Post = PostFrontmatter & {
  slug: string;
  locale: Locale;
  content: string;
};

function postsDir(locale: Locale): string {
  return locale === "pt"
    ? path.join(process.cwd(), "content", "posts")
    : path.join(process.cwd(), "content", "posts", locale);
}

function readPostFile(locale: Locale, filename: string): Post {
  const slug = filename.replace(/\.mdx?$/, "");
  const fullPath = path.join(postsDir(locale), filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    locale,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
    draft: Boolean(data.draft ?? false),
    translation_slug: data.translation_slug
      ? String(data.translation_slug)
      : undefined,
    content,
  };
}

export function getAllPosts(locale: Locale = "pt"): Post[] {
  const dir = postsDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.mdx?$/.test(entry.name))
    .map((entry) => readPostFile(locale, entry.name))
    .filter((post) => !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(locale: Locale, slug: string): Post | null {
  const candidates = [`${slug}.mdx`, `${slug}.md`];
  for (const filename of candidates) {
    const fullPath = path.join(postsDir(locale), filename);
    if (fs.existsSync(fullPath)) return readPostFile(locale, filename);
  }
  return null;
}

export const POSTS_PER_PAGE = 10;

export type PostsPage = {
  posts: Post[];
  page: number;
  totalPages: number;
};

export function paginatePosts(posts: Post[], page: number): PostsPage {
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * POSTS_PER_PAGE;
  return {
    posts: posts.slice(start, start + POSTS_PER_PAGE),
    page: safePage,
    totalPages,
  };
}

export function totalPages(locale: Locale): number {
  return Math.max(1, Math.ceil(getAllPosts(locale).length / POSTS_PER_PAGE));
}
