<template>
    <UApp :toaster="{ position: 'top-right' }">
        <div
            class="paragraph-font font-size-base! bg-website-background flex flex-col font-normal! lg:flex-row"
        >
            <AdminSidebar v-model="openMenu" />
            <main v-if="!openMenu" class="relative h-full w-full">
                <slot />
            </main>
        </div>
    </UApp>
</template>

<script setup lang="ts">
    const openMenu = ref(false);
</script>

<style>
    @import '~/assets/css/main.css';
    @import '~/assets/css/admin.css';
</style>
