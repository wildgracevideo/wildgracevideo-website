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
    import '~/assets/css/main.css';
    const openMenu = ref(false);
</script>
