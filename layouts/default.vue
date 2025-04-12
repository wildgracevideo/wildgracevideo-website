<template>
    <div class="bg-website-background overflow-x-hidden">
        <HeaderTopBar v-model="openMenu" />
        <main v-if="!openMenu" class="relative min-h-dvh">
            <slot />
        </main>
        <Contact />
        <Footer />
    </div>
</template>

<script setup lang="ts">
    const openMenu = ref(false);
</script>

<style>
    @import '~/assets/css/main.css';
</style>
