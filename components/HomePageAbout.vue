<template>
    <article
        class="home-page-about-grid-container mx-12 mb-36 mt-32 grid grid-cols-1 gap-x-16 md:mt-48 md:grid-cols-2 xl:mx-24"
    >
        <div class="order-2 md:order-1">
            <Markdown
                :markdown-string="`## ${titleMarkdown}`"
                component-class="no-default-format strong:font-bold mb-12 hidden text-4xl md:block md:text-5xl"
            />
            <Markdown
                :markdown-string="textMarkdown"
                component-class="tall-p-margin"
            />
        </div>
        <div
            class="order-1 flex h-full grow-0 flex-col items-stretch md:order-2"
        >
            <Markdown
                :markdown-string="`## ${titleMarkdown}`"
                component-class="no-default-format strong:font-bold mb-12 block text-4xl md:hidden md:text-5xl"
            />
            <FileOrVideo
                :file="fileConfig.file"
                :seo-description="fileConfig.seoDescription"
                :seo-title="fileConfig.seoTitle"
                :thumbnail-image="fileConfig.thumbnailImage"
                :publication-date="fileConfig.publicationDate"
                class="aspect-125 mb-12 md:mb-0"
            />
        </div>
    </article>
</template>

<script setup lang="ts">
    import type { FileConfig } from './FileOrVideo.vue';

    defineProps<{
        titleMarkdown: string;
        textMarkdown: string;
        fileConfig: FileConfig;
    }>();
</script>
