<template>
    <div
        :key="$.vnode.key || undefined"
        class="m-4 rounded-3xl py-4 pl-4 pr-2 text-base"
        :style="{ 'background-color': config.bgColor }"
    >
        <h4 v-if="config.title" class="mx-auto w-fit font-bold">
            {{ config.title }}
        </h4>
        <div v-if="config.title" class="mx-2 mb-4 h-0.5 bg-black" />
        <ul class="px-4">
            <li
                v-for="(detail, i) in config.details"
                :key="`${i}-package-bubble-li`"
                class="list-item list-disc"
            >
                {{ detail }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    export interface Config {
        title?: string;
        details: string[];
        bgColor: string;
    }

    defineProps<{
        config: Config;
    }>();
</script>
