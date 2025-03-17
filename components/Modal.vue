<template>
    <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
        <div
            class="w-full max-w-lg rounded-lg bg-website-off-white p-6 text-website-tertiary shadow-lg"
        >
            <div
                class="mb-4 flex items-center justify-between border-b border-website-tertiary pb-2"
            >
                <h3 class="subheading-font text-center text-2xl">
                    {{ title }}
                </h3>
                <button class="hover:text-gray-800" @click="$emit('close')">
                    <XMarkIcon class="h-8 w-8 text-website-tertiary" />
                </button>
            </div>
            <div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { XMarkIcon } from '@heroicons/vue/20/solid';
    defineProps<{ show: boolean; title: string }>();
    defineEmits(['close']);
</script>
