<template>
    <OgMeta :title="title" :description="description" />

    <!-- TODO: :primary-image-of-page="aboutMeImageName" -->
    <SchemaOrgWebPage
        :name="title"
        :description="description"
        in-language="en-US"
        date-published="2024-02-07T21:19:07+0000"
    />
    <!-- TODO: Better thumbnail image -->
    <SchemaOrgVideo
        :name="reelVideo.seoTitle"
        url="https://content.wildgracevideo.com/wgv-reel-h264.mp4"
        content-url="https://content.wildgracevideo.com/wgv-reel-h264.mp4"
        upload-date="2023-09-25T22:13:39.520Z"
        :description="reelVideo.seoDescription"
        :thumbnail-url="reelVideo.thumbnailImage"
    />
    <video
        id="reel-video"
        class="pointer-events-none aspect-video w-full max-w-full cursor-default bg-fixed"
        autoplay
        muted
        loop
        disablePictureInPicture
        playsinline
        :title="reelVideo.seoTitle"
    ></video>
    <Markdown
        :markdown-string="`# ${pageTitle}`"
        component-class="no-default-format mt-32 mb-16 text-4xl md:text-5xl mx-8 em:font-medium strong:font-bold leading-14 tracking-tighter lg:mx-auto w-3/4 text-center"
    />
    <Markdown
        :markdown-string="pageTagline"
        component-class="mx-8 mb-32 max-w-6xl text-center lg:mx-auto"
    />
    <TestimonialScroll :testimonial-quotes="homeData!.testimonialQuotes" />
    <Markdown
        :markdown-string="`## ${videoHighlight.title!}`"
        component-class="my-24 max-w-3xl w-fit mx-8 md:mx-auto text-center no-default-format strong:font-bold leading-14 tracking-tighter em:font-medium text-4xl md:text-5xl"
    />
    <section class="mx-16 grid grid-cols-1 gap-x-10 lg:grid-cols-3">
        <div
            v-for="video in videoHighlightVideos"
            :key="`home-highlight-video-${video.title}`"
        >
            <SchemaOrgVideo
                :name="video.seoTitle"
                :url="video.video"
                :content-url="video.video"
                :upload-date="video.publicationDate"
                :description="video.seoDescription"
                :thumbnail-url="video.thumbnailImage"
            />
            <video
                class="pointer-events-none mb-4 mt-8 aspect-video cursor-default bg-fixed lg:mt-0"
                autoplay
                muted
                loop
                disablePictureInPicture
                playsinline
                :title="video.seoTitle"
            >
                <source :src="video.video" type="video/mp4" />
            </video>
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
        component-class="no-default-format strong:font-bold mb-12 ml-8 mt-20 text-4xl md:text-5xl lg:ml-16"
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
                    component-class="no-default-format strong:font-bold mb-6 ml-12 text-4xl lg:ml-32"
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
    <section
        class="parallax-background mb-32 grid w-full grid-cols-1 items-center justify-center gap-x-10 px-8 md:grid-cols-3"
        :style="{
            '--parallax-background-image': `url(${testimonials.backgroundImage})`,
        }"
    >
        <FileOrVideo
            v-for="file in testimonials.files!"
            :key="file.file"
            :file="file.file"
            :seo-description="file.seoDescription"
            :seo-title="file.seoTitle"
            :thumbnail-image="file.thumbnailImage"
            :publication-date="file.publicationDate"
            class="mx-auto mb-4 mt-8 aspect-video bg-fixed lg:mx-0 lg:mt-0"
        />
    </section>
    <article class="mx-8 mb-32 lg:mx-32">
        <Markdown
            :markdown-string="`## ${faq.title!}`"
            component-class="no-default-format mx-auto mb-20 mt-32 max-w-lg text-center text-4xl strong:font-bold"
        />
        <template
            v-for="faqItem in faq.questions"
            :key="`faq-${faqItem.question}`"
        >
            <Markdown
                :markdown-string="`### ${faqItem.question}`"
                component-class="no-default-format strong:font-bold mb-4"
            />
            <Markdown
                :markdown-string="faqItem.answer"
                component-class="mb-10"
            />
        </template>
    </article>
</template>

<script setup lang="ts">
    import type { FileConfig } from '~/components/FileOrVideo.vue';

    const { data } = await useAsyncData('home', () =>
        queryContent('home').find()
    );

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

    onMounted(async () => {
        const videoElement = document.getElementById(
            'reel-video'
        ) as HTMLVideoElement;

        const { $stream } = useNuxtApp();
        const cloudfrontUrl = useRuntimeConfig().public.cloudfrontUrl;

        const addSourceToVideo = (element: HTMLVideoElement, src: string) => {
            const source = document.createElement('source');
            source.src = src;
            element.appendChild(source);
        };

        const mpegDashManifestUri = `wgv-reel-264_dash.mpd`;

        if ('safari' in window) {
            const hlsManifestUri = `${cloudfrontUrl}/wgv-reel-hls/wgv-reel.m3u8`;
            addSourceToVideo(videoElement, hlsManifestUri);
        } else {
            try {
                await $stream(
                    videoElement,
                    mpegDashManifestUri,
                    'wgv-reel-mpeg-dash'
                );
            } catch (error) {
                console.log(error);
                const fallbackManifestUri = `${cloudfrontUrl}/wgv-reel-h264.mp4`;
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

<style scoped>
    .parallax-background {
        background-image: var(--parallax-background-image);
        background-attachment: fixed;
        background-size: 100%;
        min-height: 56rem;
        height: 100%;
    }
</style>
