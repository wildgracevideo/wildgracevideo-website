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
            :thumbnail="{ url: thumbnailImage, contentUrl: thumbnailImage }"
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

    const videoElement = ref<HTMLVideoElement>();

    const muted = ref(true);

    function toggleMute() {
        muted.value = !muted.value;
        videoElement.value.muted = muted.value;
    }

    onMounted(() => {
        function handleIntersection(entries: IntersectionObserverEntry[]) {
            entries.map((entry: IntersectionObserverEntry) => {
                if (entry.isIntersecting) {
                    const videoSource: HTMLSourceElement =
                        document.createElement('source');
                    videoSource.type = 'video/mp4';
                    videoSource.src = props.video;
                    videoElement.value!.appendChild(videoSource);
                    videoElement.value!.play();
                    observer.unobserve(entry.target);
                }
            });
        }

        const observer = new IntersectionObserver(handleIntersection, {
            rootMargin: '200px',
        });
        observer.observe(videoElement.value!);
    });

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
            textColorClass: 'text-website-off-white',
        }
    );
</script>
