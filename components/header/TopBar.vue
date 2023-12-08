<template>
    <header
        :class="{
            'bg-website-green': openMenu,
            'h-dvh': openMenu,
            'overflow-hidden': openMenu,
        }"
    >
        <nav class="flex items-center" aria-label="Global">
            <NuxtLink
                to="/"
                @click="
                    () => {
                        openMenu = false;
                    }
                "
            >
                <span class="sr-only">Wild Grace Videography</span>
                <img
                    class="text-0 mb-8 ml-8 mr-10 mt-3"
                    width="138"
                    height="90"
                    src="/logo1.webp"
                    :alt="imageAlt"
                />
            </NuxtLink>
            <PopoverGroup class="hidden lg:flex lg:gap-x-12">
                <component
                    :is="item.type"
                    v-for="item in items"
                    :key="item.name"
                    :config="item"
                />
            </PopoverGroup>
            <NuxtLink
                class="text-md px-auto ml-auto mr-8 hidden h-12 w-32 cursor-pointer items-center rounded-xl border-2 border-website-green bg-website-green text-center text-website-off-white hover:bg-website-off-white hover:text-website-green lg:flex"
                to="/get-started"
            >
                <p class="mx-auto">Get Started</p>
            </NuxtLink>
            <HeaderMobileMenuToggle v-model="openMenu" />
        </nav>
        <HeaderMobileMenu v-model="openMenu" :items="items" />
    </header>
</template>

<script setup lang="ts">
    import { PopoverGroup } from '@headlessui/vue';
    import {
        DevicePhoneMobileIcon,
        VideoCameraIcon,
    } from '@heroicons/vue/24/outline';
    import type {
        FunctionalComponent,
        HTMLAttributes,
        VNodeProps,
    } from 'nuxt/dist/app/compat/capi';
    import HeaderItemDropdown from '~/components/header/HeaderItemDropdown.vue';
    import HeaderItem from '~/components/header/HeaderItem.vue';

    const imageAlt = 'Wild Grace Videography company logo.';

    export interface HeaderItemConfig {
        name: string;
        href?: string;
        type: unknown;
        children?: {
            name: string;
            description: string;
            href: string;
            icon: FunctionalComponent<HTMLAttributes & VNodeProps>;
        }[];
    }

    const items: HeaderItemConfig[] = [
        {
            name: 'Portfolio',
            href: '/portfolio',
            type: HeaderItem,
        },
        {
            name: 'Who We Are',
            href: '/who-we-are',
            type: HeaderItem,
        },
        {
            name: 'Services',
            type: HeaderItemDropdown,
            children: [
                {
                    name: 'Social Media Video Packages',
                    description: 'Transform your online presence',
                    href: '/video-content-that-converts',
                    icon: VideoCameraIcon,
                },
                {
                    name: 'Social Media Management Packages',
                    href: '/social-media-packages',
                    description: 'Managing your online presence',
                    icon: DevicePhoneMobileIcon,
                },
            ],
        },
        {
            name: 'Shop',
            href: '/shop',
            type: HeaderItem,
        },
    ];

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
</script>
