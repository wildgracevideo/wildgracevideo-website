<template>
    <OgMeta :title="title" :description="description" />
    <div class="relative">
        <div
            class="absolute inset-0 -top-[36px] z-10 h-[60dvh] bg-website-secondary bg-opacity-30"
        ></div>
        <h1
            class="relative top-36 z-20 mx-auto text-website-off-white lg:top-24"
        >
            <div class="mx-auto flex w-fit flex-col px-4">
                <span
                    class="heading-font block pb-2 text-2xl tracking-widest lg:text-6xl"
                    >A NEW CONTENT APPROACH FOR</span
                >
                <div class="flex shrink flex-row items-center">
                    <div class="h-[1px] flex-grow bg-website-off-white" />
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
            :markdown-string="`## ${servicesData.pageTagline!}`"
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
                <div class="-mb-48 w-0.25 flex-grow bg-website-tertiary"></div>
            </div>
            <div class="mx-24 flex-1">
                <Markdown
                    :markdown-string="`### ${servicesData.problemOverview.problemOverview1}`"
                    component-class="no-default-format text-left text-lg lg:text-3xl subheading-font strong:font-semibold -ml-8"
                />
                <ul class="-ml-8 mt-8 list-none">
                    <li
                        v-for="(item, i) in servicesData.problemOverview
                            .problemItems1"
                        :key="`${i}-problemItems1-list-item`"
                        class="mb-8"
                    >
                        <div class="flex flex-row">
                            <XCircleIcon
                                class="mr-2 h-8 w-8 flex-shrink-0 text-website-primary"
                            />
                            <p class="flex-0">
                                {{ item.description }}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bg-website-secondary">
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
                                class="mr-2 h-8 w-8 flex-shrink-0 text-website-primary"
                            />
                            <p class="flex-0">
                                {{ item.description }}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </article>
    <article>
        <div>
            <Markdown
                :markdown-string="`## ${servicesData.solution.title}`"
                component-class="no-default-format text-center text-3xl lg:text-5xl heading-font strong:font-semibold pt-32 tracking-widest leading-normal lg:mx-auto mx-8"
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
                component-class="no-default-format text-center strong:font-semibold mx-auto max-w-4xl pb-32 lg:mx-auto mx-10"
            />
        </div>
        <div
            class="solution-background relative bg-website-tertiary pb-16 text-website-off-white"
        >
            <FileOrVideo
                parent-class="pointer-events-none z-0 cursor-default md:w-1/3 w-1/2 aspect-square absolute ml-auto z-0 opacity-10 lg:top-1/2 top-16 lg:-translate-y-1/2 left-full -translate-x-full"
                class="h-full object-cover object-center"
                :file="servicesData.solution.actionFile"
                sizes="2xl:800px xl:615px lg:512px 410px"
                :with-sound-control="false"
            />
            <div class="z-10 flex flex-row items-center pb-32 pl-12 pt-12">
                <Markdown
                    :markdown-string="`### ${servicesData.solution.action}`"
                    component-class="no-default-format text-left text-lg lg:text-2xl accent-font strong:font-semibold mr-8"
                />
                <div class="h-0.25 flex-1 bg-website-off-white" />
            </div>
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
                component-class="no-default-format text-center strong:font-semibold mx-auto pt-32 subheading-font lg:text-3xl text-xl"
            />
            <ul class="mx-auto w-3/4 list-none py-24 lg:w-1/2">
                <li
                    v-for="(item, i) in servicesData.solution.nextSteps"
                    :key="`${i}-next-steps-list-item`"
                    class="mb-4"
                >
                    <div class="flex flex-row items-center">
                        <XCircleIcon
                            class="mr-2 h-8 w-8 flex-shrink-0 text-website-primary"
                        />
                        <p class="flex-0">
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
        :overview="adventureContentPartnershipOverview"
        :overview-file="adventureContentPartnershipOverviewFile"
        :title="adventureContentPartnershipTitle"
        :title-background-image="
            adventureContentPartnershipTitleBackgroundImage
        "
        :description="adventureContentPartnershipDescription"
        :action-cta="adventureContentPartnershipActionCta"
        :steps-background-image="
            adventureContentPartnershipStepsBackgroundImage
        "
        :steps-title="adventureContentPartnershipStepsTitle"
        :steps="adventureContentPartnershipSteps"
        :accent-image="adventureContentPartnershipStepsAccentImage"
    />
</template>

<script setup lang="ts">
    import { XCircleIcon } from '@heroicons/vue/24/outline';
    import type { FileInfo } from '~/components/FileOrVideo.vue';

    const { data } = await useAsyncData('services', () =>
        queryContent('services').find()
    );

    const servicesData = data!.value![0]!;
    const title = servicesData.title!;
    const description = servicesData.description;

    const headingFile = servicesData.headingFile!;
    const problemFile = servicesData.problemFile!;

    const adventureContentPartnershipOverview = servicesData
        .adventureContentPartnership.overview! as string;
    const adventureContentPartnershipOverviewFile = servicesData
        .adventureContentPartnership.overviewFile! as FileInfo;
    const adventureContentPartnershipTitleBackgroundImage = servicesData
        .adventureContentPartnership.titleBackgroundImage! as FileInfo;
    const adventureContentPartnershipTitle = servicesData
        .adventureContentPartnership.title! as string;
    const adventureContentPartnershipDescription = servicesData
        .adventureContentPartnership.description! as string;
    const adventureContentPartnershipActionCta = servicesData
        .adventureContentPartnership.actionCta! as string;
    const adventureContentPartnershipStepsBackgroundImage = servicesData
        .adventureContentPartnership.stepsBackgroundImage! as FileInfo;
    const adventureContentPartnershipStepsTitle = servicesData
        .adventureContentPartnership.stepsTitle! as string;
    const adventureContentPartnershipSteps = servicesData
        .adventureContentPartnership.steps! as {
        title: string;
        description: string;
    }[];
    const adventureContentPartnershipStepsAccentImage = servicesData
        .adventureContentPartnership.stepsAccentImage! as FileInfo;
</script>
