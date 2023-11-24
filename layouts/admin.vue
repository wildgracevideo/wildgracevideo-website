<template>
  <div class="bg-website-off-white flex flex-row">
    <AdminSidebar />
    <main class="relative w-full h-full" v-if="!openMenu">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const openMenu = ref(false);
</script>
