<template>
    <header
        :class="{
            'bg-website-primary': openMenu,
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
                <NuxtImg
                    class="text-0 mb-8 ml-8 mr-10 mt-3"
                    width="160"
                    height="90"
                    :src="runtimeConfig.public.websiteIcon"
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
                class="text-md px-auto ml-auto mr-8 hidden h-12 w-32 cursor-pointer items-center rounded-xl border-2 border-website-primary bg-website-primary text-center text-website-off-white hover:bg-website-off-white hover:text-website-primary lg:flex"
                to="/get-started"
            >
                <p class="mx-auto">{{ ctaText }}</p>
            </NuxtLink>
            <HeaderMobileMenuToggle v-model="openMenu" />
        </nav>
        <HeaderMobileMenu
            v-model="openMenu"
            :items="items"
            :cta-text="ctaText"
        />
    </header>
</template>

<script setup lang="ts">
    import { PopoverGroup } from '@headlessui/vue';
    import * as heroIcons from '@heroicons/vue/24/outline';
    import type {
        FunctionalComponent,
        HTMLAttributes,
        VNodeProps,
    } from 'nuxt/dist/app/compat/capi';
    import type { ParsedContent } from '@nuxt/content/dist/runtime/types';
    import HeaderItemDropdown from '~/components/header/HeaderItemDropdown.vue';
    import HeaderItem from '~/components/header/HeaderItem.vue';

    const ctaText = 'Contact';

    const runtimeConfig = useRuntimeConfig();

    const kebabToCamelCase = (str: string) => {
        let outputStr = '';
        for (let i = 0; i < str.length; i++) {
            if (i === 0) {
                outputStr += str[i].toUpperCase();
            } else if (str[i] === '-') {
                outputStr += `${str[i + 1].toUpperCase()}`;
                i++;
            } else {
                outputStr += str[i].toLowerCase();
            }
        }
        return outputStr;
    };

    const { data } = await useAsyncData('all-services', () =>
        queryContent('/service').find()
    );
    const servicesChildren = data!.value!.map((it: ParsedContent) => {
        // @ts-expect-error https://github.com/tailwindlabs/heroicons/issues/278#issuecomment-868966794
        // eslint-disable-next-line import/namespace
        const icon = heroIcons[`${kebabToCamelCase(it.menuIcon)}Icon`];
        return {
            icon,
            name: it.menuTitle,
            description: it.menuDescription,
            href: `/services/${it.path}`,
        };
    });

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
            name: 'Behind the Scenes',
            href: '/behind-the-scenes',
            type: HeaderItem,
        },
        {
            name: 'Services',
            type: HeaderItemDropdown,
            children: servicesChildren,
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
