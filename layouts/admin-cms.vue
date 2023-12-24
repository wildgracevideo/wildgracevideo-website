<template>
    <div class="bg-website-white h-0">
        <!-- TODO -->
        <!-- <HeaderTopBar v-model="openMenu" /> -->
        <main v-if="!openMenu" class="h-0">
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">
    const openMenu = ref(false);
</script>

<style>
    #__nuxt {
        height: 0;
    }
</style>
