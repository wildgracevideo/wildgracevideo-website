<template>
  <div class="bg-website-off-white min-h-screen">
    <main class="relative" v-if="!openMenu">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const openMenu = ref(false);
</script>
