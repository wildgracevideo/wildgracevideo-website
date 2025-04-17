<template>
    <div class="border-website-tertiary cursor-pointer border-b">
        <button
            v-if="largeStyle"
            class="flex w-full items-center justify-between py-10 md:py-14"
            @click="toggleAccordion"
        >
            <Markdown
                :markdown-string="titleMarkdown"
                component-class="no-default-format strong:font-semibold mx-auto md:text-4xl text-xl md:translate-x-8 translate-x-6"
            />
            <span class="transition-transform duration-300">
                <PlusIcon
                    v-if="!showAccordionItem"
                    class="mr-2 h-8 w-8 md:mr-4 md:h-12 md:w-12"
                    fill="currentcolor"
                />
                <MinusIcon
                    v-else
                    class="mr-2 h-8 w-8 md:mr-4 md:h-12 md:w-12"
                    fill="currentcolor"
                />
            </span>
        </button>
        <button
            v-else
            class="flex w-full items-center justify-between py-8"
            @click="toggleAccordion"
        >
            <Markdown
                :markdown-string="titleMarkdown"
                component-class="no-default-format strong:font-semibold"
            />
            <span class="transition-transform duration-300">
                <PlusIcon
                    v-if="!showAccordionItem"
                    class="h-4 w-4"
                    fill="currentcolor"
                />
                <MinusIcon v-else class="h-4 w-4" fill="currentcolor" />
            </span>
        </button>
        <div
            ref="contentElement"
            class="max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
        >
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { MinusIcon, PlusIcon } from '@heroicons/vue/24/outline';

    const showAccordionItem = ref(false);
    const contentElement: Ref<HTMLElement | null> = ref(null);

    const toggleAccordion = () => {
        showAccordionItem.value = !showAccordionItem.value;
        if (
            contentElement.value?.style.maxHeight &&
            contentElement.value.style.maxHeight !== '0px'
        ) {
            contentElement.value.style.maxHeight = '0';
        } else if (contentElement.value) {
            contentElement.value.style.maxHeight =
                contentElement.value.scrollHeight + 'px';
        }
    };

    withDefaults(
        defineProps<{
            titleMarkdown: string;
            largeStyle?: boolean | null;
        }>(),
        {
            largeStyle: false,
        }
    );
</script>
