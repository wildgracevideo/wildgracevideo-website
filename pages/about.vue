<template>
    <OgMeta :title="seoTitle" :description="seoDescription" />
    <SchemaOrgWebPage type="AboutPage" :name="seoTitle" />
    <Markdown
        :markdown-string="`# ${pageTitle}`"
        component-class="no-default-format md:mb-24 mb-12 text-2xl md:text-4xl mx-auto em:font-medium strong:font-semibold leading-14 tracking-tighter lg:mx-auto w-3/4 text-center"
    />
    <div class="bg-website-off-white relative z-10">
        <section
            id="meet-carly"
            class="mx-8 mb-20 grid grid-cols-1 gap-32 md:mx-16 md:grid-cols-2"
        >
            <FileOrVideo
                parent-class="md:mx-16 mx-0"
                class="aspect-photo w-[640px] object-cover object-center"
                :file="aboutMeFile"
                :is-lazy="true"
                sizes="640px"
            />
            <div
                class="mr-2 ml-2 flex flex-col justify-between md:mr-16 md:-ml-16"
            >
                <div>
                    <Markdown
                        :markdown-string="`## ${aboutMe.title!}`"
                        component-class="md:pt-16 pt-0 mb-8 w-fit text-left mr-auto no-default-format strong:font-semibold leading-14 tracking-tighter em:font-medium text-2xl md:text-4xl"
                    />
                    <Markdown :markdown-string="aboutMe.description" />
                </div>
                <div>
                    <button
                        class="border-website-primary bg-website-primary text-website-off-white hover:bg-website-off-white hover:text-website-primary mx-auto mt-2 block min-w-40 rounded-xl border-2 p-4 text-center text-xl md:mx-0"
                        @click="toGetStarted"
                    >
                        INQUIRE
                    </button>
                    <SocialMediaIcons
                        icon-fill="rgb(var(--color-website-primary))"
                        class="my-8 -ml-10 justify-start!"
                        :icon-size="80"
                    />
                </div>
            </div>
        </section>
        <section
            id="behind-the-scenes"
            class="bg-website-primary flex flex-row flex-wrap justify-center gap-x-12 gap-y-6 py-8"
        >
            <FileOrVideo
                v-for="asset in assets"
                :key="asset.seoTitle"
                :class="`h-[420px] grow object-cover ${
                    asset.isWide ? 'aspect-video' : 'aspect-photo'
                }`"
                :file="asset"
                :with-sound-control="true"
                :is-lazy="true"
                :sizes="`${asset.isWide ? '747px' : '336px'}`"
            />
        </section>
        <section id="hear-from-our-clients" class="overflow-hidden">
            <div class="bg-website-off-black w-dvw py-3 whitespace-nowrap">
                <div class="slider bg-website-off-black w-fit">
                    <div
                        v-for="i in Array(8).keys()"
                        :key="`${i}-container`"
                        class="text-website-off-white inline-block w-fit min-w-[100dvh] pr-2 text-sm tracking-tighter whitespace-nowrap md:pr-12 md:text-xl"
                    >
                        <span
                            v-for="(char, index) in `${testimonials.title}`"
                            :key="`${i}-${index}-${char}`"
                            :class="`inline-block ${
                                char === ' ' ? 'mx-2' : ''
                            }`"
                        >
                            {{ char }}
                        </span>
                    </div>
                </div>
            </div>
            <ImageGallery
                :items="
                    Array.from(testimonials.clientTestimonials).map((it) => {
                        return {
                            title: it.text,
                            description: it.author,
                            fileInfo: it.fileInfo,
                        };
                    })
                "
                :gallery-title-markdown="`## Client Testimonials`"
                class="w-full pb-16"
            />
        </section>
        <article
            class="bg-website-primary text-website-off-white px-8 pt-16 pb-32 lg:px-32"
        >
            <Markdown
                :markdown-string="`## ${faq.title!}`"
                component-class="no-default-format mx-auto mb-20 max-w-lg text-center text-4xl strong:font-semibold"
            />
            <AccordionItem
                v-for="faqItem in faq.questions"
                :key="`faq-${faqItem.question}`"
                :title-markdown="`### ${faqItem.question}`"
                class="border-website-off-white mb-10 w-full"
            >
                <Markdown
                    :markdown-string="faqItem.answer"
                    component-class="pb-5"
                />
            </AccordionItem>
        </article>
    </div>
</template>

<script setup lang="ts">
    import type { CmsAbout } from '~/types/cms';

    const { data } = await useAsyncData('about', () =>
        queryCollection('content').where('stem', '=', 'about/about').first()
    );

    const behindTheScenesData = data!.value!.meta as unknown as CmsAbout;
    const seoTitle = behindTheScenesData.title;
    const seoDescription = behindTheScenesData.description;

    const pageTitle = behindTheScenesData.pageTitle;

    const aboutMe = behindTheScenesData.aboutMe;
    const aboutMeFile = aboutMe.file;

    const assets = behindTheScenesData.assets;

    const testimonials = behindTheScenesData.testimonials;

    const faq = behindTheScenesData.faq;

    const router = useRouter();
    const toGetStarted = () => {
        router.push({ path: '/get-started' });
    };
</script>

<style scoped>
    .background-image {
        background-image: var(--bg-image);
    }

    #behind-the-scenes div {
        height: 420px;
    }

    @keyframes slide {
        to {
            transform: translateX(calc(-50%));
            -webkit-transform: translateX(calc(-50%));
            transform-style: preserve-3d;
            perspective: 0;
            -webkit-perspective: 0;
            -webkit-backface-visibility: hidden;
        }
    }

    .slider {
        animation: 35s slide infinite linear;
    }

    @media (min-width: 768px) {
        .slider {
            animation: 60s slide infinite linear;
        }
    }
</style>
