<template>
    <OgMeta :title="pageTitle" :description="description" />
    <SchemaOrgWebPage :name="pageTitle" />
    <h1 class="mb-8 text-center text-4xl">{{ heading }}</h1>
    <div
        class="mx-0 mb-16 mt-16 grid grid-cols-1 gap-1.5 sm:mx-8 xl:grid-cols-2"
    >
        <section v-for="item in videos" :key="item.id" class="w-full">
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
                    class="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 text-center font-bold text-white opacity-100 group-hover:opacity-0"
                    >{{ item.title }}</span
                >
                <NuxtImg
                    :src="item.videoInfo.thumbnailImage"
                    :alt="item.videoInfo.seoDescription"
                    class="h-full w-full brightness-60 duration-300 ease-linear hover:brightness-100"
                    sizes="lg:1300px md:1024 sm:768px xs:640px 320px"
                />
            </div>
            <ImagePreviewLazyVideo
                v-else
                :video="item.videoInfo"
                :video-title="item.title"
                sizes="lg:1300px md:1024 sm:768px xs:640px 320px"
            />
        </section>
    </div>
</template>

<script setup lang="ts">
    import type { VideoInfo } from '~/lib/video';

    export interface Portfolio {
        pageTitle: string;
        description: string;
        heading: string;
        videos: {
            videoInfo: VideoInfo;
            videoTitle: string;
        }[];
    }

    defineProps<Portfolio>();

    const imageClick = async (path) => {
        await navigateTo({ path });
    };
</script>
