<template>
    <OgMeta :title="seoTitle" :description="seoDescription" />
    <SchemaOrgWebPage type="AboutPage" :name="seoTitle" />
    <section
        class="relative flex h-[calc(100dvh-116.45px)] flex-col justify-between"
    >
        <div
            class="backface-visibility-hidden xs:h-[50%] fixed mx-auto h-[40%] w-full md:h-[65%]"
        >
            <AutoPlayVideo
                :title="bannerVideo.seoTitle"
                :description="bannerVideo.seoDescription"
                :thumbnail-image="bannerVideo.thumbnailImage"
                :publication-date="bannerVideo.publicationDate"
                :video="bannerVideo.video"
                :with-sound-control="true"
                video-id="reel-video"
                class="h-full w-full object-cover object-center"
                sound-control-bottom-class="bottom-14 md:bottom-16"
            />
        </div>
        <div
            class="sm:top-[calc(100dvh-116.45px) absolute left-1/2 top-[calc(100dvh-100px)] z-10 w-full -translate-x-1/2 -translate-y-full bg-website-off-white"
        >
            <Markdown
                :markdown-string="`# ${pageTitle}`"
                component-class="no-default-format md:mb-8 mb-4 pt-4 md:pt-8 text-2xl md:text-4xl mx-auto em:font-medium strong:font-semibold leading-14 tracking-tighter lg:mx-auto w-3/4 text-center"
            />
        </div>
    </section>
    <div class="relative z-10 bg-website-off-white">
        <section
            id="meet-carly"
            class="mx-8 mb-20 grid grid-cols-1 gap-32 md:mx-16 md:grid-cols-2"
        >
            <div>
                <Markdown
                    :markdown-string="`## ${aboutMe.title!}`"
                    component-class="pt-8 mb-8 w-fit text-left mr-auto no-default-format strong:font-semibold leading-14 tracking-tighter em:font-medium text-2xl md:text-4xl"
                />
                <Markdown :markdown-string="aboutMe.description" />
            </div>
            <div>
                <FileOrVideo
                    class="aspect-photo w-[640px] object-cover object-center"
                    :file="aboutMeFile"
                    :is-lazy="true"
                    sizes="640px"
                />
                <h3
                    ref="moreInfoTitle"
                    class="more-info-title font-family-rock-salt relative mb-4 mt-8 w-fit text-xl"
                >
                    {{ aboutMe.moreInfoTitle }}
                </h3>
                <Markdown
                    :markdown-string="aboutMe.moreInfo"
                    component-class="[&_>ul]:pl-10"
                />
            </div>
        </section>
        <section id="what-we-do" class="bg-website-accent">
            <h2
                class="font-family-rock-salt pb-16 pt-12 text-center text-2xl tracking-tighter text-website-off-black md:text-4xl"
            >
                What We Do
            </h2>
            <!-- order-1 order-2 order-3 order-4 order-5 order-6 order-7 order-8 order-9 order-10 order-11 order-12 -->
            <!-- md:order-1 md:order-2 md:order-3 md:order-4 md:order-5 md:order-6 md:order-7 md:order-8 md:order-9 md:order-10 md:order-11 md:order-12 -->
            <div class="grid grid-cols-1 bg-website-accent md:grid-cols-2">
                <Markdown
                    v-for="(whatWeDoItem, i) in whatWeDo"
                    :key="`markdown-${i}`"
                    :markdown-string="whatWeDoItem.text"
                    :component-class="`mx-auto h-[450px] max-w-[60%] pt-24 text-center text-lg md:text-xl text-website-off-black tracking-tighter font-thin [&_li]:!list-none [&_li]:before:content-['+'] [&_li]:before:mr-2 what-we-do-markdown ${getWhatWeDoMarkdownOrderClass(
                        i,
                        false
                    )}`"
                />
                <div
                    v-for="(whatWeDoItem, i) in whatWeDo"
                    :key="`file-${i}`"
                    :class="`${getWhatWeDoMarkdownOrderClass(
                        i,
                        true
                    )} background-image h-[450px] bg-full bg-center bg-no-repeat md:bg-fixed`"
                    :style="{
                        '--bg-image': `url(${whatWeDoItem.file.file})`,
                    }"
                />
            </div>
        </section>

        <section
            id="behind-the-scenes"
            class="flex flex-row flex-wrap justify-center gap-x-12 gap-y-6 bg-website-accent py-8"
        >
            <FileOrVideo
                v-for="asset in assets"
                :key="asset.seoTitle"
                :class="`h-[420px] flex-grow object-cover ${
                    asset.isWide ? 'aspect-video' : 'aspect-photo'
                }`"
                :file="asset"
                :with-sound-control="true"
                :is-lazy="true"
                :sizes="`${asset.isWide ? '747px' : '336px'}`"
            />
        </section>
        <section id="hear-from-our-clients" class="overflow-hidden">
            <div
                class="slider w-fit whitespace-nowrap bg-website-off-black py-12"
            >
                <div
                    v-for="i in Array(8).keys()"
                    :key="`${i}-container`"
                    class="inline-block w-fit min-w-[100dvh] whitespace-nowrap pr-2 text-xl font-bold text-website-accent md:pr-12 md:text-4xl"
                >
                    <span
                        v-for="char in `${testimonials.title}`"
                        :key="`${i}-${index}-${char}`"
                        :class="`inline-block ${char === ' ' ? 'mx-2' : ''}`"
                    >
                        {{ char }}
                    </span>
                </div>
            </div>
            <TestimonialCarousel
                :testimonials="testimonials.clientTestimonials"
            />
        </section>
    </div>
</template>

<script setup lang="ts">
    import { handleVideoControls } from '~/lib/handle-video-controls';
    const { data } = await useAsyncData('about', () =>
        queryContent('about').find()
    );

    const behindTheScenesData = data!.value![0]!;
    const seoTitle = behindTheScenesData.title;
    const seoDescription = behindTheScenesData.description;

    const bannerVideo = behindTheScenesData.bannerVideo;

    const whatWeDo = behindTheScenesData.whatWeDo;

    const pageTitle = behindTheScenesData.pageTitle;

    const aboutMe = behindTheScenesData.aboutMe;
    const aboutMeFile = aboutMe.file;

    const assets = behindTheScenesData.assets;

    const testimonials = behindTheScenesData.testimonials;

    const moreInfoTitle = ref(null);

    function getWhatWeDoMarkdownOrderClass(
        index: number,
        isFile: boolean
    ): string {
        const markdownOrders = [1, 4, 5, 8, 9, 12];
        const fileOrders = [2, 3, 6, 7, 10, 11];
        const markdownOrdersSmall = [1, 3, 5, 7, 9, 11];
        const fileOrdersSmall = [2, 4, 6, 8, 10, 12];

        let largeIndex = markdownOrders[index];
        let smallIndex = markdownOrdersSmall[index];
        if (isFile) {
            largeIndex = fileOrders[index];
            smallIndex = fileOrdersSmall[index];
        }

        return `order-${smallIndex} md:order-${largeIndex}`;
    }

    onMounted(() => {
        const videoElement = document.getElementById(
            'reel-video'
        ) as HTMLVideoElement;
        handleVideoControls(videoElement);

        addEventListener('scroll', () => {
            const moreInfoRect = moreInfoTitle.value.getBoundingClientRect();
            if (
                moreInfoRect.top >= 0 &&
                moreInfoRect.bottom <= document.documentElement.clientHeight
            ) {
                const underlineWidth = Math.min(
                    Math.floor(
                        ((document.documentElement.clientHeight -
                            moreInfoRect.top) /
                            document.documentElement.clientHeight) *
                            200
                    ),
                    100
                );
                moreInfoTitle.value.style.setProperty(
                    '--more-info-title-width',
                    `${underlineWidth}%`
                );
            }

            if (window.scrollY > window.innerHeight) {
                videoElement.classList.add('invisible');
            } else {
                videoElement.classList.remove('invisible');
            }
        });
    });
</script>

<style scoped>
    .background-image {
        background-image: var(--bg-image);
    }

    #behind-the-scenes div {
        height: 420px;
    }

    .more-info-title {
        --more-info-title-width: 0%;
    }

    .more-info-title::after {
        width: var(--more-info-title-width);
        content: '';
        position: absolute;
        bottom: -0.75rem;
        left: 0;
        height: 0.5rem;
        border-top: solid 3px rgb(var(--color-website-accent) / 1);
        border-radius: 75%;
        height: 0.5rem;
    }

    @keyframes slide {
        to {
            transform: translateX(calc(-50%));
        }
    }

    .slider {
        animation: 60s slide infinite linear;
    }

    .backface-visibility-hidden {
        backface-visibility: hidden;
    }
</style>
