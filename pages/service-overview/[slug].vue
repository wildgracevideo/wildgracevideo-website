<template>
    <OgMeta :title="title" :description="description" :icon="ogImage" />
    <SchemaOrgWebPage
        :name="title"
        :description="description"
        in-language="en-US"
    />
    <section class="relative w-full max-w-full bg-fixed">
        <AutoPlayStreamVideo
            video-id="reel-video"
            class="pointer-events-none relative z-0 h-[400px] w-full cursor-default object-cover object-center"
            :title="videoInfo.seoTitle"
            :description="videoInfo.seoDescription"
            :video="videoInfo.video"
            :with-sound-control="false"
            :thumbnail-image="videoInfo.thumbnailImage"
            :publication-date="videoInfo.publicationDate"
        />
    </section>
    <section class="my-32">
        <Markdown
            :markdown-string="`# ${serviceData.pageTitle}`"
            class="no-default-format mx-auto mb-8 max-w-[80%] text-center text-4xl"
        />
        <Markdown
            :markdown-string="serviceData.pageDescription"
            class="mx-auto max-w-5xl px-4 text-center"
        />
    </section>
    <section class="grid grid-cols-1 md:grid-cols-2">
        <FileOrVideo
            class="pointer-events-none relative z-0 aspect-video h-full w-full cursor-default object-cover object-center"
            parent-class="p-4"
            :file="overviewFile"
            :is-lazy="true"
            sizes="lg:650px md:512px 380px"
            :with-sound-control="false"
        />
        <div
            class="flex flex-col items-center justify-center py-4 pl-4 pr-8 text-left"
        >
            <h2 class="mb-8 text-center text-3xl">{{ overview.title }}</h2>
            <Markdown
                :markdown-string="overview.description"
                class="[&>p]:w-full"
            />
        </div>
    </section>
    <!-- delay-200 delay-400 delay-600 delay-800 delay-1000 delay-1200 -->
    <section class="my-32 grid grid-cols-1 md:grid-cols-3">
        <FileOrVideo
            v-for="(file, i) in serviceData.files"
            :key="file.seoTitle"
            :file="file"
            :with-sound-control="false"
            sizes="lg:430px 340px"
            :parent-class="`service-overview-observable opacity-0 translate-y-1/2 delay-${
                i * 200
            }`"
            class="h-full w-full object-cover object-center p-4"
        />
    </section>
    <section
        v-for="(callToAction, index) in serviceData.callsToAction"
        :key="callToAction.title"
        class="service-overview-observable mb-32 grid grid-cols-1 opacity-0 md:grid-cols-2"
        :class="{
            'translate-x-1/20': index % 2 == 0,
            '-translate-x-1/20': index % 2 != 0,
        }"
    >
        <!-- md:order-1 md:order-2 -->
        <div
            class="order-1 flex flex-col items-center justify-center bg-website-accent"
            :class="{
                'md:order-1': index % 2 === 0,
                'md:ml-8': index % 2 === 0,
                'md:order-2': index % 2 !== 0,
                'md:mr-8': index % 2 !== 0,
                'md:-ml-8': index % 2 !== 0,
                'z-10': index % 2 !== 0,
            }"
        >
            <h2 class="mb-8 pt-8 text-left text-xl">
                {{ callToAction.title }}
            </h2>
            <Markdown
                :markdown-string="callToAction.description"
                class="mx-16 mb-8 inline-block text-left [&>li]:break-all"
            />
            <div class="ml-8 mt-8 gap-8 pb-8 text-xl">
                <button
                    class="mt-2 min-w-40 rounded-xl border-2 border-website-primary bg-website-primary p-4 text-center text-xl text-website-off-white hover:bg-website-off-white hover:text-website-primary"
                >
                    {{ callToAction.callToActionText }}
                </button>
            </div>
        </div>
        <FileOrVideo
            :class="`pointer-events-none relative z-0 max-h-[600px] w-full cursor-default object-cover object-center ${
                callToAction.isVertical ? 'aspect-vertical' : 'aspect-video'
            }`"
            :parent-class="`my-8 order-2 md:order-${
                index % 2 === 0 ? 2 : 1
            } bg-website-accent ${index % 2 === 0 ? '-ml-8 mr-8' : 'ml-8'}`"
            :file="callToAction.fileInfo"
            :is-lazy="true"
            sizes="lg:650px md:512px 380px"
            :with-sound-control="false"
        />
    </section>
    <section>
        <TestimonialCarousel
            v-if="testimonials"
            :testimonials="testimonials.clientTestimonials"
            class="bg-website-off-black text-website-accent"
        />
    </section>

    <section class="my-32">
        <div class="grid grid-cols-1 justify-between md:grid-cols-3">
            <div
                v-for="socialMediaFile in serviceData.socialMediaFiles"
                :key="socialMediaFile.seoTitle"
            >
                <FileOrVideo
                    class="pointer-events-none relative z-0 aspect-photo h-full w-full cursor-default object-cover object-center"
                    parent-class="p-4"
                    :file="socialMediaFile"
                    :is-lazy="true"
                    sizes="lg:650px md:512px 380px"
                    :with-sound-control="false"
                />
                <div
                    class="relative bottom-44 -mb-44 flex flex-col items-end gap-6 pr-8"
                >
                    <HeartIcon class="h-8 w-8 text-white" />
                    <ChatBubbleOvalLeftIcon class="h-8 w-8 text-white" />
                    <PaperAirplaneIcon class="h-8 w-8 text-white" />
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
    import {
        ChatBubbleOvalLeftIcon,
        HeartIcon,
        PaperAirplaneIcon,
    } from '@heroicons/vue/24/outline';
    import type { FileConfig } from '~/components/FileOrVideo.vue';

    const route = useRoute();
    const { data } = await useAsyncData('serviceLandingPage', () =>
        queryContent('/service-landing-page')
            .where({ path: route.params.slug })
            .findOne()
    );

    const serviceData = data!.value!;
    const title = serviceData.title!;
    const description = serviceData.description!;
    const ogImage = serviceData.ogImage!;
    const videoInfo = serviceData.videoInfo!;

    const overview = serviceData.overview!;
    const overviewFile = overview.fileInfo! as FileConfig;

    const testimonials = serviceData.testimonials;

    onMounted(async () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log('intersecting...');
                    const delayClass = Array.from(
                        entry.target.classList
                    ).filter((it) => {
                        return it.startsWith('delay');
                    });
                    entry.target.classList.remove('opacity-0');
                    if (entry.target.classList.contains('translate-y-1/2')) {
                        entry.target.classList.remove('translate-y-1/2');
                        entry.target.classList.add('animate-slide-up');
                    }
                    if (entry.target.classList.contains('translate-x-1/20')) {
                        entry.target.classList.remove('translate-x-1/20');
                        entry.target.classList.add('animate-slide-left');
                    }
                    if (entry.target.classList.contains('-translate-x-1/20')) {
                        entry.target.classList.remove('-translate-x-1/20');
                        entry.target.classList.add('animate-slide-right');
                    }
                    if (delayClass) {
                        entry.target.classList.add(
                            'animation-' + delayClass[0]
                        );
                    }
                    observer.unobserve(entry.target);
                }
            });
        });

        const animatableElements = document.querySelectorAll(
            '.service-overview-observable'
        );
        animatableElements.forEach((element) => observer.observe(element));
    });
</script>
