<template>
    <div class="flex flex-col bg-website-off-white lg:flex-row">
        <AdminSidebar v-model="openMenu" />
        <main v-if="!openMenu" class="relative h-full w-full">
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">
    const openMenu = ref(false);
</script>
