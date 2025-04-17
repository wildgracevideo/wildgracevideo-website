<template>
    <div
        class="bg-website-tertiary text-website-off-white flex flex-col-reverse items-center px-4 py-16 lg:flex-row lg:px-16"
    >
        <FileOrVideo
            parent-class="pointer-events-none relative z-0 cursor-default lg:w-1/3 w-4/5 aspect-photo mx-auto lg:my-16 my-4 shrink-0"
            class="aspect-photo w-full object-cover object-center"
            :file="testimonial.file"
            sizes="2xl:800px xl:615px lg:512px 410px"
            :with-sound-control="false"
        />
        <div class="max-w-2xl">
            <Markdown
                :markdown-string="`### ${testimonial.author}`"
                component-class="no-default-format mx-4 text-center lg:text-4xl text-2xl subheading-font"
            />
            <Markdown
                :markdown-string="`${testimonial.comment}`"
                component-class="mx-auto text-center lg:py-12 py-8"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
    defineProps<{
        testimonial: CmsServicesTestimonial | CmsAboutTestimonial;
    }>();
</script>
