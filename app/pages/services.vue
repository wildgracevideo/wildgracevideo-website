<template>
    <OgMeta :title="title" :description="description" />
    <div class="relative">
        <div
            class="bg-website-secondary/30 absolute inset-0 -top-[36px] z-10 h-[60dvh] lg:-top-[36px]"
        ></div>
        <h1
            class="text-website-off-white relative top-36 z-20 mx-auto lg:top-24"
        >
            <div class="mx-auto flex w-fit flex-col px-4">
                <span
                    class="heading-font block pb-2 text-2xl tracking-widest lg:text-6xl"
                    >A NEW CONTENT APPROACH FOR</span
                >
                <div class="flex shrink flex-row items-center">
                    <div class="bg-website-off-white h-[1px] grow" />
                    <span class="subheading-font ml-8 text-2xl lg:text-4xl"
                        >ADVENTURE BRANDS</span
                    >
                </div>
            </div>
        </h1>
        <FileOrVideo
            parent-class="pointer-events-none relative z-0 cursor-default lg:-top-36 -top-[110px]"
            class="h-[60dvh] w-full object-cover object-top brightness-50"
            :file="headingFile"
            sizes="2xl:2000px xl:1536px lg:1280px md:1024px sm:768px 640px"
            :with-sound-control="false"
        />
    </div>
    <article>
        <Markdown
            :markdown-string="`## ${servicesData.problemOverview.pageTagline}`"
            component-class="no-default-format lg:mx-32 mx-12 -mt-16 mb-10 lg:mb-20 text-center text-3xl lg:text-6xl heading-font max-w-8xl strong:font-semibold tracking-widest leading-normal"
        />
        <div class="mb-24 flex flex-col lg:flex-row">
            <FileOrVideo
                parent-class="pointer-events-none relative z-0 cursor-default aspect-photo bg-website-secondary lg:mx-24 mx-auto flex-1 lg:mb-0 mb-12 lg:max-w-full sm:max-w-[60%]"
                class="h-full translate-x-1/20 translate-y-1/20 object-cover object-center"
                :file="problemFile"
                sizes="2xl:800px xl:615px lg:512px 410px"
                :with-sound-control="false"
            />
            <div class="hidden flex-col lg:flex">
                <div class="bg-website-tertiary -mb-48 w-0.25 grow"></div>
            </div>
            <div class="mx-24 flex-1">
                <Markdown
                    :markdown-string="`### ${servicesData.problemOverview.problemOverview1}`"
                    component-class="no-default-format text-left text-lg lg:text-3xl subheading-font strong:font-semibold -ml-8"
                />
                <ul class="mt-8 -ml-8 list-none">
                    <li
                        v-for="(item, i) in servicesData.problemOverview
                            .problemItems1"
                        :key="`${i}-problemItems1-list-item`"
                        class="mb-8"
                    >
                        <div class="flex flex-row">
                            <XCircleIcon
                                class="text-website-primary mr-2 h-8 w-8 shrink-0"
                            />
                            <p>
                                {{ item.description }}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bg-website-secondary text-website-tertiary">
            <div class="mx-24 max-w-[50%]">
                <Markdown
                    :markdown-string="`### ${servicesData.problemOverview.problemOverview2}`"
                    component-class="no-default-format text-left text-lg lg:text-3xl subheading-font strong:font-semibold pt-24"
                />
                <ul class="mt-8 list-none pb-16">
                    <li
                        v-for="(item, i) in servicesData.problemOverview
                            .problemItems2"
                        :key="`${i}-problemItems2-list-item`"
                        class="pb-8"
                    >
                        <div class="flex flex-row">
                            <XCircleIcon
                                class="text-website-tertiary/80 mr-2 h-8 w-8 shrink-0"
                            />
                            <p>
                                {{ item.description }}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </article>
    <article>
        <div class="mx-8">
            <Markdown
                :markdown-string="`## ${servicesData.solution.title}`"
                component-class="no-default-format text-center text-3xl lg:text-5xl heading-font strong:font-semibold pt-32 tracking-widest leading-normal mx-auto"
            />
            <FileOrVideo
                parent-class="pointer-events-none relative z-0 cursor-default mx-auto w-28 h-28 my-16"
                class="h-full object-cover object-center"
                :file="servicesData.solution.solutionOverviewFile"
                sizes="112px"
                :with-sound-control="false"
            />
            <Markdown
                :markdown-string="`### ${servicesData.solution.description}`"
                component-class="no-default-format text-center strong:font-semibold mx-auto max-w-4xl pb-32 mx-auto"
            />
        </div>
        <div class="bg-website-tertiary text-website-off-white relative pb-16">
            <FileOrVideo
                parent-class="pointer-events-none z-0 cursor-default md:w-1/3 w-1/2 aspect-square absolute ml-auto z-0 opacity-10 lg:top-1/2 top-16 lg:-translate-y-1/2 left-full -translate-x-full"
                class="h-full object-cover object-center"
                :file="servicesData.solution.actionFile"
                sizes="2xl:800px xl:615px lg:512px 410px"
                :with-sound-control="false"
            />
            <MarkdownHeaderWithLine
                :header-markdown="`### ${servicesData.solution.action}`"
                class="pt-12 pb-32 pl-12"
            />
            <Markdown
                :markdown-string="`${servicesData.solution.actionOverview}`"
                component-class="text-center strong:font-semibold lg:w-7/12 w-11/12 lg:mr-72 lg:ml-24 mr-8 ml-4 lg:text-left text-center pb-16 z-10"
            />
            <DefaultButton
                :title="servicesData.solution.actionCta"
                class="mx-auto"
                to="/get-started"
                :light="true"
            />
        </div>
        <div>
            <Markdown
                :markdown-string="`### ${servicesData.solution.nextStepsHeading}`"
                component-class="no-default-format text-center strong:font-semibold lg:mx-auto mx-4 pt-32 subheading-font lg:text-3xl text-xl"
            />
            <ul class="mx-auto w-3/4 list-none py-24 lg:w-1/2">
                <li
                    v-for="(item, i) in servicesData.solution.nextSteps"
                    :key="`${i}-next-steps-list-item`"
                    class="mb-4"
                >
                    <div class="flex flex-row items-center">
                        <XCircleIcon
                            class="text-website-primary mr-2 h-8 w-8 shrink-0"
                        />
                        <p>
                            {{ item.title }}
                        </p>
                    </div>
                </li>
            </ul>
            <Markdown
                :markdown-string="`#### ${servicesData.solution.nextStepsSubheading}`"
                component-class="no-default-format text-center strong:font-semibold mx-auto pb-16 subheading-font lg:text-3xl text-xl max-w-4xl"
            />
        </div>
    </article>
    <ServicesAdventureContentPartnership
        :config="servicesData.adventureContentPartnership"
    />
    <section>
        <TestimonialOverview
            :testimonial="servicesData.testimonial"
            class="!bg-website-off-white !text-website-tertiary"
        />
    </section>
    <article
        class="text-website-off-white bg-black/40 bg-cover bg-fixed bg-center bg-no-repeat px-12 py-16 pb-36 bg-blend-color lg:py-36 lg:pb-72"
        :style="{
            backgroundImage: `url('${servicesData.ready.backgroundImage.file}?format=webp&width=2000')`,
        }"
    >
        <Markdown
            :markdown-string="`## ${servicesData.ready.title}`"
            component-class="no-default-format mx-4 text-center lg:text-5xl text-3xl heading-font"
        />
        <Markdown
            :markdown-string="`${servicesData.ready.content}`"
            component-class="mx-auto text-center lg:py-12 py-8 w-fit lg:text-3xl text-xl subheading-font"
        />
        <DefaultButton
            :title="servicesData.ready.callToAction"
            class="mx-auto"
            to="/get-started"
            :light="false"
        />
    </article>
    <article class="bg-website-tertiary text-website-off-white lg:pb-16">
        <MarkdownHeaderWithLine
            :header-markdown="servicesData.results.title"
            class="pt-12 pb-8 pl-4 lg:pl-12"
        />
        <div
            class="flex flex-col-reverse pb-8 text-center lg:flex-row lg:pb-12 lg:text-left"
        >
            <div class="mr-4 ml-4 lg:mr-0 lg:ml-20">
                <Markdown
                    :markdown-string="servicesData.results.description"
                    component-class="tall-p-margin"
                />
                <DefaultButton
                    :title="servicesData.results.callToAction"
                    class="mx-auto mb-0 lg:mx-0 lg:mb-8"
                    to="/get-started"
                    :light="false"
                />
            </div>
            <FileOrVideo
                parent-class="pointer-events-none relative z-0 cursor-default lg:w-2/3 w-4/5 aspect-video lg:mx-12 mx-auto lg:mb-0 mb-8"
                class="aspect-video w-full object-cover object-center"
                :file="servicesData.results.file"
                sizes="2xl:800px xl:615px lg:512px 410px"
                :with-sound-control="false"
            />
        </div>
    </article>
    <section class="bg-website-primary text-website-off-white pb-6 lg:pb-12">
        <Markdown
            :markdown-string="`## ${servicesData.howItWorks.title}`"
            component-class="text-center mx-auto no-default-format heading-font lg:py-16 py-8 lg:text-6xl text-3xl"
        />
        <div class="bg-website-accent mb-8 h-0.25 w-full lg:mb-16" />
        <div
            v-for="(item, index) in servicesData.howItWorks.items"
            :key="`how-it-works-item-${index}`"
            class="mb-6 flex flex-col items-center gap-8 px-8 lg:mb-12 lg:flex-row lg:gap-16 lg:px-16"
        >
            <FileOrVideo
                :parent-class="`pointer-events-none z-0 cursor-default aspect-photo w-24 lg:block hidden ${
                    index % 2 === 0 ? 'order-3' : 'order-1'
                }`"
                class="h-full w-full object-contain object-center"
                :file="item.accentFile"
                sizes="96px"
                :with-sound-control="false"
            />
            <Markdown
                :markdown-string="`${item.description}`"
                component-class="text-center order-2"
            />
            <FileOrVideo
                :parent-class="`pointer-events-none z-0 cursor-default aspect-video lg:w-5/12 w-4/5 shrink-0 order-3 ${
                    index % 2 === 0 ? 'lg:order-1' : 'lg:order-3'
                }`"
                class="h-full object-cover object-center"
                :file="item.file"
                sizes="2xl:800px xl:615px lg:512px 410px"
                :with-sound-control="false"
            />
        </div>
    </section>
    <article class="bg-website-off-white text-website-tertiary pt-8 lg:pt-16">
        <div
            class="flex w-full flex-col justify-between gap-8 py-16 py-32 lg:flex-row lg:gap-0"
        >
            <div class="grow-1">
                <Markdown
                    :markdown-string="`### ${servicesData.urgency.title}`"
                    component-class="no-default-format mx-auto text-center lg:text-4xl text-2xl subheading-font"
                />
                <Markdown
                    :markdown-string="`${servicesData.urgency.startingAt}`"
                    component-class="mx-auto text-center accent-font lg:text-2xl text-xl"
                />
            </div>
            <div class="-mt-64 -mb-64 hidden grow-1 self-stretch lg:block">
                <div class="border-website-accent h-full border-r"></div>
            </div>
            <div class="ml-4 flex grow-1 flex-row text-left text-lg text-xl">
                <Markdown
                    :markdown-string="`${servicesData.urgency.limitingFactor}`"
                    component-class="mx-auto text-center"
                />
            </div>
        </div>
        <div
            class="text-website-off-white bg-black/40 bg-cover bg-fixed bg-center bg-no-repeat py-20 bg-blend-color"
            :style="{
                backgroundImage: `url('${servicesData.urgency.backgroundImage.file}?format=webp&width=2000')`,
            }"
        >
            <div
                class="bg-website-tertiary/60 mx-auto w-3/4 px-12 py-8 lg:px-32 lg:py-20"
            >
                <Markdown
                    :markdown-string="`### ${servicesData.urgency.subtitle}`"
                    component-class="no-default-format mx-auto text-center lg:text-4xl text-2xl subheading-font lg:mb-20 mb-8"
                />
                <div
                    v-for="(item, index) in servicesData.urgency
                        .descriptionItems"
                    :key="`urgency-item-${index}`"
                >
                    <Markdown
                        :markdown-string="`${item.title}`"
                        component-class="no-default-format mx-auto text-center accent-font lg:text-4xl text-2xl"
                    />
                    <Markdown
                        :markdown-string="`${item.description}`"
                        component-class="no-default-format mx-auto text-center lg:mb-20 mb-8"
                    />
                </div>
                <Markdown
                    :markdown-string="`${servicesData.urgency.footer}`"
                    component-class="no-default-format mx-auto text-center lg:text-4xl text-2xl subheading-font"
                />
            </div>
            <DefaultButton
                :title="servicesData.urgency.callToAction"
                class="mx-auto mt-8 lg:mt-16"
                to="/get-started"
                :light="false"
            />
        </div>
    </article>
    <CaseStudies
        :case-studies="servicesData.caseStudies"
        class="bg-website-tertiary text-website-off-white p-16"
        :light-button="true"
    />
    <section
        class="bg-website-secondary text-website-off-white flex flex-col items-center gap-8 px-8 py-16 lg:flex-row lg:gap-24 lg:px-20 lg:py-32"
    >
        <div>
            <Markdown
                :markdown-string="`## ${servicesData.notReady.title}`"
                component-class="no-default-format mx-auto lg:text-left text-center lg:text-5xl text-3xl heading-font mb-8"
            />
            <Markdown
                :markdown-string="`${servicesData.notReady.subtitle}`"
                component-class="no-default-format mx-auto lg:text-left text-center lg:text-3xl text-xl accent-font mb-8"
            />
        </div>
        <div class="w-10/12 lg:w-7/12">
            <div
                v-for="(p, index) in servicesData.notReady.packages"
                :key="`not-ready-package-${index}`"
                class="border-website-accent rounded-6xl mb-8 w-full border p-8"
            >
                <Markdown
                    :markdown-string="`### ${p.title}`"
                    component-class="no-default-format mx-auto text-center lg:text-3xl text-xl subheading-font mb-8"
                />
                <Markdown
                    :markdown-string="`${p.content}`"
                    component-class="mx-4 text-center"
                />
                <DefaultButton
                    :title="p.callToAction"
                    class="mx-auto mt-4"
                    to="/get-started"
                    :light="false"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { XCircleIcon } from '@heroicons/vue/24/outline';
    import type { CmsServices } from '~~/shared/types/cms';

    const { data } = await useAsyncData('services', () => {
        return queryCollection('content')
            .where('stem', '=', 'services/services')
            .first();
    });

    const servicesData = data!.value!.meta as unknown as CmsServices;
    const title = servicesData.title;
    const description = servicesData.description;

    const headingFile = servicesData.headingFile;
    const problemFile = servicesData.problemOverview.problemFile;
</script>
