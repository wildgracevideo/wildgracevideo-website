<template>
    <section>
        <h2 class="mb-16 text-2xl">
            DISCOVER
            <span class="subheading-font mt-4 block text-5xl"
                >REAL CLIENTS</span
            >
        </h2>
        <div
            v-for="caseStudy in caseStudies"
            :key="caseStudy.title"
            class="1/2 mx-auto md:w-1/4"
        >
            <NuxtLink :to="caseStudy.pagePath">
                <FileOrVideo
                    parent-class="pointer-events-none relative z-0 cursor-default w-full aspect-photo"
                    class="aspect-photo mx-auto w-full object-cover object-bottom md:mx-0"
                    :file="caseStudy.file"
                    sizes="2xl:800px xl:615px lg:512px 410px"
                    :with-sound-control="false"
                />
                <h3
                    class="subheading-font mt-4 text-center text-2xl lg:text-left lg:text-4xl"
                >
                    {{ caseStudy.title }}
                </h3>
                <hr class="border-website-accent my-2 w-full border-t" />
                <p class="text-center lg:text-left">
                    {{ caseStudy.description }}
                </p>
            </NuxtLink>
        </div>
        <DefaultButton
            title="Visit Portfolio"
            to="portfolio"
            class="mx-auto mt-12"
            :dark="!lightButton"
        />
    </section>
</template>

<script setup lang="ts">
    withDefaults(
        defineProps<{
            caseStudies:
                | CmsHomeCaseStudiesItem[]
                | CmsServicesCaseStudiesItem[];
            lightButton?: boolean | null;
        }>(),
        {
            lightButton: false,
        }
    );
</script>
