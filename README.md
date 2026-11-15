# Markdown ブログ(静的生成)

`posts/` フォルダの Markdown から、記事一覧と記事ページをビルド時に作るブログのサンプルです。
記事の内容はすべてサンプル(架空)で、実在の会社・数字は出てきません。

## できること
- `posts/*.md` を読み込んで、一覧(`/`)と詳細(`/posts/[slug]`)を生成
- frontmatter(title / date / tags / description)をパースして、カードと見出しに表示
- コードブロックのシンタックスハイライト(highlight.js)
- 見出しから目次を自動生成(h2・h3)

## 構成
- Next.js 15(App Router)/ TypeScript / Tailwind CSS 4
- gray-matter / unified(remark・rehype)

## 使い方
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # 静的に書き出し
```

記事を足すときは、`posts/` に Markdown を1つ置いて、先頭に次を書きます。

```yaml
---
title: 記事のタイトル
date: 2026-11-15
tags: [タグ1, タグ2]
description: 一覧に出す短い説明
---
```
