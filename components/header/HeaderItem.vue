<template>
    <NuxtLink :to="config.href" class="text-md">{{ config.name }}</NuxtLink>
</template>

<script setup lang="ts">
    import { type HeaderItemConfig } from './TopBar.vue';

    defineProps<{
        config: HeaderItemConfig;
    }>();
</script>
