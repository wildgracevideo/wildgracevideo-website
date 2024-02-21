<template>
    <div
        class="border-y-16 border-custom-green shadow-floating flex flex-col justify-between rounded-3xl border-l-8 border-r-8"
        :class="{ enlarge: enlarge }"
    >
        <div>
            <h3
                class="mx-auto mb-6 mt-4 w-fit text-center text-4xl font-semibold"
            >
                <span class="font-family-moontime mr-1">The</span
                ><span class="font-family-playfair-display">{{
                    config.title
                }}</span>
            </h3>
            <PackageBubble
                v-for="item in config.elements"
                :key="`${item}-package-item-bubble`"
                :config="item as PackageBubbleConfig"
            />
        </div>
        <div v-if="config.price">
            <p class="mb-2 mt-auto text-center">Starting at</p>
            <p class="mb-4 text-center text-2xl">${{ config.price }}/mo</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { type Config as PackageBubbleConfig } from '~/components/PackageBubble.vue';

    export interface Config {
        title: string;
        price?: number;
        elements: PackageBubbleConfig[];
    }
    defineProps<{
        config: Config;
        enlarge: boolean;
    }>();
</script>

<style scoped>
    @media (min-width: 1024px) {
        .enlarge {
            transform: scale(1.025);
        }
        .shadow-floating:hover {
            box-shadow: 16px 48px 96px 24px rgba(0, 0, 0, 0.2);
            transform: scale(1.05);
        }
    }
</style>
