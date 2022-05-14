<template>
  <article class="contents" id="page_root">
    <!-- templateタグ内は1つの親要素で括る。（直下に複数要素を書くとエラーになる） -->
    <!-- クラス値 "contents" は assets/css/tailwind.css で @apply している -->
    <div class="container" v-bind:class="containerClass">
      <h1 class="text-white font-bold text-4xl text-center">about.vue</h1>
      <h2 class="text-white font-bold text-2xl text-center mt-8">Hello, Nuxt3 + Tailwind CSS :)</h2>
      <p class="mt-4 text-slate-300 text-xl text-center">Message: {{ message }}</p>
      <div class="nav-link mt-8">
        <NuxtLink to="/" class="text-center">
          <p class="text-blue-900 underline">link to: pages/index.vue</p>
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
  const containerClass: string = "page-about";
  const message: string = "Let's try edit ./pages/about.vue !";
  console.info("this page is 'pages/about.vue'.");
</script>
