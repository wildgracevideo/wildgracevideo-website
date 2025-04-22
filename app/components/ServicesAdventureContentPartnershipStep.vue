<template>
    <div
        class="bg-website-primary/50 text-website-off-white relative mx-8 mb-12 lg:mx-24 lg:mb-24"
    >
        <MarkdownHeaderWithLine :header-markdown="title" />
        <Markdown :markdown-string="value" component-class="mb-6 ml-8" />
        <div
            v-for="(item, i) in items"
            :key="`${i}-adventure-content-partnership-step-item`"
            class="my-4 ml-8 flex flex-row"
        >
            <CheckCircleIcon class="mr-6 h-6 w-6 shrink-0" />
            <Markdown :markdown-string="item.title" component-class="" />
        </div>
        <Markdown
            :markdown-string="description"
            component-class="strong:font-semibold mx-6 mb-12 text-left"
        />
    </div>
</template>

<script lang="ts" setup>
    import { CheckCircleIcon } from '@heroicons/vue/24/outline';

    defineProps<{
        title: string;
        description: string;
        value: string;
        items: CmsServicesAdventureContentPartnershipStepsItemItemsItem[];
    }>();
</script>
