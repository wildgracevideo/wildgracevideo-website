<template>
    <OgMeta
        :title="seoTitle"
        :description="seoDescription"
        :icon="caseStudyData.webpagePreviewFile"
    />
    <SchemaOrgWebPage :name="seoTitle" />
    <section class="bg-website-tertiary text-website-off-white -mt-10 pb-12">
        <h1
            class="heading-font mx-auto pt-24 text-center text-4xl underline decoration-[0.75px] underline-offset-[3rem] md:text-6xl"
        >
            {{ pageTitle }}
        </h1>
        <h2 class="mx-auto my-24 w-[60%] text-center">{{ pageSubtitle }}</h2>
        <div class="mx-auto mb-12 w-[70%]">
            <AutoPlayStreamVideo
                :title="overviewVideo.seoTitle"
                :description="overviewVideo.seoDescription"
                :thumbnail-image="overviewVideo.thumbnailImage"
                :publication-date="overviewVideo.publicationDate"
                :video="overviewVideo.video"
                :with-sound-control="false"
                :show-controls="true"
                video-id="overview-video"
                class="mb-12 h-full w-full object-cover object-center"
                sound-control-bottom-class="bottom-20 md:bottom-24"
            />
        </div>
        <div
            class="grid w-full grid-cols-2 flex-wrap gap-2 px-2 pb-8 md:grid-cols-3"
        >
            <FileOrVideo
                v-for="file in caseStudyData.btsFiles"
                :key="file.seoTitle"
                parent-class="pointer-events-none relative z-0 cursor-default h-64"
                class="h-full w-full object-cover object-center"
                :file="file"
                sizes="2xl:800px xl:615px lg:512px 410px"
                :with-sound-control="false"
            />
        </div>
    </section>
    <section
        class="text-website-off-black bg-website-off-white grid grid-cols-1 md:grid-cols-2"
    >
        <div>
            <div
                v-for="item in problemProcessResults"
                :key="item.title"
                class="mx-auto mt-24 text-center"
            >
                <h3 class="heading-font mb-16 text-2xl">{{ item.title }}</h3>
                <p class="mx-auto w-3/4">{{ item.description }}</p>
            </div>
            <DefaultButton
                title="BOOK A CALL"
                class="mx-auto my-12 md:my-24"
                to="/get-started"
            />
        </div>
        <div class="flex flex-col gap-32 py-32">
            <FileOrVideo
                v-for="file in caseStudyData.problemProcessResultSection.files"
                :key="file.seoTitle"
                :parent-class="`pointer-events-none relative z-0 cursor-default mx-auto ${
                    file.isVertical
                        ? 'aspect-photo w-1/2'
                        : 'aspect-video w-3/4'
                }`"
                class="h-full w-full object-cover object-center"
                :file="file"
                sizes="2xl:800px xl:615px lg:512px 410px"
                :with-sound-control="false"
            />
        </div>
    </section>
    <TestimonialOverview
        v-if="
            caseStudyData.testimonialSection &&
            caseStudyData.testimonialSection.length > 0
        "
        :testimonial="caseStudyData.testimonialSection[0]!"
        class="w-full"
    />
    <section
        v-if="btsVideo"
        class="bg-website-primary text-website-off-white pb-12 md:pb-24"
    >
        <MarkdownHeaderWithLine
            :header-markdown="`### behind the scenes`"
            class="pt-12 pb-32 pl-12"
        />
        <div class="mx-auto mb-12 w-[70%]">
            <FileOrVideo
                :file="btsVideo"
                :with-sound-control="true"
                video-id="bts-video"
                class="h-full w-full object-cover object-center"
                sound-control-bottom-class="bottom-20 md:bottom-24"
            />
        </div>
        <div class="flex w-full flex-row justify-center">
            <DefaultButton
                title="BACK TO PORTFOLIO"
                to="/portfolio"
                :light="true"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
    import { handleVideoControls } from '~~/shared/lib/handle-video-controls';
    import type { CmsCaseStudy2 } from '~~/shared/types/cms';

    const route = useRoute();
    let caseStudyData;
    try {
        const { data } = await useAsyncData('case-study-2', () => {
            return queryCollection('content')
                .where('stem', '=', `case-study-2/${route.params.slug}`)
                .first();
        });
        caseStudyData = data!.value!.meta as unknown as CmsCaseStudy2;
        if (!caseStudyData) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Page Not Found',
            });
        }
    } catch (e) {
        console.error(e);
        throw createError({
            statusCode: 404,
            statusMessage: 'Page Not Found',
        });
    }

    const seoTitle = caseStudyData.seoTitle;
    const seoDescription = caseStudyData.seoDescription;
    const pageTitle = caseStudyData.pageTitle;
    const pageSubtitle = caseStudyData.pageSubtitle;
    const overviewVideo = caseStudyData.overviewVideo;

    const btsVideo =
        caseStudyData.btsVideo && caseStudyData.btsVideo.length > 0
            ? caseStudyData.btsVideo[0]
            : null;

    const problemProcessResults = [
        {
            title: 'Problem',
            description: caseStudyData.problemProcessResultSection.problemText,
        },
        {
            title: 'Process',
            description: caseStudyData.problemProcessResultSection.processText,
        },
        {
            title: 'Result',
            description: caseStudyData.problemProcessResultSection.resultText,
        },
    ];

    onMounted(() => {
        const videoElement = document.getElementById(
            'overview-video'
        ) as HTMLVideoElement;

        handleVideoControls(videoElement);
    });
</script>
