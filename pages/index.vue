<template>
    <OgMeta :title="pageTitle" :description="description" />
    <SchemaOrgWebPage :name="pageTitle" />
    <SchemaOrgVideo
        :name="videoTitle"
        url="https://content.wildgracevideo.com/wgv-reel-h264.mp4"
        content-url="https://content.wildgracevideo.com/wgv-reel-h264.mp4"
        upload-date="2023-09-25T22:13:39.520Z"
        description="Main video reel showcasing the work of Wild Grace Videography, a Denver, Colorado-based video production company."
        :thumbnail-url="thumbnailUrl"
    />
    <video
        id="reel-video"
        class="pointer-events-none aspect-video w-full max-w-full cursor-default bg-fixed"
        autoplay
        muted
        loop
        disablePictureInPicture
        playsinline
        :title="videoTitle"
    ></video>
    <div
        class="z-10 mx-16 grid grid-cols-1 gap-x-8 leading-loose md:my-12 md:grid-cols-2"
    >
        <section class="my-12 md:my-0">
            <p>&#x301D;{{ firstReviewText }}&#x301E;</p>
            <p class="mx-4">Cecelia Mims, Clay Love</p>
        </section>
        <section class="my-12 md:my-0">
            <p>
                &#x301D;Above and beyond our expectations of quality! The
                creative talent at Wild Grace Videography produced visuals that
                <span class="italic">beautifully</span>
                represent who we are as a brand. The whole process was
                incredibly easy; we simply sent in our product, and the rest was
                taken care of. I wouldn't recommend anyone else!&#x301E;
            </p>
            <p class="mx-4">Justin Little, Blue J Cones</p>
        </section>
    </div>
</template>

<script setup lang="ts">
    const firstReviewText =
        'It has been a pleasant and fruitful experience working with Carly. She has developed material that has met my expectations and more. Thank you Carly for helping me with my media needs and in a timely manner.';
    const videoTitle =
        'Video reel showcasing the work of Wild Grace Videography.';

    const pageTitle =
        'Wild Grace Videography | Denver Video Production Company';
    const description =
        'Wild Grace Videography is a Denver, Colorado-based video production company that produces creative and memorable video content to make your business stand out.';

    const runtimeConfig = useRuntimeConfig();
    const thumbnailUrl = runtimeConfig.public.siteUrl + '/logo1.webp';

    onMounted(async () => {
        const videoElement = document.getElementById(
            'reel-video'
        ) as HTMLVideoElement;

        const { $stream } = useNuxtApp();
        const cloudfrontUrl = useRuntimeConfig().public.cloudfrontUrl;

        const addSourceToVideo = (element: HTMLVideoElement, src: string) => {
            const source = document.createElement('source');
            source.src = src;
            element.appendChild(source);
        };

        const mpegDashManifestUri = `wgv-reel-264_dash.mpd`;

        if (window.safari) {
            const hlsManifestUri = `${cloudfrontUrl}/wgv-reel-hls/wgv-reel.m3u8`;
            addSourceToVideo(videoElement, hlsManifestUri);
        } else {
            try {
                await $stream(
                    videoElement,
                    mpegDashManifestUri,
                    'wgv-reel-mpeg-dash'
                );
            } catch (error) {
                console.log(error);
                const fallbackManifestUri = `${cloudfrontUrl}/wgv-reel-h264.mp4`;
                addSourceToVideo(videoElement, fallbackManifestUri);
            }
        }

        // Safari won't play videos on low-power mode
        videoElement
            .play()
            .then(() => {})
            .catch(() => {
                videoElement.setAttribute('controls', 'controls');
                videoElement.classList.remove('pointer-events-none');
            });
    });
</script>
