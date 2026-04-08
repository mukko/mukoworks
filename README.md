# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## OGP画像

各ページのSNSシェア時に表示されるOGP画像は `public/ogp/` に配置します。

### 配置場所

```
public/ogp/
├── bitflip.png
├── eight.png
└── (新しいプロダクト名).png
```

### 推奨仕様

| 項目 | 値 |
| :--- | :--- |
| サイズ | 1200 x 630 px |
| フォーマット | PNG または JPEG |
| ファイルサイズ | 300KB以下を推奨 |

### 新しいページへの適用方法

各ページの `<Layout>` コンポーネントに `ogImage` propsを渡します。パスは `base`（`/mukoworks`）を含めた絶対パスで指定してください。

```astro
<Layout
  title="ページタイトル | mukoworks"
  description="ページの説明文"
  ogImage="/mukoworks/ogp/xxx.png"
>
```

## Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
