import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const SITE_NAME = "物流とAI開発のメモ";
const SITE_DESC =
  "Markdownで書いた記事を静的に生成するブログのサンプルです。記事はすべてサンプル(架空の内容)です。";

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESC,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESC,
    type: "website",
    locale: "ja_JP",
  },
  twitter: { card: "summary", title: SITE_NAME, description: SITE_DESC },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        <header className="border-b border-line">
          <div className="mx-auto max-w-3xl px-4 py-4">
            <Link href="/" className="inline-flex min-h-11 items-center gap-2 font-bold text-foreground no-underline">
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
              {SITE_NAME}
            </Link>
          </div>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">{children}</main>
        <footer className="border-t border-line">
          <div className="mx-auto max-w-3xl px-4 py-6 text-sm text-muted">
            <p>記事はすべてサンプルです(架空の内容。実在の会社・数字は出てきません)。</p>
            <p>Next.js + gray-matter + remark + Tailwind CSS で作った、課題用のサンプルサイトです。</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
