import { defineNuxtConfig,  } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // Nuxt v3.0.0-rc.2 では、まだ target:'static' は動作しない
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
