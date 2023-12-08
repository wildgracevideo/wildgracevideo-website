<template>
    <p
        class="w-fit rounded-md p-1 text-xs font-bold"
        :class="additionalClasses"
    >
        {{ label }}
    </p>
</template>

<script setup lang="ts">
    defineProps<{
        label: string;
        additionalClasses: string;
    }>();
</script>
