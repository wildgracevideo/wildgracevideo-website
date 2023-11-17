<template>
  <NuxtLink :to="config.href" class="text-md">{{ config.name }}</NuxtLink>
</template>

<script setup lang="ts">
import { type HeaderItemConfig } from "./Header.vue";

defineProps<{
  config: HeaderItemConfig;
}>();
</script>
