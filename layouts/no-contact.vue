<template>
  <div class="bg-website-off-white min-h-screen flex flex-col">
    <Header v-model="openMenu" />
    <main class="relative mb-auto" v-if="!openMenu">
      <slot />
    </main>
    <Footer v-if="!openMenu" />
  </div>
</template>

<script setup lang="ts">
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

const openMenu = ref(false);
</script>
