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
        class="w-full bg-website-off-black text-website-off-white"
    >
        <div class="mb-10 flex flex-row gap-10">
            <div class="min-w-[40%] text-center">
                <p class="mb-12 mt-16 tracking-tight">{{ stat.statPeriod }}</p>
                <p class="mb-6 text-5xl font-extralight tracking-tight">
                    {{ stat.stat }}
                </p>
                <p class="mb-32 tracking-tight">{{ stat.statClarifier }}</p>
                <p class="mb-4 ml-6 mr-2 text-left">
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
                        text-color-class="text-black"
                    />
                    <div
                        class="flex w-full flex-row justify-center gap-20 pb-8 text-center"
                    >
                        <div
                            v-for="(additionalStat, j) in stat.additionalStats"
                            :key="additionalStat.stat"
                        >
                            <p
                                :id="`${i}-${j}-additional-stat`"
                                class="mb-4 text-5xl tracking-tight"
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
        class="flex w-full flex-row items-center px-8 text-center text-lg"
    >
        <LazyVideo
            :video="video.videoInfo"
            class="text-white"
            sizes="lg:1300px md:1024px 768px"
            :full-screen-click="false"
        />
        <p>{{ video.videoDescription }}</p>
    </section>
    <section>
        <TestimonialCarousel :testimonials="testimonials.clientTestimonials" />
    </section>
    <section class="mb-16">
        <div class="h-[150px] animate-loop-scroll">
            <BTSMarquee />
        </div>
        <div
            class="mx-24 grid grid-cols-1 gap-20 sm:grid-cols-2 lg:grid-cols-3"
        >
            <FileOrVideo
                v-for="file in caseStudyData.bts.files"
                :key="file.seoTitle"
                class="aspect-photo-long h-full object-fill object-center"
                :file="file"
                :is-lazy="true"
                sizes="md:1000px 768px"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
    import { CountUp } from 'countup.js';
    import LazyVideo from '~/components/LazyVideo.vue';
    import { handleVideoControls } from '~/lib/handle-video-controls';

    const route = useRoute();
    let caseStudyData;
    try {
        const { data } = await useAsyncData('case-study', () =>
            queryContent('/case-study')
                .where({ path: route.params.slug })
                .findOne()
        );
        caseStudyData = data!.value!;
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

    console.log(caseStudyData.bts.files[0].file);

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
