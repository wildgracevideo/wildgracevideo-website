<template>
    <OgMeta :title="title" :description="description" />

    <SchemaOrgWebPage
        :name="title"
        :description="description"
        in-language="en-US"
        date-published="2024-02-28T22:13:39.520Z"
    />
    <section class="relative aspect-video w-full max-w-full bg-fixed">
        <AutoPlayStreamVideo
            video-id="reel-video"
            class="pointer-events-none relative z-0 h-full w-full cursor-default"
            :title="reelVideo.seoTitle"
            :description="reelVideo.seoDescription"
            :video="reelVideo.video"
            :with-sound-control="true"
            :thumbnail-image="reelVideo.thumbnailImage"
            :publication-date="reelVideo.publicationDate"
        />
    </section>
    <Markdown
        :markdown-string="`# ${pageTitle}`"
        component-class="no-default-format mt-32 mb-16 text-4xl md:text-5xl em:font-medium strong:font-semibold leading-14 tracking-tighter mx-auto w-3/4 text-center"
    />
    <Markdown
        :markdown-string="pageTagline"
        component-class="mb-32 max-w-6xl text-center md:mx-auto mx-4"
    />
    <section>
        <Markdown
            :markdown-string="`## ${videoHighlight.title!}`"
            component-class="my-24 max-w-3xl w-fit mx-8 md:mx-auto text-center no-default-format strong:font-semibold leading-14 tracking-tighter em:font-medium text-3xl md:text-4xl"
        />
        <div class="mx-16 grid grid-cols-1 gap-x-10 lg:grid-cols-3">
            <div
                v-for="(video, i) in videoHighlightVideos"
                :key="`home-highlight-video-${video.title}`"
                :class="`home-scroll-observable delay-${
                    i * 200
                } translate-y-1/2 opacity-0 `"
            >
                <NuxtLink :to="video.linkPath">
                    <AutoPlayVideo
                        class="transition-transform mb-4 mt-8 aspect-video cursor-pointer bg-fixed duration-700 ease-in-out hover:scale-105 lg:mt-0"
                        :title="video.seoTitle"
                        :description="video.seoDescription"
                        :video="video.video"
                        :thumbnail-image="video.thumbnailImage"
                        :publication-date="video.publicationDate"
                        :video-id="`home-highlight-video-element-${video.title}`"
                        @click="() => {}"
                    />
                    <h3
                        class="mb-12 text-center text-2xl underline decoration-1"
                    >
                        {{ video.title }}
                    </h3>
                </NuxtLink>
                <p class="text-center">
                    {{ video.description }}
                </p>
            </div>
        </div>
    </section>
    <HomePageAbout
        class="mb-36 mt-32 md:mt-48"
        :text-markdown="aboutMeDescriptionMarkdown"
        :title-markdown="aboutMeTitleMarkdown"
        :file-config="aboutMeFile"
    />
    <Markdown
        component-class="no-default-format strong:font-semibold mb-12 md:ml-8 md:mr-0 ml-auto mr-auto md:text-left text-center mt-20 text-4xl md:text-5xl lg:ml-16"
        :markdown-string="`## ${homeData!.trustedBrandTitle}`"
    />
    <LogoSlider class="mb-32 hidden md:block" :logos="trustedBrandLogos" />
    <div class="mx-8 mb-32 grid grid-cols-2 gap-12 md:hidden">
        <div
            v-for="(logo, index) in trustedBrandLogos"
            :key="`${index % trustedBrandLogos.length}-logo-${
                logo.companyName
            }`"
            :class="`flex items-center justify-center ${
                index == trustedBrandLogos.length - 1 ? 'col-span-2' : ''
            }`"
        >
            <object
                v-if="logo.image.endsWith('.svg')"
                :data="logo.image"
                type="image/svg+xml"
                :aria-label="logo.altText"
                class="logo-aspect-ratio mx-auto my-0 block max-h-full p-2"
                :style="{
                    width: '40dvw',
                }"
            ></object>
            <NuxtImg
                v-else
                :src="logo.image"
                :alt="logo.altText"
                class="logo-aspect-ratio mx-auto my-0 block max-h-full p-2"
                :sizes="`${logo.width}px`"
                :style="{
                    width: `40dvw`,
                }"
            />
        </div>
    </div>
    <article class="bg-website-accent">
        <ImageGallery
            :items="howTo.steps"
            :gallery-title-markdown="`## ${howTo.title!}`"
            class="w-full pb-16"
            cta-text="View Portfolio"
            cta-link="/portfolio"
        />
    </article>
    <article class="mx-8 mb-32 lg:mx-32">
        <Markdown
            :markdown-string="`## ${faq.title!}`"
            component-class="no-default-format mx-auto mb-20 mt-32 max-w-lg text-center text-4xl strong:font-semibold"
        />
        <AccordionItem
            v-for="faqItem in faq.questions"
            :key="`faq-${faqItem.question}`"
            :title-markdown="`### ${faqItem.question}`"
            :content-markdown="faqItem.answer"
            class="mb-10 w-full"
        />
    </article>
    <BackgroundImageLazy
        component="section"
        class="grid h-full min-h-14 w-full grid-cols-1 items-center justify-center gap-x-10 bg-full px-8 lg:grid-cols-3"
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

    onMounted(async () => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (
                        entry.isIntersecting &&
                        entry.target.classList.contains('translate-y-1/2')
                    ) {
                        const delayClass = Array.from(
                            entry.target.classList
                        ).filter((it) => {
                            return it.startsWith('delay');
                        });
                        entry.target.classList.remove('opacity-0');
                        entry.target.classList.remove('translate-y-1/2');
                        entry.target.classList.add('animate-slide-up');
                        if (delayClass) {
                            entry.target.classList.add(
                                'animation-' + delayClass[0]
                            );
                        }
                        observer.unobserve(entry.target);
                    }
                });
            },
            { rootMargin: '0px 0px 300px 0px' }
        );

        const animatableElements = document.querySelectorAll(
            '.home-scroll-observable'
        );
        animatableElements.forEach((element) => observer.observe(element));
    });
</script>
