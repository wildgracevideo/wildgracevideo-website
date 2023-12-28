<template>
    <div
        :key="$.vnode.key || undefined"
        class="m-4 rounded-3xl pl-4 pr-2 text-base"
        :class="{ 'py-4': !!config.title }"
        :style="{ 'background-color': config.bgColor }"
    >
        <h4 v-if="config.title" class="mx-auto w-fit font-bold">
            {{ config.title }}
        </h4>
        <Markdown
            v-if="config.descriptionMarkdown"
            component-class="mx-auto w-fit no-default-format mb-4"
            :markdown-string="`#### ${config.descriptionMarkdown}`"
        />
        <div
            v-if="config.title || config.descriptionMarkdown"
            class="mx-2 mb-4 h-0.5 bg-black"
        />
        <Markdown
            component-class="px-4"
            :markdown-string="config.detailsMarkdown"
        />
    </div>
</template>

<script setup lang="ts">
    export interface Config {
        title: string | undefined;
        descriptionMarkdown: string | undefined;
        detailsMarkdown: string;
        bgColor: string;
    }

    defineProps<{
        config: Config;
    }>();
</script>
