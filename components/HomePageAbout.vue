<template>
    <div
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
            <SchemaOrgImage
                :name="imageName"
                :url="image"
                :description="imageAltText"
            />
            <img
                :src="image"
                :alt="imageAltText"
                class="aspect-125 mb-12 md:mb-0"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    defineProps<{
        titleMarkdown: string;
        textMarkdown: string;
        image: string;
        imageAltText: string;
        imageName: string;
    }>();
</script>
