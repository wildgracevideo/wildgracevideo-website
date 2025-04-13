<template>
    <div
        v-if="show"
        class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
        <div
            class="bg-website-off-white text-website-tertiary w-full max-w-lg rounded-lg p-6 shadow-lg"
        >
            <div
                class="border-website-tertiary mb-4 flex items-center justify-between border-b pb-2"
            >
                <h3 class="subheading-font text-center text-2xl">
                    {{ title }}
                </h3>
                <button class="hover:text-gray-800" @click="$emit('close')">
                    <XMarkIcon class="text-website-tertiary h-8 w-8" />
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
