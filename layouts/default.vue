<template>
  <div class="main-background">
    <Header v-model="openMenu" />
    <main v-if="!openMenu" class="relative">
      <slot />
      <Contact />
    </main>
    <Footer v-if="!openMenu" />
  </div>
</template>

<script setup lang="ts">
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Contact from "../components/Contact.vue";

const openMenu = ref(false);
</script>

<style scoped>
.main-background {
  background-color: #eeedeb;
}
</style>
