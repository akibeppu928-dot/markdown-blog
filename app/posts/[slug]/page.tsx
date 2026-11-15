import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getPost } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!getAllSlugs().includes(slug)) return {};
  const post = await getPost(slug);
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: "article", publishedTime: post.date },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  if (!getAllSlugs().includes(slug)) notFound();
  const post = await getPost(slug);

  return (
    <article>
      <Link href="/" className="inline-flex min-h-11 items-center gap-1 text-sm text-accent">
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        記事一覧へ
      </Link>
      <header className="mt-2">
        <time dateTime={post.date} className="text-sm text-muted">{post.date}</time>
        <h1 className="mt-1 text-2xl font-bold leading-snug sm:text-3xl">{post.title}</h1>
        <ul className="mt-3 flex flex-wrap gap-2 list-none p-0">
          {post.tags.map((t) => (
            <li key={t} className="rounded border border-line bg-white px-2 py-0.5 text-xs text-muted">{t}</li>
          ))}
        </ul>
      </header>

      {post.headings.length > 0 && (
        <nav aria-label="目次" className="mt-6 rounded-md border border-line bg-white p-4">
          <p className="text-sm font-bold">目次</p>
          <ol className="mt-2 list-none space-y-1 p-0 text-sm">
            {post.headings.map((h) => (
              <li key={h.id} className={h.depth === 3 ? "pl-4" : ""}>
                <a href={`#${h.id}`} className="inline-block min-h-6 text-accent">{h.text}</a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div
        className="article prose prose-neutral mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
}
