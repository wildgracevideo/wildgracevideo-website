<template>
    <header
        class="bg-website-secondary text-website-off-black hidden min-h-dvh w-60 lg:block"
    >
        <span class="sr-only">Wild Grace Videography</span>
        <NuxtLink to="/admin">
            <NuxtImg
                class="text-0 mt-4 mr-10 mb-8 ml-4"
                width="140"
                height="90"
                :src="runtimeConfig.public.websiteIcon"
                :alt="imageAlt"
            />
        </NuxtLink>
        <NuxtLink
            v-for="element in elements"
            :key="element.title"
            :to="element.to"
            class="text-website-off-black! mx-4 mb-4 flex items-center"
        >
            <component :is="element.icon" class="h-5 w-5" />
            <p class="ml-1 text-lg">{{ element.title }}</p>
        </NuxtLink>
    </header>
    <header
        class="bg-website-secondary text-website-off-white flex h-16 w-full justify-between lg:hidden"
    >
        <span class="sr-only">Wild Grace Videography</span>
        <NuxtLink to="/admin">
            <NuxtImg
                class="text-0 my-2 mr-10 mb-8 ml-4"
                width="140"
                height="90"
                :src="runtimeConfig.public.websiteIcon"
                :alt="imageAlt"
            />
        </NuxtLink>
        <div class="mt-4">
            <HeaderMobileMenuToggle v-model="openMenu" />
        </div>
    </header>
    <section
        v-if="openMenu"
        class="header-full-height bg-website-secondary text-website-off-white"
    >
        <NuxtLink
            v-for="element in elements"
            :key="element.title"
            :to="element.to"
            class="text-website-off-white mx-auto mt-8 mb-4 flex w-fit items-center text-center"
            @click="openMenu = !openMenu"
        >
            <component :is="element.icon" class="h-8 w-8" />
            <p class="ml-4 text-4xl">{{ element.title }}</p>
        </NuxtLink>
    </section>
</template>

<script setup lang="ts">
    import {
        BeakerIcon,
        CreditCardIcon,
        CurrencyDollarIcon,
        FolderIcon,
        InboxIcon,
    } from '@heroicons/vue/24/outline';

    const runtimeConfig = useRuntimeConfig();

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
        {
            icon: CurrencyDollarIcon,
            title: 'Freebies',
            to: '/admin/freebies',
        },
        {
            icon: FolderIcon,
            title: 'Media',
            to: '/admin/media',
        },
        {
            icon: BeakerIcon,
            title: 'CMS',
            to: '/admin/cms',
        },
    ];
</script>

<style scoped>
    .header-full-height {
        min-height: calc(100dvh - 64px);
    }
</style>
