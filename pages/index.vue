<template>
    <OgMeta :title="title" :description="description" />

    <SchemaOrgWebPage
        :name="title"
        :description="description"
        in-language="en-US"
        date-published="2024-02-28T22:13:39.520Z"
    />
    <SchemaOrgVideo
        :name="reelVideo.seoTitle"
        url="https://content.wildgracevideo.com/wgv-reel-2024-h264.mp4"
        content-url="https://content.wildgracevideo.com/wgv-reel-2024-h264.mp4"
        upload-date="2024-02-28T22:13:39.520Z"
        :description="reelVideo.seoDescription"
        :thumbnail="{
            url: reelVideo.thumbnailImage,
            contentUrl: reelVideo.thumbnailImage,
        }"
    />
    <section class="relative aspect-video w-full max-w-full bg-fixed">
        <video
            id="reel-video"
            class="pointer-events-none relative z-0 h-full w-full cursor-default"
            autoplay
            muted
            loop
            disablePictureInPicture
            playsinline
            :title="reelVideo.seoTitle"
        ></video>
        <button
            class="absolute bottom-6 right-8 z-10 h-10 w-10 cursor-pointer text-white md:bottom-10 md:h-12 md:w-12"
            @click="toggleMute"
        >
            <span class="sr-only">{{
                reelMuted ? 'Unmute Video Reel Audio' : 'Mute Video Reel Audio'
            }}</span>
            <SpeakerXMarkIcon v-if="reelMuted" />
            <SpeakerWaveIcon v-else />
        </button>
    </section>
    <Markdown
        :markdown-string="`# ${pageTitle}`"
        component-class="no-default-format mt-32 mb-16 text-4xl md:text-5xl mx-8 em:font-medium strong:font-semibold leading-14 tracking-tighter lg:mx-auto w-3/4 text-center"
    />
    <Markdown
        :markdown-string="pageTagline"
        component-class="mx-8 mb-32 max-w-6xl text-center lg:mx-auto"
    />
    <TestimonialScroll :testimonial-quotes="homeData!.testimonialQuotes" />
    <Markdown
        :markdown-string="`## ${videoHighlight.title!}`"
        component-class="my-24 max-w-3xl w-fit mx-8 md:mx-auto text-center no-default-format strong:font-semibold leading-14 tracking-tighter em:font-medium text-4xl md:text-5xl"
    />
    <section class="mx-16 grid grid-cols-1 gap-x-10 lg:grid-cols-3">
        <div
            v-for="video in videoHighlightVideos"
            :key="`home-highlight-video-${video.title}`"
        >
            <AutoPlayVideo
                class="pointer-events-none mb-4 mt-8 aspect-video cursor-default bg-fixed lg:mt-0"
                :title="video.seoTitle"
                :description="video.seoDescription"
                :video="video.video"
                :thumbnail-image="video.thumbnailImage"
                :publication-date="video.publicationDate"
                :video-id="`home-highlight-video-element-${video.title}`"
            />
            <h3 class="mb-12 text-center text-2xl">
                {{ video.title }}
            </h3>
            <p class="text-center">
                {{ video.description }}
            </p>
        </div>
    </section>
    <HomePageAbout
        class="mb-36 mt-32 md:mt-48"
        :text-markdown="aboutMeDescriptionMarkdown"
        :title-markdown="aboutMeTitleMarkdown"
        :file-config="aboutMeFile"
    />
    <Markdown
        component-class="no-default-format strong:font-semibold mb-12 ml-8 mt-20 text-4xl md:text-5xl lg:ml-16"
        :markdown-string="`## ${homeData!.trustedBrandTitle}`"
    />
    <LogoSlider class="mb-32" :logos="trustedBrandLogos" />
    <article class="bg-website-accent">
        <div class="w-4/5 pb-16">
            <SchemaOrgHowTo
                :name="howTo.seoTitle"
                :step="howToSteps"
                in-language="en-US"
            />
            <Markdown
                :markdown-string="`## ${howTo.title!}`"
                component-class="no-default-format mb-12 ml-8 pt-24 text-4xl md:text-5xl lg:ml-24"
            />
            <div
                v-for="(step, index) in howTo.steps"
                :key="`step-${step.title}`"
                class="pb-16"
            >
                <Markdown
                    :id="`step-${index + 1}`"
                    :markdown-string="`### ${step.title}`"
                    component-class="no-default-format strong:font-semibold mb-6 ml-12 text-4xl lg:ml-32"
                />
                <Markdown
                    :markdown-string="step.description"
                    component-class="ml-16 lg:ml-36"
                />
            </div>
            <Markdown
                v-if="howTo.footer"
                :markdown-string="howTo.footer!"
                component-class="-mt-8 ml-16 lg:ml-36"
            />
        </div>
    </article>
    <BackgroundImageLazy
        component="section"
        class="mb-32 grid h-full min-h-14 w-full grid-cols-1 items-center justify-center gap-x-10 bg-full px-8 lg:grid-cols-3"
        :background-image="testimonials.backgroundImage"
        :background-image-vertical="testimonials.backgroundImageVertical"
    >
        <FileOrVideo
            v-for="file in testimonials.files!"
            :key="file.file"
            :file="file"
            :is-lazy="true"
            sizes="2xl:800px xl:460px 400px"
            class="mx-auto mb-4 mt-8 aspect-video bg-fixed lg:mx-0 lg:mt-0"
        />
    </BackgroundImageLazy>
    <article class="mx-8 mb-32 lg:mx-32">
        <Markdown
            :markdown-string="`## ${faq.title!}`"
            component-class="no-default-format mx-auto mb-20 mt-32 max-w-lg text-center text-4xl strong:font-semibold"
        />
        <template
            v-for="faqItem in faq.questions"
            :key="`faq-${faqItem.question}`"
        >
            <Markdown
                :markdown-string="`### ${faqItem.question}`"
                component-class="no-default-format strong:font-semibold mb-4"
            />
            <Markdown
                :markdown-string="faqItem.answer"
                component-class="mb-10"
            />
        </template>
    </article>
</template>

<script setup lang="ts">
    import {
        SpeakerWaveIcon,
        SpeakerXMarkIcon,
    } from '@heroicons/vue/24/outline';
    import type { FileConfig } from '~/components/FileOrVideo.vue';

    const { data } = await useAsyncData('home', () =>
        queryContent('home').find()
    );

    const reelMuted = ref(true);

    let toggleMute = () => {};

    const homeData = data!.value![0]!;
    const title = homeData.title!;
    const description = homeData.description;
    const pageTitle = homeData.pageTitle!;
    const pageTagline = homeData.pageTagline!;
    const reelVideo = homeData.reelVideo!;

    const aboutMeTitleMarkdown = homeData.aboutMe.title!;
    const aboutMeDescriptionMarkdown = homeData.aboutMe.description!;
    const aboutMeFile = homeData.aboutMe.file! as FileConfig;

    const trustedBrandLogos = homeData.trustedBrandLogos!;
    const videoHighlight = homeData.videoHighlight!;
    const videoHighlightVideos = videoHighlight.videos!;

    const howTo = homeData.howTo!;

    const faq = homeData.faq!;

    const testimonials = homeData.testimonials!;

    const howToSteps = howTo.steps.map(
        (it: { title: string; description: string }, i: number) => {
            return {
                url: `#step-${i}`,
                text: it.description,
                name: it.title,
            };
        }
    );

    howToSteps.push({
        text: howTo.footer,
    });

    const runtimeConfig = useRuntimeConfig();
    onMounted(async () => {
        const videoElement = document.getElementById(
            'reel-video'
        ) as HTMLVideoElement;

        toggleMute = () => {
            reelMuted.value = !reelMuted.value;
            videoElement.muted = reelMuted.value;
        };

        const { $stream } = useNuxtApp();
        const cloudfrontUrl = runtimeConfig.public.cloudfrontUrl;

        const addSourceToVideo = (element: HTMLVideoElement, src: string) => {
            const source = document.createElement('source');
            source.src = src;
            element.appendChild(source);
        };

        const reelVideoConfig = runtimeConfig.public.reelVideo;

        if ('safari' in window) {
            const hlsManifestUri = `${cloudfrontUrl}${reelVideoConfig.hlsUri}`;
            addSourceToVideo(videoElement, hlsManifestUri);
        } else {
            try {
                await $stream(
                    videoElement,
                    reelVideoConfig.mpegDashManifestFileName,
                    reelVideoConfig.mpegDashFolder
                );
            } catch (error) {
                console.log(error);
                const fallbackManifestUri = `${cloudfrontUrl}${reelVideoConfig.mp4Uri}`;
                addSourceToVideo(videoElement, fallbackManifestUri);
            }
        }

        // Safari won't play videos on low-power mode
        videoElement
            .play()
            .then(() => {})
            .catch(() => {
                window.document
                    .querySelectorAll('video')
                    .forEach((it: HTMLVideoElement) => {
                        it.setAttribute('controls', 'controls');
                        it.classList.remove('pointer-events-none');
                    });
            });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (
                    entry.isIntersecting &&
                    entry.target.classList.contains('fade-out')
                ) {
                    entry.target.classList.remove('fade-out');
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        });

        const animatableElements = document.querySelectorAll(
            '.home-scroll-observable'
        );
        animatableElements.forEach((element) => observer.observe(element));
    });
</script>
