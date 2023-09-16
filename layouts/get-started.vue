<template>
  <div class="main-background">
    <Header />
    <main class="relative">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>

<style>
.main-background {
  background-color: #eeedeb;
}
</style>
