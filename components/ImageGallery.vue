<template>
    <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="flex flex-col justify-between">
            <Markdown
                v-if="!!galleryTitleMarkdown"
                :markdown-string="galleryTitleMarkdown"
                component-class="no-default-format pt-12 text-2xl md:text-4xl text-center"
            />

            <div ref="selectedHTMLItem" class="p-16">
                <Markdown
                    :key="title"
                    :markdown-string="title"
                    component-class="no-default-format strong:font-semibold mb-8 text-2xl mx-auto text-center"
                />
                <Markdown
                    :key="title"
                    :markdown-string="description"
                    component-class="text-center"
                />
                <NuxtLink
                    v-if="ctaLink && ctaText"
                    :to="ctaLink"
                    class="text-primary mx-auto mt-8 block text-center underline"
                    >{{ ctaText }}</NuxtLink
                >
            </div>
            <div class="mx-auto mb-8 flex flex-row gap-8">
                <ArrowLongLeftIcon
                    class="h-8 w-8 cursor-pointer"
                    @click="decrement"
                />
                <p class="pt-1">{{ selectedItem + 1 }} / {{ items.length }}</p>
                <ArrowLongRightIcon
                    class="h-8 w-8 cursor-pointer"
                    @click="increment"
                />
            </div>
        </div>
        <div ref="fileElement" class="fade-in-quicker">
            <FileOrVideo
                parent-class="pointer-events-none relative z-0 cursor-default px"
                class="aspect-vertical h-dvh w-full object-cover object-center"
                :file="items[selectedItem].fileInfo"
                sizes="2xl:1000px xl:768px lg:640px md:512px sm:384px 320px"
                :with-sound-control="false"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import {
        ArrowLongLeftIcon,
        ArrowLongRightIcon,
    } from '@heroicons/vue/24/outline';
    import type { FileConfig } from '~/components/FileOrVideo.vue';

    const selectedItem = ref(0);
    const props = defineProps<{
        galleryTitleMarkdown: string;
        items: {
            fileInfo: FileConfig;
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
