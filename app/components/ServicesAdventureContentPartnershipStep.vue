<template>
    <div
        class="bg-website-primary/50 text-website-off-white relative mx-12 mb-12 lg:mx-24 lg:mb-24"
    >
        <div v-if="index % 2 == 0" class="flex flex-row items-center">
            <Markdown
                :markdown-string="title"
                component-class="no-default-format strong:font-semibold m-6 text-left lg:text-3xl text-xl accent-font"
            />
            <div class="bg-website-off-white mr-6 h-0.25 w-full flex-1"></div>
        </div>
        <div v-else class="flex flex-row items-center">
            <div class="bg-website-off-white ml-6 h-0.25 w-full flex-1"></div>
            <Markdown
                :markdown-string="title"
                component-class="no-default-format strong:font-semibold m-6 text-right lg:text-3xl text-xl accent-font"
            />
        </div>

        <Markdown
            :markdown-string="description"
            component-class="no-default-format strong:font-semibold mx-6 mb-12 text-left"
        />
    </div>
</template>

<script lang="ts" setup>
    defineProps<{ title: string; description: string; index: number }>();
</script>
