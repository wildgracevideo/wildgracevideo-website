<template>
    <div
        class="bg-website-primary/50 text-website-off-white relative mx-12 mb-12 lg:mx-24 lg:mb-24"
    >
        <MarkdownHeaderWithLine
            :header-markdown="title"
            :leading="index % 2 === 0"
        />

        <Markdown
            :markdown-string="description"
            component-class="no-default-format strong:font-semibold mx-6 mb-12 text-left"
        />
    </div>
</template>

<script lang="ts" setup>
    defineProps<{ title: string; description: string; index: number }>();
</script>
