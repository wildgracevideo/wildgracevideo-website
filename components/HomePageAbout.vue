<template>
    <div
        class="mx-12 mb-36 mt-32 grid grid-cols-1 gap-x-16 md:mt-48 md:grid-cols-2 xl:mx-24"
    >
        <div class="order-2 md:order-1">
            <Markdown
                :markdown-string="`## ${aboutTitleMarkdown}`"
                component-class="no-default-format strong:font-bold mb-8 hidden text-4xl md:block md:text-5xl"
            />
            <Markdown
                :markdown-string="aboutTextMarkdown"
                component-class="br:mb-8"
            />
        </div>
        <div class="order-1 grow-0 md:order-2">
            <Markdown
                :markdown-string="`## ${aboutTitleMarkdown}`"
                component-class="no-default-format strong:font-bold mb-12 block text-4xl md:hidden md:text-5xl"
            />
            <!-- TODO: Add SchemaOrgImage -->
            <img :src="aboutImage" :alt="aboutImageAltText" class="aspect-2" />
        </div>
    </div>
</template>

<script setup lang="ts">
    defineProps<{
        aboutTitleMarkdown: string;
        aboutTextMarkdown: string;
        aboutImage: string;
        aboutImageAltText: string;
    }>();
</script>
