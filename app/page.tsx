import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();
  return (
    <>
      <h1 className="text-2xl font-bold leading-snug">記事一覧</h1>
      <p className="mt-2 text-muted">
        <span className="inline-block">Markdownのファイルから、</span>
        <span className="inline-block">一覧と記事ページを自動で作っています。</span>
      </p>
      <ul className="mt-8 grid gap-4 list-none p-0">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/posts/${p.slug}`}
              className="block rounded-md border border-line bg-white p-5 text-foreground no-underline transition-colors hover:border-accent focus-visible:border-accent"
            >
              <time dateTime={p.date} className="text-sm text-muted">{p.date}</time>
              <h2 className="mt-1 text-lg font-bold leading-snug">{p.title}</h2>
              <p className="mt-2 text-sm text-muted">{p.description}</p>
              <ul className="mt-3 flex flex-wrap gap-2 list-none p-0">
                {p.tags.map((t) => (
                  <li key={t} className="rounded border border-line bg-background px-2 py-0.5 text-xs text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
