<template>
    <OgMeta
        :title="seoTitle"
        :description="seoDescription"
        :icon="caseStudyData.webpagePreviewFile"
    />
    <SchemaOrgWebPage :name="seoTitle" />
    <h1 class="mx-auto mt-8 text-center text-4xl">{{ pageTitle }}</h1>
    <h2 class="mx-auto my-8 w-[60%] text-center">{{ pageSubtitle }}</h2>
    <div class="mx-auto mb-12 w-[80%]">
        <AutoPlayVideo
            :title="overviewVideo.seoTitle"
            :description="overviewVideo.seoDescription"
            :thumbnail-image="overviewVideo.thumbnailImage"
            :publication-date="overviewVideo.publicationDate"
            :video="overviewVideo.video"
            :with-sound-control="true"
            video-id="overview-video"
            class="mb-4 h-full w-full object-cover object-center"
            sound-control-bottom-class="bottom-14 md:bottom-16"
        />
    </div>
    <section
        v-for="(stat, i) in stats"
        :key="stat.stat"
        class="bg-website-off-black text-website-off-white w-full"
    >
        <div class="mb-10 grid grid-cols-1 gap-10 md:grid-cols-2">
            <div class="min-w-[40%] text-center">
                <p class="mt-16 mb-12 tracking-tight">{{ stat.statPeriod }}</p>
                <p
                    class="paragraph-font mb-6 text-4xl font-extralight tracking-tight"
                >
                    {{ stat.stat }}
                </p>
                <p class="mb-4 tracking-tight md:mb-32">
                    {{ stat.statClarifier }}
                </p>
                <p class="mr-4 mb-4 ml-16 text-left">
                    {{ stat.statDescription }}
                </p>
            </div>
            <div>
                <div class="mx-auto mb-4 w-[80%] pt-16">
                    <AutoPlayVideo
                        :title="stat.videoInfo.seoTitle"
                        :description="stat.videoInfo.seoDescription"
                        :thumbnail-image="stat.videoInfo.thumbnailImage"
                        :publication-date="stat.videoInfo.publicationDate"
                        :video="stat.videoInfo.video"
                        :with-sound-control="true"
                        video-id="overview-video"
                        class="mb-4 h-full w-full object-cover object-center"
                        sound-control-bottom-class="bottom-14 md:bottom-16"
                        text-color-class="text-website-off-black"
                    />
                    <div
                        class="flex w-full flex-row justify-center gap-20 pb-8 text-center"
                    >
                        <div
                            v-for="(additionalStat, j) in stat.additionalStats"
                            :key="additionalStat.stat"
                            class="mb:h-5rem h-4rem min-w-30 md:min-w-52"
                        >
                            <p
                                :id="`${i}-${j}-additional-stat`"
                                class="paragraph-font mb-4 text-2xl tracking-tight md:text-4xl"
                            >
                                {{ additionalStat.stat }}
                            </p>
                            <p class="tracking-tight">
                                {{ additionalStat.statDescription }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section
        v-for="(video, i) in caseStudyData.videos"
        :key="`${i}-bts-video`"
        class="grid w-full grid-cols-1 items-center px-8 text-center text-lg md:grid-cols-2"
    >
        <ImagePreviewLazyVideo
            :video="video.videoInfo"
            class="text-website-off-white"
            sizes="lg:1300px md:1024px 768px"
            :full-screen-click="false"
        />
        <p class="mx-8 mt-4 md:mt-0">{{ video.videoDescription }}</p>
    </section>
    <section>
        <TestimonialCarousel :testimonials="testimonials.clientTestimonials" />
    </section>
    <section class="mb-16">
        <div class="animate-loop-scroll h-[150px]">
            <BTSMarquee />
        </div>
        <div
            class="mx-4 grid grid-cols-1 gap-20 sm:grid-cols-2 md:mx-24 lg:grid-cols-3"
        >
            <FileOrVideo
                v-for="file in caseStudyData.bts.files"
                :key="file.seoTitle"
                class="aspect-photo-long h-full w-full object-fill object-center"
                :file="file"
                :is-lazy="true"
                sizes="md:1000px 768px"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
    import { CountUp } from 'countup.js';
    import { handleVideoControls } from '~/lib/handle-video-controls';
    import type { CmsCaseStudy } from '~/types/cms';

    const route = useRoute();
    let caseStudyData;
    try {
        const { data } = await useAsyncData('case-study', () => {
            return queryCollection('content')
                .where('stem', '=', `case-study/${route.params.slug}`)
                .first();
        });
        caseStudyData = data!.value!.meta as unknown as CmsCaseStudy;
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
    const stats = caseStudyData.stats;

    const testimonials = caseStudyData.testimonials;

    onMounted(() => {
        const videoElement = document.getElementById(
            'overview-video'
        ) as HTMLVideoElement;

        stats.forEach((stat, i) => {
            stat.additionalStats.forEach((additionalStat, j) => {
                const statNumString = additionalStat.stat.replaceAll(',', '');
                let suffix = '';
                if (statNumString.includes('+')) {
                    suffix = '+';
                } else if (statNumString.includes('%')) {
                    suffix = '%';
                }
                const num = parseInt(
                    statNumString.replaceAll('+', '').replaceAll('%', ''),
                    10
                );
                new CountUp(`${i}-${j}-additional-stat`, num, {
                    suffix,
                    enableScrollSpy: true,
                    scrollSpyOnce: true,
                });
            });
        });
        handleVideoControls(videoElement);
    });
</script>
