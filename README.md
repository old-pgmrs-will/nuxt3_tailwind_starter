# Nuxt3 RC + Tailwind CSS

## これはなに

Nuxt3 RC + Tailwind CSS + TypeScript が使えるもっともシンプルな環境を構築するものです。  
`pages/index.vue` と `pages/about.vue` の間に張られたリンクを行き来するだけのシンプルな構成となっています。  

<img src="https://user-images.githubusercontent.com/102408514/167263575-5ac15cee-8780-478e-9ae9-49252638ba36.jpg" width="50%"/>

- 公式情報
  - [Nuxt 3 Quick Start](https://v3.nuxtjs.org/getting-started/quick-start/)
  - [Get started with Tailwind CSS](https://tailwindcss.com/docs/installation)

- 動作環境
  - node.js `v16.14.2`
  - yarn `v1.22.18`
  - npm `v8.5.0`

## セットアップ

- gitリポジトリから取得

```bash
git clone https://github.com/old-pgmrs-will/nuxt3_tailwind_starter
cd nuxt3_tailwind_starter
```

- モジュール・インストール

```bash
# yarn
yarn install

# npm
npm install
```

- 開発用サーバ起動

```bash
# yarn
yarn dev -o

# npm
npm run dev
```

稼働環境: http://localhost:3000

（yarn の場合は '-o' オプションでブラウザが自動起動します）

- プロダクション・ビルド

```bash
yarn build
```

- プロダクション・ビルドのローカルプレビュー

```bash
yarn preview
```

- デプロイに関する情報
  - https://v3.nuxtjs.org/guide/deploy/node-server
  - https://v3.nuxtjs.org/guide/deploy/static-hosting
  - https://v3.nuxtjs.org/guide/deploy/presets

---

## 手動環境構築

ゼロからこの環境を構築する手順です。

### Nuxt3 RC

まずは公式ドキュメントを参考にセットアップ

```bash
npx nuxi init nuxt3_tailwind_starter
```

インストールdirに入る

```bash
cd nuxt3_tailwind_starter
```

依存パッケージ類をインストール

```bash
yarn install
```

`warning` は、いったん無視。
これで yarn devを使ってベースとなるnuxtアプリを開発モードで起動できるようになる。

```bash
yarn dev -o
```

オプション `-o` を付けると
http://localhost:3000/
が自動で開いて Nuxt3 の welcome ページが表示される。

consoleに
`<Suspense> is an experimental feature and its API will likely change.`  
が出るが気にしない。  
（セットアップ直後でもあり、Nuxt3がまだRCだからかも）


### Tailwind CSS

`tailwindcss@3` を devDependencies に追加する。

Tailwind は PostCSS と AutoPrefixer も必要だが、Nuxt3 では既に内部で使われているので明示的な追加は不要。

```bash
yarn add --dev tailwindcss@3
```

`tailwind.config.js` をプロジェクトに追加する。

```bash
npx tailwindcss init
```
作成直後の `tailwind.config.js` の内容
```javascript
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

`tailwind.config.js` を更新する。

```javascript
module.exports = {
  content: [
    './assets/**/*.{vue,js,css}',
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    // './nuxt.config.{js,ts}', <= いったんコメントアウトでOK
    // './app.vue' <= いったんコメントアウトでOK
  ],
  variants: {
    extend: {},
  },
  plugins: [],
};
```

`assets/css/tailwind.css` を作成する。

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### stylelint
`stylelint` を入れてない場合は入れておく。
VScodeの拡張機能マーケットプレイスで `@id:stylelint.vscode-stylelint` を検索してインストール。
stylelint の設定ファイル `stylelint.config.js` をプロジェクトに追加する。

```javascript
module.exports = {
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
        ],
      },
    ],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
  },
};
```

stylelint の推奨設定を追加する。

```bash
% yarn add --dev stylelint-config-recommended
```

`stylelint.config.js` に下記を追加。

```javascript
module.exports = {
  extends: ['stylelint-config-recommended']
  rules: {
    ...
  }
}
```

VSCodeの設定から `CSS: Validate` を無効にする。

```
CSS: Validate
[✓] すべての検証を有効または無効にします。
```

のチェックを外す。
PostCSSを使ってSCSS(SASS)を使うので、CSSバリデーションは stylelint に任せる。


### Tailwind CSS IntelliSense

拡張機能 `Tailwind CSS IntelliSense` を入れておく
Tailwindを使うなら、VScodeの拡張機能マーケットプレイスで `@id:bradlc.vscode-tailwindcss` を検索してインストール。

---

## その他

`nuxt.config.ts` の更新

```typescript
import { defineNuxtConfig,  } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // Nuxt v3.0.0-rc.2 では、まだ target:'static' が動作しない
  ssr: true,
  target: 'server',
  // TypeScript の Strict type checks を有効に
  typescript: {
    strict: true
  },
  // 作成した tailwind.css をグローバルCSSとしてNuxt3に読み込ませる
  css: ["@/assets/css/tailwind.css"],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          // PostCSSプラグインとしてtailwindcssを使う。 postcss.config.js は使わない
          'tailwindcss': {},
        }
      }
    }
  }
})
```

consoleに "ファイル 'YOUR_WORKSPACE_FOLDER/.nuxt/tsconfig.json' を読み取れません。" と出る場合

```bash
npx nuxi prepare
```

を実行すると `.nuxt/` が生成される。
