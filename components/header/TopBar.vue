<template>
    <header
        class="subheading-font"
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
                    class="text-0 my-4 ml-8 mr-10"
                    width="140"
                    height="90"
                    :src="runtimeConfig.public.websiteIcon"
                    :alt="imageAlt"
                />
            </NuxtLink>
            <div class="ml-auto hidden lg:flex lg:gap-x-12">
                <component
                    :is="item.type"
                    v-for="item in items"
                    :key="item.name"
                    :config="item"
                />
            </div>
            <NuxtLink
                class="px-auto ml-16 mr-8 hidden h-12 w-32 cursor-pointer items-center rounded-xl border-2 border-website-primary bg-website-primary text-center text-website-off-white hover:bg-website-off-white hover:text-website-primary lg:flex"
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
    import HeaderItemDropdown from '~/components/header/HeaderItemDropdown.vue';
    import HeaderItem from '~/components/header/HeaderItem.vue';

    const ctaText = 'CONTACT';

    const runtimeConfig = useRuntimeConfig();

    const servicesChildren = [
        {
            name: 'OUTDOOR PRODUCTS',
            href: `/service-overview/outdoor-product`,
        },
        {
            name: 'BOUTIQUE HOTELS',
            href: `/service-overview/hotels`,
        },
        {
            name: 'ADVENTURE TOURS',
            href: `/service-overview/adventure-tour`,
        },
    ];

    const imageAlt = 'Wild Grace Videography company logo.';

    export interface HeaderItemConfig {
        name: string;
        href?: string;
        type: unknown;
        children?: {
            name: string;
            href: string;
        }[];
    }

    const items: HeaderItemConfig[] = [
        {
            name: 'PORTFOLIO',
            href: '/portfolio',
            type: HeaderItem,
        },
        {
            name: 'ABOUT',
            href: '/about',
            type: HeaderItem,
        },
        {
            name: 'SERVICES',
            type: HeaderItemDropdown,
            children: servicesChildren,
        },
        {
            name: 'SHOP',
            type: HeaderItem,
            href: '/shop',
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
