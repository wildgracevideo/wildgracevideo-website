<template>
    <OgMeta :title="title" :description="description" :icon="ogImage" />
    <SchemaOrgWebPage
        :name="title"
        :description="description"
        in-language="en-US"
    />
    <section class="relative w-full max-w-full bg-fixed">
        <FileOrVideo
            parent-class="pointer-events-none relative z-0 w-full cursor-default"
            class="h-[400px] w-full object-cover object-center"
            :file="fileInfo"
            sizes="2xl:2000px xl:1536px lg:1280px md:1024px sm:768px 640px"
            :with-sound-control="false"
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
    <section class="grid grid-cols-1 lg:grid-cols-2">
        <FileOrVideo
            class="pointer-events-none relative z-0 aspect-video h-full w-full cursor-default object-cover object-center"
            parent-class="p-4"
            :file="overviewFile"
            :is-lazy="true"
            sizes="lg:650px md:512px 380px"
            :with-sound-control="false"
        />
        <div
            class="flex flex-col items-center justify-center py-4 pr-8 pl-4 text-left"
        >
            <h2 class="mb-8 text-center text-3xl">{{ overview.title }}</h2>
            <Markdown
                :markdown-string="overview.description"
                class="[&>p]:w-full"
            />
        </div>
    </section>
    <!-- delay-200 delay-400 delay-600 delay-800 delay-1000 delay-1200 -->
    <section class="my-32 grid grid-cols-1 lg:grid-cols-3">
        <FileOrVideo
            v-for="(file, i) in serviceData.files"
            :key="file.seoTitle"
            :file="file"
            :with-sound-control="false"
            sizes="lg:430px 340px"
            :parent-class="`service-overview-observable opacity-0 translate-y-1/2 delay-${
                i * 200
            }`"
            class="h-full w-full object-cover object-center p-0 py-0.5 lg:px-0.5 lg:py-0.5"
        />
    </section>
    <section
        v-for="(callToAction, index) in serviceData.callsToAction"
        :key="callToAction.title"
        class="service-overview-observable mb-32 grid grid-cols-1 opacity-0 lg:grid-cols-2"
        :class="{
            'translate-x-1/20': index % 2 == 0,
            '-translate-x-1/20': index % 2 != 0,
        }"
    >
        <!-- lg:order-1 lg:order-2 -->
        <div
            class="bg-website-primary text-website-off-white order-1 flex flex-col items-center justify-center"
            :class="{
                'lg:order-1': index % 2 === 0,
                'lg:ml-8': index % 2 === 0,
                'lg:order-2': index % 2 !== 0,
                'lg:mr-8': index % 2 !== 0,
                'lg:-ml-8': index % 2 !== 0,
                'z-10': index % 2 !== 0,
            }"
        >
            <h2
                class="mx-2 mb-8 pt-8 text-center text-lg lg:mx-2 lg:text-left lg:text-xl"
            >
                {{ callToAction.title }}
            </h2>
            <Markdown
                :markdown-string="callToAction.description"
                class="mx-16 mb-8 inline-block text-left [&>li]:break-all"
            />
            <div class="mt-8 ml-8 gap-8 pb-8 text-xl">
                <button
                    class="border-website-primary bg-website-primary text-website-off-white hover:bg-website-off-white hover:text-website-primary mt-2 min-w-40 rounded-xl border-2 p-4 text-center text-xl"
                    @click="toGetStarted"
                >
                    {{ callToAction.callToActionText }}
                </button>
            </div>
        </div>
        <FileOrVideo
            :class="`pointer-events-none relative z-0 max-h-[600px] w-full cursor-default object-cover object-center ${
                callToAction.isVertical ? 'aspect-vertical' : 'aspect-video'
            }`"
            :parent-class="`my-8 order-2 ml-0 mr-0 lg:order-${
                index % 2 === 0 ? 2 : 1
            } ${index % 2 === 0 ? 'lg:-ml-8 lg:mr-8' : 'lg:ml-8'}`"
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
        />
    </section>

    <section class="my-32">
        <div class="grid grid-cols-1 justify-between lg:grid-cols-3">
            <div
                v-for="socialMediaFile in serviceData.socialMediaFiles"
                :key="socialMediaFile.seoTitle"
            >
                <FileOrVideo
                    class="aspect-photo pointer-events-none relative z-0 h-full w-full cursor-default object-cover object-center"
                    parent-class="lg:px-0.5 lg:py-0.5 p-0 py-0.5"
                    :file="socialMediaFile"
                    :is-lazy="true"
                    sizes="lg:650px md:512px 380px"
                    :with-sound-control="false"
                />
                <div
                    v-if="socialMediaFile.file.endsWith('mpd')"
                    class="relative bottom-44 -mb-44 flex flex-col items-end gap-6 pr-8"
                >
                    <HeartIcon class="text-website-off-white h-8 w-8" />
                    <ChatBubbleOvalLeftIcon
                        class="text-website-off-white h-8 w-8"
                    />
                    <PaperAirplaneIcon class="text-website-off-white h-8 w-8" />
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
    import type { CmsServiceLandingPage } from '~~/shared/types/cms';

    const route = useRoute();
    const { data } = await useAsyncData('about', () =>
        queryCollection('content')
            .where('stem', '=', `service-landing-page/${route.params.slug}`)
            .first()
    );
    const serviceData = data?.value?.meta as unknown as CmsServiceLandingPage;
    if (!serviceData) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Page Not Found',
        });
    }

    const title = serviceData.title;
    const description = serviceData.description;
    const ogImage = serviceData.ogImage;
    const fileInfo = serviceData.fileInfo;

    const overview = serviceData.overview;
    const overviewFile = overview.fileInfo;

    const testimonials = serviceData.testimonials;

    const router = useRouter();

    const toGetStarted = () => {
        router.push({ path: '/get-started' });
    };

    onMounted(async () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
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
