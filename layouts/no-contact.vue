<template>
    <div class="flex min-h-screen flex-col bg-website-off-white">
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
