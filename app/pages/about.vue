<template>
    <OgMeta :title="seoTitle" :description="seoDescription" />
    <SchemaOrgWebPage type="AboutPage" :name="seoTitle" />
    <div class="bg-website-tertiary text-website-off-white -mt-10 py-50">
        <Markdown
            :markdown-string="`# ${pageTitle}`"
            component-class="no-default-format mx-4 mb-4 text-center text-3xl lg:text-6xl lg:mx-auto lg:py-12 py-6 heading-font"
        />
        <div class="bg-website-off-white mx-auto h-0.25 w-1/3" />
    </div>
    <section
        class="mx-8 mb-20 grid grid-cols-1 gap-8 px-8 pt-24 md:mx-16 lg:grid-cols-2 lg:gap-16 lg:px-20"
    >
        <div class="order-3 lg:order-1">
            <Markdown
                :markdown-string="`## ${aboutMe.subtitle}`"
                component-class="no-default-format mx-20 mb-4 text-center text-2xl lg:text-4xl lg:mx-auto lg:py-12 py-6 subheading-font hidden lg:block"
            />
            <Markdown
                :markdown-string="aboutMe.description"
                component-class="text-lg"
            />
            <DefaultButton
                :title="aboutMe.callToAction"
                class="mx-auto mt-16"
                to="/get-started"
                :dark="true"
            />
            <Markdown
                :markdown-string="aboutMe.footer"
                component-class="no-default-format mx-20 text-center text-2xl lg:text-4xl lg:mx-auto lg:py-12 py-6 subheading-font hidden lg:block"
            />
            <ArrowDownCircleIcon class="mx-auto mt-8 h-12 w-12" />
        </div>
        <FileOrVideo
            parent-class="pointer-events-none relative z-0 cursor-default aspect-photo bg-website-secondary mx-auto lg:mb-0 mb-12 max-w-4/5 order-2"
            class="h-full w-full -translate-x-1/20 translate-y-1/20 object-cover object-center"
            :file="aboutMeFile"
            sizes="2xl:800px xl:615px lg:512px 410px"
            :with-sound-control="false"
        />
        <Markdown
            :markdown-string="`## ${aboutMe.subtitle}`"
            component-class="no-default-format mx-auto text-center text-2xl py-6 subheading-font block lg:hidden order-1"
        />
    </section>
    <section
        class="bg-website-secondary text-website-off-white relative px-16 pt-16 pb-16 text-center lg:pt-32 lg:text-left"
    >
        <div
            class="bg-website-primary absolute inset-y-0 left-1/2 -mt-20 hidden w-0.25 lg:block"
        />
        <div
            v-for="(item, index) in backgroundItems"
            :key="`${index}-background-item`"
            class="mb-8 grid grid-cols-1 lg:mb-20 lg:grid-cols-2"
        >
            <div
                class="px-8 lg:px-20"
                :class="`${index % 2 === 0 ? 'order-2 lg:order-1' : 'order-2'}`"
            >
                <Markdown
                    :markdown-string="`### ${item.title}`"
                    component-class="no-default-format mb-4 lg:text-3xl text-xl subheading-font"
                />
                <Markdown
                    :markdown-string="item.description"
                    component-class=""
                />
            </div>
            <FileOrVideo
                :parent-class="`cursor-default aspect-photo mx-auto lg:mb-0 mb-12 order-1 w-8/12 ${
                    index % 2 === 0 ? 'lg:order-2 order-1' : 'order-1'
                }`"
                class="h-full w-full object-cover object-center"
                :file="item.fileInfo"
                sizes="2xl:800px xl:615px lg:512px 410px"
                :with-sound-control="false"
            />
        </div>
    </section>
    <section
        class="bg-website-tertiary relative flex h-[75dvh] items-center justify-center text-center"
    >
        <FileOrVideo
            parent-class="absolute cursor-default aspect-square md:w-1/3 w-1/2 lg:right-0 opacity-10 z-0"
            class="h-full w-full object-cover object-center"
            :file="behindTheScenesData.nextSteps.fileInfo"
            sizes="2xl:12000px xl:800px lg:600px 400px"
            :with-sound-control="false"
        />

        <Markdown
            :markdown-string="`## ${behindTheScenesData.nextSteps.title}`"
            component-class="no-default-format z-10 relative text-website-off-white lg:text-3xl text-xl lg:w-2/3 w-4/5 mx-auto subheading-font"
        />
    </section>
    <section
        class="text-website-off-white bg-black/60 bg-cover bg-fixed bg-center bg-no-repeat py-16 bg-blend-darken lg:py-32"
        :style="{
            backgroundImage: `url('${behindTheScenesData.gaps.backgroundImage.file}?format=webp&size=2000')`,
        }"
    >
        <div class="bg-website-tertiary/50 mx-8 pt-16 pb-16 lg:mx-24 lg:pt-48">
            <div
                v-for="(item, index) in behindTheScenesData.gaps.items"
                :key="`${index}-gaps-item`"
                class="mb-16 flex flex-row items-center gap-8 pr-16 pl-8 lg:gap-16 lg:pr-32 lg:pl-16"
            >
                <Markdown
                    :markdown-string="`### ${item.title}`"
                    component-class="no-default-format lg:text-3xl text-xl subheading-font shrink-0 text-website-accent mr-8"
                />
                <Markdown
                    :markdown-string="`${item.description}`"
                    component-class=""
                />
            </div>
            <DefaultButton
                :title="behindTheScenesData.gaps.callToAction"
                class="mx-auto mt-16"
                to="/get-started"
                :dark="true"
            />
        </div>
    </section>
    <section class="bg-website-primary pt-24 lg:pt-48">
        <Markdown
            :markdown-string="behindTheScenesData.solution.title"
            component-class="no-default-format lg:text-3xl text-xl accent-font text-website-accent mx-auto w-4/5 text-center lg:mb-24 mb-8"
        />
        <Markdown
            :markdown-string="behindTheScenesData.solution.subtitle"
            component-class="text-website-off-white mx-auto px-4 text-center pb-32"
        />
    </section>
    <article class="px-12 pt-16 lg:px-20 lg:pt-48">
        <div class="flex flex-col lg:flex-row">
            <div>
                <Markdown
                    :markdown-string="behindTheScenesData.goal.title"
                    component-class="no-default-format lg:text-5xl text-3xl mb-8 lg:text-left text-center heading-font lg:mx-0 mx-auto"
                />
                <div
                    class="bg-website-tertiary mb-8 hidden h-0.25 w-full lg:block"
                />
                <Markdown
                    :markdown-string="behindTheScenesData.goal.subtitle"
                    component-class="no-default-format lg:text-3xl text-xl accent-font lg:mr-20 mr-auto lg:ml-0 ml-auto lg:text-left text-center"
                />
            </div>
            <FileOrVideo
                parent-class="pointer-events-none cursor-default aspect-photo lg:w-5/12 w-4/5 lg:mx-0 mx-auto lg:mt-0 my-16"
                class="h-full w-full object-cover object-center"
                :file="behindTheScenesData.goal.file"
                sizes="2xl:800px xl:615px lg:512px 410px"
                :with-sound-control="false"
            />
        </div>
        <div class="-mt-16 ml-8 w-1/2">
            <FileOrVideo
                parent-class="pointer-events-none cursor-default mx-auto hidden lg:block w-28 h-32"
                class="h-full w-full object-contain object-center"
                :file="behindTheScenesData.goal.accentFile"
                sizes="115px"
                :with-sound-control="false"
            />
        </div>
        <Markdown
            :markdown-string="behindTheScenesData.goal.howToHelp.title"
            component-class="no-default-format lg:text-4xl text-2xl subheading-font lg:mt-32 mt-16 lg:mb-20 mb-16"
        />
        <section>
            <HorizontalAccordion
                :items="behindTheScenesData.goal.howToHelp.items"
            />
        </section>
        <DefaultButton
            :title="behindTheScenesData.gaps.callToAction"
            class="mx-auto mt-16 mb-8 lg:mb-20"
            to="/get-started"
            :dark="true"
        />
    </article>
    <TestimonialOverview :testimonial="behindTheScenesData.testimonial" />
    <article>
        <MarkdownHeaderWithLine
            :header-markdown="`### ${behindTheScenesData.trust.title}`"
            class="mt-12 pb-12 pl-12"
        />
        <div
            v-for="(item, index) in behindTheScenesData.trust.items"
            :key="`${index}-about-trust-item`"
            class="mb-16 flex flex-col lg:flex-row"
        >
            <div
                class="bg-website-primary border-website-accent text-website-off-white mx-auto mb-8 w-8/12 shrink-0 rounded-xl p-4 text-center lg:mx-16 lg:mb-0 lg:w-2/12"
            >
                {{ item.title }}
            </div>
            <div class="mr-8 ml-8 text-center lg:mr-16 lg:ml-0 lg:text-left">
                {{ item.description }}
            </div>
        </div>
    </article>
    <article class="border-website-tertiary border-b px-8 pb-32 lg:px-32">
        <FaqItems :title="faq.title" :items="faq.questions" />
    </article>
</template>

<script setup lang="ts">
    import { ArrowDownCircleIcon } from '@heroicons/vue/24/outline';
    import type { CmsAbout } from '~~/shared/types/cms';

    const { data } = await useAsyncData('about', () =>
        queryCollection('content').where('stem', '=', 'about/about').first()
    );

    const behindTheScenesData = data!.value!.meta as unknown as CmsAbout;
    const seoTitle = behindTheScenesData.title;
    const seoDescription = behindTheScenesData.description;

    const pageTitle = behindTheScenesData.pageTitle;

    const aboutMe = behindTheScenesData.aboutMe;
    const aboutMeFile = aboutMe.file;

    const backgroundItems = behindTheScenesData.background;

    const faq = behindTheScenesData.faq;
</script>
