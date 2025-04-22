<template>
    <div class="flex flex-row items-center">
        <template v-if="leading">
            <Markdown
                :markdown-string="headerMarkdown"
                component-class="no-default-format strong:font-semibold m-6 text-left lg:text-3xl text-xl accent-font"
            />
            <div
                :class="`${
                    light ? 'bg-website-off-white' : 'bg-website-tertiary'
                } mr-6 h-0.25 w-full flex-1`"
            ></div>
        </template>
        <template v-else>
            <div
                :class="`${
                    light ? 'bg-website-off-white' : 'bg-website-tertiary'
                } bg-website-off-white ml-6 h-0.25 w-full flex-1`"
            ></div>
            <Markdown
                :markdown-string="headerMarkdown"
                component-class="no-default-format strong:font-semibold m-6 text-right lg:text-3xl text-xl accent-font"
            />
        </template>
    </div>
</template>

<script setup lang="ts">
    withDefaults(
        defineProps<{
            headerMarkdown: string;
            leading?: boolean | null;
            light?: boolean | null;
        }>(),
        {
            leading: true,
            light: true,
        }
    );
</script>
