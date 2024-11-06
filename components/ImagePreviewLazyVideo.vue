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
            v-if="videoTitle"
            class="play-button absolute z-10 text-sm font-bold text-white opacity-100 group-hover:opacity-0"
            >{{ videoTitle }}</span
        >
        <PlayIcon v-else class="play-button absolute z-10 h-10 w-10" />
        <NuxtImg
            :src="thumbnailImageResolved"
            :alt="video.seoDescription"
            class="w-full brightness-60 duration-300 ease-linear hover:brightness-100"
            :class="`${aspectRatio} ${imageClass}`"
            :sizes="sizes"
        />
    </div>
    <video
        v-else
        ref="videoElement"
        class="w-full cursor-pointer"
        :class="`${aspectRatio} ${videoClass}`"
        loop
        playsinline
        controls
        autoplay
        :title="title"
    >
        <SchemaOrgVideo
            :name="video.seoTitle"
            :url="video.video"
            :content-url="video.video"
            :upload-date="video.publicationDate"
            :description="video.seoDescription"
            :thumbnail="{
                url: thumbnailImageResolved,
                contentUrl: thumbnailImageResolved,
            }"
        />
    </video>
</template>

<script setup lang="ts">
    import shaka from 'shaka-player';
    import { PlayIcon } from '@heroicons/vue/24/outline';
    import type { VideoInfo } from '~/lib/video';

    const props = withDefaults(
        defineProps<{
            video: VideoInfo;
            videoTitle?: string;
            videoClass?: string;
            imageClass?: string;
            sizes: string;
            fullScreenClick?: boolean;
            aspectRatio?: string;
        }>(),
        {
            videoTitle: undefined,
            videoClass: '',
            imageClass: '',
            fullScreenClick: true,
            aspectRatio: 'aspect-video',
        }
    );

    const videoPlaying = ref(false);

    const videoElement = ref(null);

    const videoClick = async () => {
        videoPlaying.value = true;
        await nextTick();
        console.log(props.video.video);
        const player = new shaka.Player(videoElement.value);
        await player.load(props.video.video);
        if (props.fullScreenClick) {
            if (videoElement.value.requestFullscreen) {
                videoElement.value.requestFullscreen();
            } else if (videoElement.value.webkitRequestFullscreen) {
                videoElement.value.webkitRequestFullscreen();
            } else if (videoElement.value.msRequestFullScreen) {
                videoElement.value.msRequestFullScreen();
            }
        }
    };

    const title = ref(props.video.seoTitle);

    const thumbnailImageResolved = !props.video.thumbnailImage
        ? props.video.video
              .replace('videos/', 'images/')
              .replace('.mpd', '.0000000.jpg')
        : props.video.thumbnailImage;

    onMounted(() => {
        window.addEventListener('fullscreenchange', (event: Event | null) => {
            if (event) {
                title.value = '';
            } else {
                title.value = props.video.seoTitle;
            }
        });
    });
</script>

<style scoped>
    .play-button {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
