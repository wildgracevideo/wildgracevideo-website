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
                parent-class="md:mx-16 mx-0"
                class="aspect-photo w-[640px] object-cover object-center"
                :file="aboutMeFile"
                :is-lazy="true"
                sizes="640px"
            />
            <div
                class="ml-2 mr-2 flex flex-col justify-between md:-ml-16 md:mr-16"
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
                        class="mx-auto mt-2 block min-w-40 rounded-xl border-2 border-website-primary bg-website-primary p-4 text-center text-xl text-website-off-white hover:bg-website-off-white hover:text-website-primary md:mx-0"
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
        <article class="bg-website-accent px-8 pb-32 pt-16 lg:px-32">
            <Markdown
                :markdown-string="`## ${faq.title!}`"
                component-class="no-default-format mx-auto mb-20 max-w-lg text-center text-4xl strong:font-semibold"
            />
            <AccordionItem
                v-for="faqItem in faq.questions"
                :key="`faq-${faqItem.question}`"
                :title-markdown="`### ${faqItem.question}`"
                :content-markdown="faqItem.answer"
                class="mb-10 w-full border-slate-400"
            />
        </article>
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
    console.log(testimonials.clientTestimonials);

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
