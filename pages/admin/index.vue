<template>
    <p class="ml-8 mt-8 text-2xl">Dashboard</p>
</template>

<script setup lang="ts">
    definePageMeta({ middleware: 'auth', layout: 'admin' });
    useHead({
        title: 'WGV Admin',
    });
</script>
