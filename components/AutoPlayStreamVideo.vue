<template>
    <video
        :id="videoId"
        ref="videoElement"
        :class="`${$attrs.class as string}`"
        muted
        loop
        disablePictureInPicture
        playsinline
        :title="title"
    >
        <SchemaOrgVideo
            :name="title"
            :url="video"
            :content-url="video"
            :upload-date="publicationDate"
            :description="description"
            :thumbnail="{
                url: thumbnailImageResolved,
                contentUrl: thumbnailImageResolved,
            }"
        />
    </video>
    <button
        v-if="withSoundControl"
        :class="`relative ${soundControlBottomClass} z-10 float-right ml-auto mr-4 h-8 w-8 cursor-pointer ${textColorClass} md:h-10 md:w-10`"
        @click="toggleMute"
    >
        <span class="sr-only">{{
            muted ? 'Unmute Video Audio' : 'Mute Video Audio'
        }}</span>
        <SpeakerXMarkIcon v-if="muted" />
        <SpeakerWaveIcon v-else />
    </button>
</template>

<script setup lang="ts">
    import {
        SpeakerWaveIcon,
        SpeakerXMarkIcon,
    } from '@heroicons/vue/24/outline';
    import { handleVideoControls } from '~/lib/handle-video-controls';

    const videoElement = ref<HTMLVideoElement>();

    const muted = ref(true);

    function toggleMute() {
        muted.value = !muted.value;
        videoElement.value.muted = muted.value;
    }
    const props = withDefaults(
        defineProps<{
            title: string;
            description: string;
            thumbnailImage: string | undefined;
            video: string;
            publicationDate: string;
            withSoundControl?: boolean;
            soundControlBottomClass?: string;
            videoId?: string;
            textColorClass?: string;
        }>(),
        {
            soundControlBottomClass: 'bottom-12',
            videoId: '',
            textColorClass: 'text-white',
        }
    );

    const thumbnailImageResolved = !props.thumbnailImage
        ? props.video
              .replace('videos/', 'images/')
              .replace('.mpd', '.0000000.jpg')
        : props.thumbnailImage;

    onMounted(async () => {
        const { onLoaded } = useScript(
            'https://cdn.jsdelivr.net/npm/shaka-player@4.12.2/dist/shaka-player.compiled.min.js',
            { bundled: true }
        );
        function handleIntersection(entries: IntersectionObserverEntry[]) {
            entries.map((entry: IntersectionObserverEntry) => {
                if (entry.isIntersecting) {
                    const player = new window.shaka.Player(videoElement.value);
                    player
                        .load(props.video)
                        .then(() => {
                            handleVideoControls(videoElement.value);
                        })
                        .catch(() => {
                            handleVideoControls(videoElement.value);
                        });
                    observer.unobserve(entry.target);
                }
            });
        }

        const observer = new IntersectionObserver(handleIntersection, {
            rootMargin: '200px',
        });
        onLoaded(() => {
            observer.observe(videoElement.value!);
        });
    });
</script>
