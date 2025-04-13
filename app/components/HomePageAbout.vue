<template>
    <article
        class="home-page-about-grid-container mx-12 mt-32 mb-36 grid grid-cols-1 gap-x-16 lg:mt-48 lg:grid-cols-2"
    >
        <div class="order-2 lg:order-1">
            <Markdown
                :markdown-string="`## ${titleMarkdown}`"
                component-class="no-default-format strong:font-semibold mb-16 hidden text-4xl lg:block lg:text-5xl heading-font lg:text-left text-center"
            />
            <div
                class="border-website-tertiary -mr-60 hidden border-t lg:block"
            />
            <Markdown
                :markdown-string="textMarkdown"
                component-class="tall-p-margin mt-24"
            />
            <DefaultButton
                :title="aboutMeCta"
                to="about"
                class="mx-auto mt-16 lg:mx-0"
            />
        </div>
        <div
            class="order-1 flex h-full grow-0 flex-col items-stretch lg:order-2"
        >
            <Markdown
                :markdown-string="`## ${titleMarkdown}`"
                component-class="no-default-format strong:font-semibold mb-12 block text-4xl lg:hidden lg:text-5xl text-center heading-font"
            />
            <div class="relative">
                <FileOrVideo
                    :file="stamp"
                    class="absolute -top-12 -right-12 float-right h-40 w-40 opacity-30 md:-top-28 md:h-60 md:w-60"
                    sizes="md:240px 160px"
                />
                <FileOrVideo
                    :file="fileConfig"
                    class="aspect-photo mx-auto mb-12 h-[80dvh] object-cover object-center lg:mb-0"
                />
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
    import type { FileInfo } from './FileOrVideo.vue';

    defineProps<{
        titleMarkdown: string;
        textMarkdown: string;
        fileConfig: FileInfo;
        aboutMeCta: string;
        stamp: FileInfo;
    }>();
</script>
