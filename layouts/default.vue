<template>
    <div class="overflow-x-hidden bg-website-background">
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
