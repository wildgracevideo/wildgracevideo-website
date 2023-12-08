<template>
    <div
        class="border-y-16 border-custom-green shadow-floating flex flex-col justify-between rounded-3xl border-l-8 border-r-8"
        :class="{ enlarge: enlarge }"
    >
        <div>
            <h3 class="mx-auto mb-6 mt-4 w-fit text-center text-4xl font-bold">
                <span class="font-family-moontime mr-1">{{ firstWord }}</span
                ><span class="font-family-spectral">{{ words }}</span>
            </h3>
            <p class="mx-4 text-center">{{ config.description }}</p>
            <div v-if="config.description" class="mx-8 my-4 h-0.5 bg-black" />
            <template v-if="isPackageBubble">
                <PackageBubble
                    v-for="item in config.elements"
                    :key="`${item}-package-item-bubble`"
                    :config="item as PackageBubbleConfig"
                />
            </template>
            <PackageBubbleSimple
                v-else
                :details="config.elements as string[]"
            />
        </div>
        <div>
            <p class="mb-2 mt-auto text-center">Starting at</p>
            <p class="mb-4 text-center text-2xl">${{ config.price }}/mo</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { type Config as PackageBubbleConfig } from '~/components/PackageBubble.vue';

    export interface Config {
        description?: string;
        title: string;
        price: number;
        elements: PackageBubbleConfig[] | string[];
    }

    const props = defineProps<{
        config: Config;
        enlarge: boolean;
    }>();

    let isPackageBubble: boolean;
    try {
        isPackageBubble = 'title' in (props.config.elements[0] as never);
    } catch (e) {
        isPackageBubble = false;
    }

    const wordSplit = props.config.title.split(' ');
    const firstWord = wordSplit[0];
    const words = wordSplit.slice(1).join(' ');
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
