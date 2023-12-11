<template>
    <div class="markdown" :class="componentClass" v-html="markdownHtml" />
</template>

<script setup lang="ts">
    const props = withDefaults(
        defineProps<{
            markdownString: string;
            componentClass?: string;
        }>(),
        {
            componentClass: '',
        }
    );
    const { $mdRenderer } = useNuxtApp();
    const markdownHtml = $mdRenderer.parse(props.markdownString);
</script>
