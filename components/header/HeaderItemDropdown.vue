<template>
    <div class="group relative cursor-pointer">
        <div class="flex items-center justify-between gap-x-1">
            {{ config.name }}
            <ChevronDownIcon
                class="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
            />
        </div>
        <div
            class="bg-website-off-white invisible absolute z-50 flex w-[300%] flex-col shadow-xl group-hover:visible"
        >
            <NuxtLink
                v-for="item in config.children"
                :key="item.name"
                :to="item.href"
                class="text-website-off-black hover:bg-website-primary hover:text-website-off-white p-4 text-sm"
            >
                {{ item.name }}
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ChevronDownIcon } from '@heroicons/vue/20/solid';
    import { type HeaderItemConfig } from './TopBar.vue';

    defineProps<{
        config: HeaderItemConfig;
    }>();
</script>
