<template>
  <div class="main-background">
    <Header />
    <main class="relative">
      <slot />
      <Contact />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Contact from "../components/Contact.vue";
</script>

<style>
.main-background {
  background-color: #fffbf5;
}
</style>
