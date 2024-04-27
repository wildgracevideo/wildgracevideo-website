<template>
    <div class="flex flex-col bg-website-off-white lg:flex-row">
        <AdminSidebar v-model="openMenu" />
        <main v-if="!openMenu" class="relative h-full w-full">
            <slot />
        </main>
    </div>

    <UNotifications />
</template>

<script setup lang="ts">
    import { provideUseId } from '@headlessui/vue';

    const openMenu = ref(false);

    provideUseId(() => useId());
</script>
