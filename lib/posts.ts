import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import type { Root, Element } from "hast";

const POSTS_DIR = path.join(process.cwd(), "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
};

export type Heading = { id: string; text: string; depth: 2 | 3 };

export type Post = PostMeta & { html: string; headings: Heading[] };

function readMeta(file: string): { meta: PostMeta; content: string } {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  // gray-matter は YAML の日付(2026-11-10)を Date にするので、文字列に直す
  const date =
    data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : String(data.date ?? "");
  return {
    meta: {
      slug,
      title: String(data.title ?? slug),
      date,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      description: String(data.description ?? ""),
    },
    content,
  };
}

export function getAllPosts(): PostMeta[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readMeta(f).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export async function getPost(slug: string): Promise<Post> {
  const { meta, content } = readMeta(`${slug}.md`);
  const headings: Heading[] = [];

  const collectHeadings = () => (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if ((node.tagName === "h2" || node.tagName === "h3") && node.properties?.id) {
        headings.push({
          id: String(node.properties.id),
          text: toString(node),
          depth: node.tagName === "h2" ? 2 : 3,
        });
      }
    });
  };

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeHighlight, { detect: false })
    .use(collectHeadings)
    .use(rehypeStringify)
    .process(content);

  return { ...meta, html: String(file), headings };
}
