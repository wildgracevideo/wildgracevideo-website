<template>
    <div class="border-b border-slate-400">
        <button
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
            class="transition-all max-h-0 overflow-hidden duration-300 ease-in-out"
        >
            <Markdown
                :markdown-string="contentMarkdown"
                component-class="pb-5"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { MinusIcon, PlusIcon } from '@heroicons/vue/24/outline';

    const showAccordionItem = ref(false);
    const contentElement = ref(null);

    const toggleAccordion = () => {
        showAccordionItem.value = !showAccordionItem.value;
        if (
            contentElement.value.style.maxHeight &&
            contentElement.value.style.maxHeight !== '0px'
        ) {
            contentElement.value.style.maxHeight = '0';
        } else {
            contentElement.value.style.maxHeight =
                contentElement.value.scrollHeight + 'px';
        }
    };

    defineProps<{
        titleMarkdown: string;
        contentMarkdown: string;
    }>();
</script>
