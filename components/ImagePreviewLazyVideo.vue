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
            class="play-button absolute z-10 font-bold text-white opacity-100 group-hover:opacity-0"
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
        class="video-js w-full cursor-pointer"
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
    import { PlayIcon } from '@heroicons/vue/24/outline';
    import videojs from 'video.js';
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

    const videoClick = ref(() => {});

    const title = ref(props.video.seoTitle);

    const thumbnailImageResolved = !props.video.thumbnailImage
        ? props.video.video
              .replace('videos/', 'images/')
              .replace('.mpd', '.0000000.jpg')
        : props.video.thumbnailImage;

    onMounted(() => {
        const isIOS =
            /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        videoClick.value = async () => {
            videoPlaying.value = true;
            await nextTick();
            videojs(
                videoElement.value,
                {
                    autoplay: true,
                    controls: true,
                    fluid: true,
                    techOrder: ['html5'],
                    html5: {
                        vhs: {
                            overrideNative: !isIOS,
                        },
                    },
                    sources: [
                        {
                            src: props.video.video,
                            type: 'application/dash+xml',
                        },
                    ],
                    fullscreen: {
                        options: { navigationUI: 'hide' },
                    },
                    errorDisplay: false,
                },
                function onPlayerReady() {
                    this.play();
                    if (props.fullScreenClick) {
                        if (this.requestFullscreen) {
                            this.requestFullscreen();
                        } else if (this.webkitRequestFullscreen) {
                            this.webkitRequestFullscreen();
                        } else if (this.msRequestFullScreen) {
                            this.msRequestFullScreen();
                        }
                    }
                }
            );
        };

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
