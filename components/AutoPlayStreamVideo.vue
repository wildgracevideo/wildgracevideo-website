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
    import shaka from 'shaka-player';
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
        function handleIntersection(entries: IntersectionObserverEntry[]) {
            entries.map((entry: IntersectionObserverEntry) => {
                if (entry.isIntersecting) {
                    const player = new shaka.Player(videoElement.value);
                    player.load(props.video);
                    observer.unobserve(entry.target);
                    handleVideoControls(videoElement.value);
                }
            });
        }

        const observer = new IntersectionObserver(handleIntersection, {
            rootMargin: '200px',
        });
        observer.observe(videoElement.value!);
    });
</script>
