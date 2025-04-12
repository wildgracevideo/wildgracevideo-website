<template>
    <div class="grid grid-cols-1 md:grid-cols-2">
        <div ref="fileElement" class="fade-in-quicker">
            <FileOrVideo
                parent-class="pointer-events-none relative z-0 cursor-default"
                class="aspect-vertical h-dvh w-full object-cover object-center"
                :file="items[selectedItem].fileInfo"
                sizes="2xl:1000px xl:768px lg:640px md:512px sm:384px 320px"
                :with-sound-control="false"
            />
        </div>
        <div class="flex flex-row">
            <div class="ml-8 flex h-full flex-col justify-center">
                <ChevronLeftIcon
                    class="h-6 w-6 cursor-pointer"
                    @click="decrement"
                />
            </div>
            <div class="flex flex-col justify-between">
                <Markdown
                    v-if="!!galleryTitleMarkdown"
                    :markdown-string="galleryTitleMarkdown"
                    component-class="no-default-format pt-12 text-2xl md:text-5xl md:text-left text-center heading-font mx-auto"
                />
                <div ref="selectedHTMLItem" class="p-16">
                    <Markdown
                        :key="title"
                        :markdown-string="`### ${selectedItem + 1}. ${title}`"
                        component-class="no-default-format mb-12 md:text-4xl text-xl mx-auto subheading-font"
                    />
                    <Markdown
                        :key="title"
                        :markdown-string="description"
                        component-class="md:text-left text-center md:text-lg text-base"
                    />
                    <DefaultButton
                        v-if="ctaLink && ctaText"
                        :title="ctaText"
                        class="mx-auto mt-16"
                        :to="ctaLink"
                        :light="true"
                    />
                </div>
                <div class="mx-auto mb-8 flex flex-row gap-4">
                    <div
                        v-for="i in items.length"
                        :key="`${i}-image-gallery-icon`"
                        class="border-website-off-white h-2 w-2 rounded-full border"
                        :class="{
                            'bg-website-off-white': i - 1 === selectedItem,
                        }"
                    ></div>
                </div>
            </div>
            <div class="mr-8 flex h-full flex-col justify-center">
                <ChevronRightIcon
                    class="h-6 w-6 cursor-pointer"
                    @click="increment"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import {
        ChevronLeftIcon,
        ChevronRightIcon,
    } from '@heroicons/vue/24/outline';
    import type { FileInfo } from '~/components/FileOrVideo.vue';

    const selectedItem = ref(0);
    const props = defineProps<{
        galleryTitleMarkdown: string;
        items: {
            fileInfo: FileInfo;
            title: string;
            description: string;
        }[];
        ctaText?: string | undefined;
        ctaLink?: string | undefined;
    }>();

    const selectedHTMLItem = ref();
    const fileElement = ref();

    const title = computed(() => {
        return props.items[selectedItem.value].title;
    });

    const description = computed(() => {
        return props.items[selectedItem.value].description;
    });

    function animateQuick(element: HTMLElement) {
        element.classList.remove('fade-in-quicker');
        element.classList.add('fade-out-quicker');
        setInterval(() => {
            element.classList.remove('fade-out-quicker');
            element.classList.add('fade-in-quicker');
        }, 100);
    }

    const increment = () => {
        if (selectedItem.value < props.items.length - 1) {
            animateQuick(fileElement.value);
            selectedItem.value++;
        }
    };

    const decrement = () => {
        if (selectedItem.value > 0) {
            animateQuick(fileElement.value);
            selectedItem.value--;
        }
    };
</script>
