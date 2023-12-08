<template>
    <div class="bg-website-off-white">
        <HeaderTopBar v-model="openMenu" />
        <main v-if="!openMenu" class="relative">
            <slot />
            <Contact />
        </main>
        <Footer v-if="!openMenu" />
    </div>
</template>

<script setup lang="ts">
    const openMenu = ref(false);
</script>
