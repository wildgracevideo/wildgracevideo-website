<template>
    <video
        :id="videoId"
        ref="videoElement"
        :class="`${$attrs.class as string} ${
            !autoPlay ? 'cursor-pointer' : ''
        }`"
        :muted="autoPlay"
        loop
        disablePictureInPicture
        playsinline
        :controls="!autoPlay || showControls"
        :poster="!autoPlay ? thumbnailImageResolved : ''"
        :title="title"
    >
        <SchemaOrgVideo
            :name="title"
            :url="video"
            :content-url="video"
            :upload-date="publicationDate"
            :description="description"
            :thumbnail-url="thumbnailImageResolved"
        />
    </video>
    <button
        v-if="withSoundControl"
        :class="`relative ${soundControlBottomClass} z-10 float-right mr-4 ml-auto h-8 w-8 cursor-pointer ${textColorClass} md:h-10 md:w-10`"
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
    import { handleVideoControls } from '~~/shared/lib/handle-video-controls';

    const videoElement = ref<HTMLVideoElement>();

    const player = ref(null);
    const preloadManager = ref(null);

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
            showControls?: boolean;
            autoPlay?: boolean;
        }>(),
        {
            soundControlBottomClass: 'bottom-12',
            videoId: '',
            textColorClass: 'text-website-off-white',
            showControls: false,
            autoPlay: true,
        }
    );

    const muted = ref(props.autoPlay);

    const thumbnailImageResolved = !props.thumbnailImage
        ? props.video
              .replace('videos/', 'images/')
              .replace('.mpd', '.0000000.jpg')
        : props.thumbnailImage;

    onMounted(async () => {
        function handleIntersection(entries: IntersectionObserverEntry[]) {
            entries.map((entry: IntersectionObserverEntry) => {
                if (entry.isIntersecting) {
                    if (props.autoPlay) {
                        player.value.attach(videoElement.value);
                        player.value
                            .load(preloadManager.value)
                            .then(() => {
                                handleVideoControls(videoElement.value);
                            })
                            .catch(() => {
                                handleVideoControls(videoElement.value);
                            });
                    }
                    observer.unobserve(entry.target);
                }
            });
        }

        const observer = new IntersectionObserver(handleIntersection, {
            rootMargin: '200px',
        });
        let estimatedBandwidth = 5000000; // This will default to the high resolution stream
        if (window.innerWidth < 1024) {
            estimatedBandwidth = 350000; // This will set the low resolution for small screens
        }

        if (window.shaka) {
            await loadShaka();
        } else {
            document.addEventListener('shaka-loaded', async () => {
                await loadShaka();
            });
        }

        async function loadShaka() {
            player.value = new window.shaka.Player();
            preloadManager.value = await player.value.preload(props.video);
            const bufferingGoal = 2;
            player.value.configure({
                streaming: {
                    bufferingGoal,
                    rebufferingGoal: 1,
                    bufferBehind: 0,
                    lowLatencyMode: true,
                },
                abr: {
                    enabled: true,
                    defaultBandwidthEstimate: estimatedBandwidth,
                },
            });
            player.value.configure('manifest.dash.ignoreMinBufferTime', true);
            observer.observe(videoElement.value!);

            if (!props.autoPlay) {
                videoElement.value!.addEventListener(
                    'play',
                    async () => {
                        if (!player.value.getMediaElement()) {
                            videoElement.value!.pause();
                            await player.value.attach(videoElement.value);
                            const isDesktop = window.innerWidth >= 1024;
                            if (isDesktop) {
                                // Disable ABR temporarily so the initial segments
                                // are fetched at the highest quality instead of
                                // starting low and ramping up over ~5 seconds.
                                player.value.configure({
                                    abr: { enabled: false },
                                });
                            }
                            await player.value.load(preloadManager.value);
                            if (isDesktop) {
                                const tracks = player.value.getVariantTracks();
                                if (tracks.length) {
                                    const best = tracks.reduce(
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        (a: any, b: any) =>
                                            a.bandwidth > b.bandwidth ? a : b
                                    );
                                    // Force the highest-quality track without
                                    // clearing the already-buffered data.
                                    player.value.selectVariantTrack(
                                        best,
                                        false
                                    );
                                }
                                // Re-enable ABR after 4 s — enough time to
                                // buffer the opening seconds at full resolution.
                                setTimeout(() => {
                                    player.value?.configure({
                                        abr: { enabled: true },
                                    });
                                }, 4000);
                            }
                            videoElement.value!.play();
                        }
                    },
                    { once: true }
                );
            }
        }
    });
</script>
