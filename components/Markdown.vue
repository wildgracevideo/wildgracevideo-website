<template>
    <div
        :id="$attrs.id as string"
        class="markdown"
        :class="componentClass"
        v-html="markdownHtml"
    />
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

<style>
    .markdown.centered-ul:not(.no-default-format) ul {
        margin-left: auto;
        margin-right: auto;
    }

    .markdown:not(.no-default-format) p {
        margin-bottom: 1rem;
    }

    .markdown.tall-p-margin:not(.no-default-format) p {
        margin-bottom: 2rem;
    }

    .markdown:not(.no-default-format) ul,
    .markdown:not(.no-default-format) ol {
        width: fit-content;
        text-align: left;
    }

    .markdown:not(.no-default-format) li {
        display: list-item;
        list-style-type: disc;
    }

    .markdown:not(.no-default-format) a {
        text-decoration: underline;
        color: rgb(var(--color-website-primary));
    }

    .markdown:not(.no-default-format) h2 {
        font-size: 1.5rem;
        line-height: 2rem;
        margin-bottom: 3rem;
    }

    .markdown:not(.no-default-format) h3 {
        font-size: 1.25rem;
        line-height: 1.75rem;
        margin-bottom: 2rem;
    }

    .markdown:not(.no-default-format) h4 {
        font-size: 1.125rem;
        line-height: 1.75rem;
        margin-bottom: 1.5rem;
    }

    .markdown:not(.no-default-format) h5 {
        font-size: 1rem;
        line-height: 1.25rem;
        margin-bottom: 1rem;
    }

    .markdown:not(.no-default-format) h6 {
        font-size: 0.875rem;
        line-height: 1.25rem;
        margin-bottom: 0.5rem;
    }
</style>
