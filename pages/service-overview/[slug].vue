<template>
    <div />
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
    <h1 class="my-16 text-center text-4xl">{{ serviceData.pageTitle }}</h1>
    <section class="mb-20 grid grid-cols-1 md:grid-cols-2">
        <FileOrVideo
            class="pointer-events-none relative z-0 aspect-video h-full w-full cursor-default object-cover object-center"
            parent-class="p-4"
            :file="overviewFile"
            :is-lazy="true"
            sizes="lg:650px md:512px 380px"
            :with-sound-control="false"
        />
        <div class="py-4 pl-4 pr-8">
            <h2 class="mb-8 text-center text-xl">{{ overview.title }}</h2>
            <Markdown :markdown-string="overview.description" />
        </div>
    </section>
    <section class="mb-16 grid grid-cols-1 md:grid-cols-3">
        <FileOrVideo
            v-for="file in serviceData.files"
            :key="file.seoTitle"
            :file="file"
            :with-sound-control="false"
            sizes="lg:430px 340px"
            class="h-full w-full object-cover object-center p-4"
        />
    </section>
    <section
        v-for="callToAction in serviceData.callsToAction"
        :key="callToAction.title"
        class="mb-16 grid grid-cols-1 md:grid-cols-2"
    >
        <div class="py-4 pl-4 pr-8">
            <h2 class="mb-8 text-center text-xl">{{ callToAction.title }}</h2>
            <Markdown
                :markdown-string="callToAction.description"
                class="mb-8 ml-8"
            />
            <div class="justify-left ml-8 mt-8 flex flex-row gap-8 text-xl">
                <p class="mt-4">
                    {{ callToAction.callToActionText }}
                    <ArrowLongRightIcon class="inline h-10 w-10" />
                </p>
                <button
                    class="mt-2 h-14 w-40 rounded-xl border-2 border-website-primary bg-website-primary text-center text-xl text-website-off-white hover:bg-website-off-white hover:text-website-primary"
                >
                    {{ callToAction.callToActionButtonText }}
                </button>
            </div>
        </div>
        <FileOrVideo
            :class="`pointer-events-none relative z-0 max-h-[600px] w-full cursor-default object-cover object-center ${
                callToAction.isVertical ? 'aspect-photo' : 'aspect-video'
            }`"
            parent-class="p-4"
            :file="callToAction.fileInfo"
            :is-lazy="true"
            sizes="lg:650px md:512px 380px"
            :with-sound-control="false"
        />
    </section>
    <section class="mb-20 mt-16">
        <div class="grid grid-cols-1 justify-between md:grid-cols-3">
            <FileOrVideo
                v-for="socialMediaFile in serviceData.socialMediaFiles"
                :key="socialMediaFile.seoTitle"
                class="pointer-events-none relative z-0 aspect-photo h-full w-full cursor-default object-cover object-center"
                parent-class="p-4"
                :file="socialMediaFile"
                :is-lazy="true"
                sizes="lg:650px md:512px 380px"
                :with-sound-control="false"
            />
        </div>
    </section>
    <BackgroundImageLazy
        component="section"
        class="flex h-full min-h-14 w-full flex-row place-items-center items-center justify-center gap-x-10 bg-full px-8"
        :background-image="serviceData.testimonial.backgroundPhoto.image"
        :background-image-vertical="
            serviceData.testimonial.backgroundPhotoVertical.image
        "
    >
        <FileOrVideo
            v-for="file in serviceData.testimonial.testimonials!"
            :key="file.seoTitle"
            :file="file"
            :is-lazy="true"
            sizes="2xl:800px xl:460px 400px"
            class="mx-auto mb-4 mt-8 aspect-video bg-fixed lg:mx-0 lg:mt-0"
        />
    </BackgroundImageLazy>
</template>

<script lang="ts" setup>
    import { ArrowLongRightIcon } from '@heroicons/vue/20/solid';
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
</script>
