<template>
    <div
        class="paragraph-font !font-size-base flex flex-col bg-website-background !font-normal lg:flex-row"
    >
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
