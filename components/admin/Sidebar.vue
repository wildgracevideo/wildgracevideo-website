<template>
    <header
        class="hidden min-h-dvh w-60 bg-website-primary text-website-off-white lg:block"
    >
        <span class="sr-only">Wild Grace Videography</span>
        <NuxtLink to="/admin">
            <img
                class="text-0 mb-8 ml-4 mr-10 mt-4"
                width="69"
                height="45"
                src="/logo1.webp"
                :alt="imageAlt"
            />
        </NuxtLink>
        <NuxtLink
            v-for="element in elements"
            :key="element.title"
            :to="element.to"
            class="mb-4 ml-4 flex items-center"
        >
            <component :is="element.icon" class="h-5 w-5" />
            <p class="ml-1 text-lg">{{ element.title }}</p>
        </NuxtLink>
    </header>
    <header class="flex h-16 w-full justify-between bg-website-primary lg:hidden">
        <span class="sr-only">Wild Grace Videography</span>
        <NuxtLink to="/admin">
            <img
                class="text-0 my-2 mb-8 ml-4 mr-10"
                width="69"
                height="45"
                src="/logo1.webp"
                :alt="imageAlt"
            />
        </NuxtLink>
        <div class="mt-4">
            <HeaderMobileMenuToggle v-model="openMenu" />
        </div>
    </header>
    <section v-if="openMenu" class="header-full-height bg-website-primary">
        <NuxtLink
            v-for="element in elements"
            :key="element.title"
            :to="element.to"
            class="mx-auto mb-4 mt-8 flex w-fit items-center text-center text-white"
            @click="openMenu = !openMenu"
        >
            <component :is="element.icon" class="h-8 w-8" />
            <p class="ml-4 text-4xl">{{ element.title }}</p>
        </NuxtLink>
    </section>
</template>

<script setup lang="ts">
    import { CreditCardIcon, InboxIcon } from '@heroicons/vue/24/outline';

    const props = defineProps<{
        modelValue: boolean;
    }>();

    const emit = defineEmits(['update:modelValue']);

    const openMenu = computed({
        get() {
            return props.modelValue;
        },
        set(value) {
            emit('update:modelValue', value);
        },
    });

    const imageAlt = 'Wild Grace Videography company logo.';
    const elements = [
        {
            icon: InboxIcon,
            title: 'Messages',
            to: '/admin/messages',
        },
        {
            icon: CreditCardIcon,
            title: 'Purchases',
            to: '/admin/purchases',
        },
    ];
</script>

<style scoped>
    .header-full-height {
        min-height: calc(100dvh - 64px);
    }
</style>
