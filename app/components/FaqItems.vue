<template>
    <Markdown
        :markdown-string="`## ${title}`"
        component-class="no-default-format subheading-font md:mx-auto mx-8 mb-20 mt-32 text-center text-4xl strong:font-semibold"
    />
    <AccordionItem
        v-for="(faqItem, index) in items"
        :key="`faq-${faqItem.question}`"
        :title-markdown="`### ${faqItem.question}`"
        :class="`w-full ${index === 0 ? 'border-t' : ''}`"
    >
        <Markdown :markdown-string="faqItem.answer" component-class="pb-5" />
    </AccordionItem>
</template>

<script setup lang="ts">
    defineProps<{
        title: string;
        items: CmsHomeFaqQuestionsItem[] | CmsAboutFaqQuestionsItem[];
    }>();
</script>
