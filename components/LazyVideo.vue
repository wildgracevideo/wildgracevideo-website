<template>
    <div
        v-if="!videoPlaying"
        class="group relative cursor-pointer"
        tabindex="0"
        role="button"
        @keypress="videoClick"
        @click="videoClick"
    >
        <span
            class="play-button absolute z-10 text-sm font-bold text-white opacity-100 group-hover:opacity-0"
            >{{ videoTitle }}</span
        >
        <img
            :src="video.thumbnailImage"
            :alt="video.seoDescription"
            class="aspect-video w-full brightness-50 duration-300 ease-linear hover:brightness-100"
        />
    </div>
    <video
        v-else
        ref="videoElement"
        class="aspect-video w-full cursor-pointer"
        loop
        playsinline
        controls
        autoplay
        :title="video.seoTitle"
    >
        <SchemaOrgVideo
            :name="video.seoTitle"
            :url="video.video"
            :content-url="video.video"
            :upload-date="video.publicationDate"
            :description="video.seoDescription"
            :thumbnail="{
                url: video.thumbnailImage,
                contentUrl: video.thumbnailImage,
            }"
        />
        <source :src="video.video" type="video/mp4" />
    </video>
</template>

<script setup lang="ts">
    import type { VideoInfo } from '~/lib/video';

    defineProps<{
        video: VideoInfo;
        videoTitle: string;
        videoClass?: string;
        imageClass?: string;
    }>();

    const videoPlaying = ref(false);

    const videoElement = ref(null);

    const videoClick = async () => {
        videoPlaying.value = true;
        await nextTick();
        if (videoElement.value.requestFullscreen) {
            videoElement.value.requestFullscreen();
        } else if (videoElement.value.webkitRequestFullscreen) {
            videoElement.value.webkitRequestFullscreen();
        } else if (videoElement.value.msRequestFullScreen) {
            videoElement.value.msRequestFullScreen();
        }
    };
</script>

<style scoped>
    .play-button {
        top: 50%;
        left: 55%;
        transform: translate(-50%, -50%);
    }
</style>
