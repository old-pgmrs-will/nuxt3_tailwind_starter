<template>
  <div class="contents">
    <!-- クラス値 "contents" は assets/css/tailwind.css で @apply している -->
    <div class="container" v-bind:class="containerClass">
      <h1 class="text-white font-bold text-4xl text-center">index.vue</h1>
      <h2 class="text-white font-bold text-2xl text-center mt-8">Hello, Nuxt3 + Tailwind CSS :)</h2>
      <p class="mt-4 text-slate-300 text-xl text-center">Message: {{ message }}</p>

      <div class="nav-link mt-8">
        <!-- nav類はページ個別に実装せず、layoutを使ったほうが良い -->
        <NuxtLink to="/about" class="text-center">
          <p class="text-blue-900 underline">link to: pages/about.vue</p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const message: string = "Let's try edit ./pages/index.vue !";
  const containerClass: string = "page-index";
</script>
