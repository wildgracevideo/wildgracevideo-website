<template>
    <OgMeta :title="title" :description="description" />

    <SchemaOrgWebPage
        :name="title"
        :description="description"
        in-language="en-US"
        date-published="2024-02-28T22:13:39.520Z"
    />
    <section class="relative mx-auto aspect-video w-[95%] bg-fixed md:w-4/5">
        <AutoPlayStreamVideo
            video-id="reel-video"
            class="pointer-events-none relative z-0 h-full w-full cursor-default rounded-3xl"
            :title="reelVideo.seoTitle"
            :description="reelVideo.seoDescription"
            :video="reelVideo.video"
            :with-sound-control="true"
            :thumbnail-image="reelVideo.thumbnailImage"
            :publication-date="reelVideo.publicationDate"
        />
    </section>
    <section class="my-16 flex flex-col gap-16 md:my-32 md:grid md:grid-cols-5">
        <div class="col-span-3 mx-8">
            <Markdown
                :markdown-string="`# ${pageTitle}`"
                component-class="no-default-format heading-font text-4xl md:text-5xl md:text-left text-center mb-8 md:mx-16 mx-4"
            />
            <Markdown
                :markdown-string="pageTagline"
                component-class="mb-16 max-w-6xl md:text-left text-center md:mx-16 mx-4"
            />
            <DefaultButton
                title="Visit Portfolio"
                to="portfolio"
                class="mx-auto md:mx-16"
            />
        </div>
        <FileOrVideo
            parent-class="pointer-events-none relative z-0 cursor-default mx-auto col-span-2"
            class="aspect-photo border-website-secondary mx-auto w-4/5 border-2 object-cover object-bottom md:mx-0"
            :file="visitPortfolioFile"
            sizes="2xl:800px xl:615px lg:512px 410px"
            :with-sound-control="false"
        />
    </section>
    <Markdown
        component-class="no-default-format accent-font mb-12 md:ml-8 md:mr-0 ml-auto mr-auto md:text-left text-center mt-20 text-4xl md:text-5xl lg:ml-16"
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
    <section
        class="bg-website-primary text-website-off-white relative mb-12 py-12 lg:mb-24 lg:py-24"
    >
        <Markdown
            :markdown-string="`## ${adventureContentTitle}`"
            component-class="px-4 heading-font no-default-format text-3xl heading-font text-center lg:hidden block mb-8"
        />
        <div class="flex flex-col justify-center lg:flex-row lg:justify-normal">
            <FileOrVideo
                parent-class="pointer-events-none lg:mx-16 mx-auto shrink-0 lg:w-1/3 w-2/3 lg:mb-0 mb-16 aspect-photo-long"
                class="h-full w-full object-cover object-center"
                :file="adventureContentFileInfo"
                sizes="2xl:800px xl:615px lg:512px 410px"
                :with-sound-control="false"
            />
            <FileOrVideo
                parent-class="pointer-events-none h-36 w-36 aspect-square top-16 lg:static absolute left-[80%] lg:-translate-y-[30%] translate-y-[30%] -ml-32 mr-16 translate-x-0 lg:-translate-x-1/2"
                class="mx-16 h-full w-full object-cover object-center"
                :file="adventureContentAccentFile"
                sizes="138px"
                :with-sound-control="false"
            />
            <div
                class="bg-website-accent relative z-10 -mt-24 hidden h-dvh w-0.25 lg:block"
            ></div>
            <div
                class="flex shrink flex-col items-center justify-center gap-16"
            >
                <Markdown
                    :markdown-string="`## ${adventureContentTitle}`"
                    component-class="lg:text-5xl lg:px-16 px-4 heading-font no-default-format text-3xl heading-font lg:text-left text-center lg:block hidden"
                />
                <Markdown
                    :markdown-string="adventureContentDescription"
                    component-class="px-16"
                />
                <DefaultButton
                    :title="adventureContentCallToAction"
                    to="/services"
                    class="mx-auto"
                    :light="true"
                />
            </div>
        </div>
    </section>
    <section>
        <div class="mb-8 flex w-full flex-row items-center lg:mb-24">
            <div class="bg-website-off-black h-[1px] grow" />
            <Markdown
                :markdown-string="`## ${videoHighlight.title!}`"
                component-class="max-w-3xl w-fit px-8 md:mx-auto accent-font no-default-format text-3xl md:text-4xl lg:text-left text-center"
            />
        </div>
        <div class="mx-16 grid grid-cols-1 gap-x-10 lg:grid-cols-3">
            <div
                v-for="(video, i) in videoHighlightVideos"
                :key="`home-highlight-video-${video.title}`"
                :class="`home-scroll-observable delay-${
                    i * 200
                } translate-y-1/2 opacity-0`"
            >
                <NuxtLink :to="video.linkPath">
                    <AutoPlayVideo
                        class="mt-8 mb-4 aspect-video cursor-pointer bg-fixed transition-transform duration-700 ease-in-out hover:scale-105 lg:mt-0"
                        :title="video.seoTitle"
                        :description="video.seoDescription"
                        :video="video.video"
                        :thumbnail-image="video.thumbnailImage"
                        :publication-date="video.publicationDate"
                        :video-id="`home-highlight-video-element-${video.title}`"
                        @click="() => {}"
                    />
                    <h3 class="subheading-font mb-12 text-center text-2xl">
                        {{ video.title }}
                    </h3>
                </NuxtLink>
                <p class="text-center">
                    {{ video.description }}
                </p>
            </div>
        </div>
    </section>
    <section
        class="bg-website-tertiary text-website-off-white mt-32 flex flex-col items-center justify-normal px-16 py-20 lg:flex-row lg:justify-between lg:px-32"
    >
        <div class="flex h-full flex-row items-stretch">
            <h2
                class="heading-font lg:writing-vertical mb-16 text-6xl tracking-widest lg:mb-0 lg:-rotate-180 lg:text-9xl"
            >
                {{ freebie.title }}
            </h2>
            <div
                class="bg-website-accent ml-2 hidden w-0.25 basis-full md:block"
            />
        </div>
        <FileOrVideo
            parent-class="pointer-events-none relative z-0 cursor-default"
            class="aspect-photo mx-auto mb-16 object-cover object-bottom md:mx-0"
            :file="freebie.file"
            sizes="64px"
            :with-sound-control="false"
        />
        <div class="flex max-w-3xl flex-col gap-16 text-center">
            <h3 class="subheading-font text-3xl lg:text-5xl">
                {{ freebie.subheading }}
            </h3>
            <p>
                {{ freebie.description }}
            </p>
            <DefaultButton
                :title="freebie.ctaText"
                :light="true"
                :action="
                    async () => {
                        showFreebieModal = true;
                    }
                "
                class="mx-auto"
            />
        </div>
    </section>
    <HomePageAbout
        class="mt-16 mb-36 lg:mt-48"
        :text-markdown="aboutMeDescriptionMarkdown"
        :title-markdown="aboutMeTitleMarkdown"
        :file-config="aboutMeFile"
        :about-me-cta="aboutMeCtaText"
        :stamp="aboutMeStamp"
    />
    <article class="bg-website-tertiary text-website-off-white">
        <ImageGallery
            :items="howTo.steps"
            :gallery-title-markdown="`## ${howTo.title!}`"
            class="w-full"
            cta-text="Contact"
            cta-link="/get-started"
        />
    </article>
    <CaseStudies
        :case-studies="caseStudies"
        class="bg-website-primary text-website-off-white p-16"
    />
    <article class="mx-8 mb-32 lg:mx-32">
        <Markdown
            :markdown-string="`## ${faq.title!}`"
            component-class="no-default-format heading-font md:mx-auto mx-8 mb-20 mt-32 text-center text-4xl strong:font-semibold"
        />
        <AccordionItem
            v-for="faqItem in faq.questions"
            :key="`faq-${faqItem.question}`"
            :title-markdown="`### ${faqItem.question}`"
            class="mb-10 w-full"
        >
            <Markdown
                :markdown-string="faqItem.answer"
                component-class="pb-5"
            />
        </AccordionItem>
    </article>

    <FreebieModal
        v-model="selectedFreebieModel"
        :modal-title="`Get your ${selectedFreebieModel.freebieName}`"
        :show-modal="showFreebieModal"
        @dismiss="showFreebieModal = false"
    />
</template>

<script setup lang="ts">
    import type { CmsHome } from '~~/shared/types/cms';

    const { data } = await useAsyncData('home', () => {
        return queryCollection('content')
            .where('stem', '=', 'home/home')
            .first();
    });

    const homeData = data!.value!.meta as unknown as CmsHome;
    const title = homeData.title;
    const pageTagline = homeData.pageTagline;
    const description = homeData.description;
    const pageTitle = homeData.pageTitle;
    const visitPortfolioFile = homeData.visitPortfolioFile;
    const reelVideo = homeData.reelVideo;

    const freebie = homeData.freebie;

    const caseStudies = homeData.caseStudies;

    const aboutMeTitleMarkdown = homeData.aboutMe.title;
    const aboutMeDescriptionMarkdown = homeData.aboutMe.description;
    const aboutMeFile = homeData.aboutMe.file;
    const aboutMeCtaText = homeData.aboutMe.ctaText;
    const aboutMeStamp = homeData.aboutMe.stamp;

    const trustedBrandLogos = homeData.trustedBrandLogos;
    const videoHighlight = homeData.videoHighlight;
    const videoHighlightVideos = videoHighlight.videos;

    const adventureContentTitle = homeData.adventureContentPartnership.title;
    const adventureContentDescription =
        homeData.adventureContentPartnership.description;
    const adventureContentCallToAction =
        homeData.adventureContentPartnership.callToAction;
    const adventureContentFileInfo =
        homeData.adventureContentPartnership.fileInfo;
    const adventureContentAccentFile =
        homeData.adventureContentPartnership.accentFile;

    const howTo = homeData.howTo;

    const faq = homeData.faq;

    const showFreebieModal = ref(false);

    const selectedFreebieModel = ref({
        freebieName: freebie.name,
        fileName: freebie.fileName,
        fileURL: freebie.fileURL,
    });

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
