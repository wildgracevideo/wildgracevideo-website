<template>
    <OgMeta :title="pageTitle" :description="description" />
    <SchemaOrgWebPage :name="pageTitle" />
    <h1 class="mb-8 text-center text-4xl">{{ heading }}</h1>
    <div
        v-if="!hideAllVideos"
        class="mx-0 mb-16 mt-16 grid grid-cols-1 gap-8 sm:mx-8 xl:grid-cols-2"
    >
        <section v-for="item in videos" :key="item.id" class="w-full">
            <LazyVideo :video="item.videoInfo" :video-title="item.title" />
        </section>
    </div>
</template>

<script setup lang="ts">
    import LazyVideo from '~/components/LazyVideo.vue';
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

    const hideAllVideos = ref(false);

    defineProps<Portfolio>();

    onMounted(() => {
        window.addEventListener('fullscreenchange', (event: Event | null) => {
            if (event) {
                hideAllVidoes.value = true;
            } else {
                hideAllVidoes.value = false;
            }
        });
    });
</script>
