<template>
  <div class="main-background">
    <Header v-model="openMenu" />
    <main class="relative" v-if="!openMenu">
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

<style scoped>
.main-background {
  background-color: #eeedeb;
}
</style>
