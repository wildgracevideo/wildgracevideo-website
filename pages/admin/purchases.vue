<template>
  <p class="text-2xl mt-8 ml-8">Purchases</p>
</template>

<script setup lang="ts">
definePageMeta({ middleware: "auth", layout: "admin" });
useHead({
  title: "WGV Admin | Purchases",
});
</script>
