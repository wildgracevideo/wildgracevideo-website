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
const openMenu = ref(false);
</script>
