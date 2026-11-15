---
title: このブログの仕組み(Markdownから静的ページを作る)
date: 2026-11-15
tags: [Next.js, Markdown, 静的生成]
description: postsフォルダのMarkdownを読み込み、一覧と記事ページをビルド時に作る流れを説明します。
---

このサイトは、`posts` フォルダに置いたMarkdownファイルから、ビルド時に一覧と記事ページを作っています。サーバーで毎回処理するのではなく、公開前に全ページのHTMLを作っておく方式(静的生成)です。

## 全体の流れ

1. `posts/*.md` を読み込む
2. 先頭の設定(frontmatter)から、タイトル・日付・タグを取り出す
3. 本文をHTMLに変換し、見出しに目印(id)を付ける
4. 一覧ページと `/posts/[slug]` のページを作る

### frontmatterの書き方

記事の先頭に、次のように書きます。

```yaml
---
title: 記事のタイトル
date: 2026-11-15
tags: [Next.js, Markdown]
description: 一覧に出す短い説明
---
```

### 読み込みのコード

`gray-matter` で設定と本文を分けています。

```ts
import fs from "node:fs";
import matter from "gray-matter";

const raw = fs.readFileSync("posts/example.md", "utf8");
const { data, content } = matter(raw);
console.log(data.title, content.length);
```

## ページを作る関数

記事のURLは、ファイル名(拡張子なし)をそのまま使います。ビルド時に `generateStaticParams` が一覧のファイル名を返すと、その数だけページが作られます。

```ts
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}
```

## まとめ

- 記事を増やすときは、Markdownを1つ足すだけです
- 変換はビルド時に終わるので、公開後の表示は軽くなります
