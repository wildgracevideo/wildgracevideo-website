<template>
    <OgMeta :title="seoTitle" :description="seoDescription" />
    <SchemaOrgWebPage type="AboutPage" :name="seoTitle" />
    <Markdown
        :markdown-string="`# ${pageTitle}`"
        component-class="no-default-format mt-6 md:mt-12 md:mb-24 mb-12 text-2xl md:text-4xl mx-auto em:font-medium strong:font-semibold leading-14 tracking-tighter lg:mx-auto w-3/4 text-center"
    />
    <div class="relative z-10 bg-website-off-white">
        <section
            id="meet-carly"
            class="mx-8 mb-20 grid grid-cols-1 gap-32 md:mx-16 md:grid-cols-2"
        >
            <FileOrVideo
                parent-class="mx-16"
                class="aspect-photo w-[640px] object-cover object-center"
                :file="aboutMeFile"
                :is-lazy="true"
                sizes="640px"
            />
            <div class="-ml-16 mr-16 flex flex-col justify-between">
                <div>
                    <Markdown
                        :markdown-string="`## ${aboutMe.title!}`"
                        component-class="pt-16 mb-8 w-fit text-left mr-auto no-default-format strong:font-semibold leading-14 tracking-tighter em:font-medium text-2xl md:text-4xl"
                    />
                    <Markdown :markdown-string="aboutMe.description" />
                </div>
                <div>
                    <button
                        class="mt-2 min-w-40 rounded-xl border-2 border-website-primary bg-website-primary p-4 text-center text-xl text-website-off-white hover:bg-website-off-white hover:text-website-primary"
                    >
                        INQUIRE
                    </button>
                    <SocialMediaIcons
                        icon-fill="rgb(var(--color-website-primary))"
                        class="my-8 -ml-10 !justify-start"
                        :icon-size="80"
                    />
                </div>
            </div>
        </section>
        <article class="bg-website-accent px-8 pb-32 pt-16 lg:px-32">
            <Markdown
                :markdown-string="`## ${faq.title!}`"
                component-class="no-default-format mx-auto mb-20 max-w-lg text-center text-4xl strong:font-semibold"
            />
            <div class="grid grid-cols-1 md:grid-cols-2">
                <div
                    v-for="faqItem in faq.questions"
                    :key="`faq-${faqItem.question}`"
                    class="p-8"
                >
                    <Markdown
                        :markdown-string="`### ${faqItem.question}`"
                        component-class="no-default-format strong:font-semibold mb-4"
                    />
                    <Markdown
                        :markdown-string="faqItem.answer"
                        component-class="mb-10 text-sm"
                    />
                </div>
            </div>
        </article>
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
                class="slider w-fit whitespace-nowrap bg-website-off-black py-3"
            >
                <div
                    v-for="i in Array(8).keys()"
                    :key="`${i}-container`"
                    class="inline-block w-fit min-w-[100dvh] whitespace-nowrap pr-2 text-sm tracking-tighter text-website-accent md:pr-12 md:text-xl"
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
    const { data } = await useAsyncData('about', () =>
        queryContent('about').find()
    );

    const behindTheScenesData = data!.value![0]!;
    const seoTitle = behindTheScenesData.title;
    const seoDescription = behindTheScenesData.description;

    const pageTitle = behindTheScenesData.pageTitle;

    const aboutMe = behindTheScenesData.aboutMe;
    const aboutMeFile = aboutMe.file;

    const assets = behindTheScenesData.assets;

    const testimonials = behindTheScenesData.testimonials;

    const faq = behindTheScenesData.faq;

    onMounted(() => {
        addEventListener('scroll', () => {
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

    @keyframes slide {
        to {
            transform: translateX(calc(-50%));
        }
    }

    .slider {
        animation: 60s slide infinite linear;
    }
</style>
