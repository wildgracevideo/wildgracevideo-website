<template>
  <div class="bg-website-off-white">
    <main class="relative" v-if="!openMenu">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from "../components/Footer.vue";

const openMenu = ref(false);
</script>
