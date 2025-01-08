<template>
    <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
        <div class="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
            <div class="mb-4 flex items-center justify-between border-b pb-2">
                <h3 class="text-2xl font-semibold">{{ title }}</h3>
                <button
                    class="text-gray-500 hover:text-gray-800"
                    @click="$emit('close')"
                >
                    <XMarkIcon class="h-8 w-8" />
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
