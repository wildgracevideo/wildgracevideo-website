<template>
    <div
        class="space-x absolute right-6 flex w-full max-w-xs items-center space-x-4 divide-x divide-gray-200 rounded-lg bg-white p-4 shadow transition-top duration-1000 ease-out"
        :class="{ 'top-6': show, '-top-24': !show }"
        role="alert"
    >
        <ExclamationCircleIcon
            v-if="type === NotificationType.error"
            class="stroke-red h-6 w-6"
        />
        <CheckCircleIcon
            v-else-if="type === NotificationType.success"
            class="stroke-green h-6 w-6"
        />
        <div class="ps-4 text-sm text-gray-500">{{ message }}</div>
    </div>
</template>

<script setup lang="ts">
    import {
        CheckCircleIcon,
        ExclamationCircleIcon,
    } from '@heroicons/vue/24/outline';
    import { NotificationType } from '~/types/component-types';

    defineProps<{
        type: NotificationType;
        message: string;
    }>();

    const show = ref(false);

    onMounted(() => {
        const initialDelay = 500;
        setTimeout(() => {
            show.value = true;
        }, initialDelay);
    });
</script>
