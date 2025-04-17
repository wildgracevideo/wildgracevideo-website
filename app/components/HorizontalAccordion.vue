<template>
    <div class="flex w-full overflow-hidden rounded-lg shadow-lg">
        <div
            v-for="(item, index) in items"
            :key="item.title"
            class="bg-website-primary border-website-off-white relative flex w-full flex-1 cursor-pointer items-center justify-center border-r transition-all duration-500 ease-in-out"
            :class="{
                'flex-[4]': activeIndex === index,
                'flex-[1]': activeIndex !== index,
                'text-website-off-white': activeIndex !== index,
                'text-website-tertiary': activeIndex === index,
            }"
            role="button"
            tabindex="0"
            @click="activeIndex = index"
            @keyDown="activeIndex = index"
        >
            <div class="m-4 flex h-full flex-row">
                <Markdown
                    :markdown-string="`### ${
                        index === activeIndex ? '-' : '+'
                    } ${item.title}`"
                    :component-class="`no-default-format lg:text-6xl text-3xl writing-vertical tracking-widest -rotate-180 text-left self-end mb-4 ${
                        index === activeIndex ? 'ml-12' : 'ml-0'
                    }`"
                />
                <div
                    v-if="activeIndex === index"
                    class="text-website-tertiary bg-website-off-white -mr-4 ml-16 flex flex-col justify-between p-16 pr-16 text-center opacity-100 transition-opacity duration-300"
                >
                    <Markdown
                        :markdown-string="item.title"
                        component-class="subheading-font lg:text-4xl text-2xl"
                    />
                    <Markdown
                        :markdown-string="item.description"
                        component-class=""
                    />

                    <DefaultButton
                        :title="item.callToAction"
                        class="mx-auto mt-16"
                        :to="item.callToActionPath"
                        :dark="true"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const activeIndex = ref(0);
    defineProps<{ items: CmsAboutGoalHowToHelpItemsItem[] }>();
</script>
