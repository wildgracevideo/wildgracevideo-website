<template>
    <div class="bg-website-background flex min-h-screen flex-col">
        <HeaderTopBar v-model="openMenu" />
        <main v-if="!openMenu" class="relative mb-auto">
            <slot />
        </main>
        <Footer v-if="!openMenu" />
    </div>
</template>

<script setup lang="ts">
    const openMenu = ref(false);
</script>

<style>
    @import '@/assets/css/main.css';
</style>
