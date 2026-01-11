<template>
    <OgMeta :title="pageTitle" :description="description" />
    <SchemaOrgWebPage :name="pageTitle" />
    <h1 class="heading-font mb-8 text-center text-4xl">{{ heading }}</h1>
    <div
        class="subheading-font mx-0 mt-16 mb-16 grid grid-cols-1 gap-1.5 sm:mx-8 xl:grid-cols-2"
    >
        <section
            v-for="(item, index) in videos"
            :key="`portfolio-page-video-${index}`"
            class="w-full"
        >
            <div
                v-if="item.pagePath"
                class="group relative h-full cursor-pointer"
                tabindex="0"
                role="button"
                @keypress="imageClick(item.pagePath)"
                @click="imageClick(item.pagePath)"
            >
                <span
                    v-if="item.title"
                    class="text-website-off-white absolute top-1/2 left-1/2 z-10 -translate-x-1/2 text-center font-bold opacity-100 group-hover:opacity-0"
                    >{{ item.title }}</span
                >
                <NuxtImg
                    v-if="item.videoInfo"
                    :src="item.videoInfo.thumbnailImage"
                    :alt="item.videoInfo.seoDescription"
                    class="aspect-video h-full w-full object-cover object-center brightness-50 duration-300 ease-linear hover:brightness-100"
                    sizes="lg:1300px md:1024 sm:768px xs:640px 320px"
                />
            </div>
            <ImagePreviewLazyVideo
                v-else-if="item.videoInfo"
                :video="item.videoInfo"
                :video-title="item.title"
                sizes="lg:1300px md:1024 sm:768px xs:640px 320px"
            />
        </section>
    </div>
</template>

<script setup lang="ts">
    export interface Portfolio {
        pageTitle: string;
        description: string;
        heading: string;
        videos: {
            videoInfo?: VideoInfo | null;
            title: string;
            pagePath?: string | null;
        }[];
    }

    defineProps<Portfolio>();

    const imageClick = async (path: string) => {
        await navigateTo({ path });
    };
</script>
