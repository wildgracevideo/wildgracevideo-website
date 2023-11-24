<template>
    <p class="rounded-md w-fit text-xs font-bold p-1" :class="class">
        {{ label }}
    </p>
</template>

<script setup lang="ts">
    defineProps<{
        label: string;
        class: string
    }>();
</script>
