<template>
    <OgMeta :title="pageTitle" :description="description" />
    <SchemaOrgWebPage :name="pageTitle" />
    <SchemaOrgVideo
        :name="videoTitle"
        url="https://d22668h9qdy3zj.cloudfront.net/wgv-reel.mp4"
        content-url="https://d22668h9qdy3zj.cloudfront.net/wgv-reel.mp4"
        upload-date="2023-09-25T22:13:39.520Z"
        description="Main video reel showcasing the work of Wild Grace Videography, a Denver, Colorado-based video production company."
    />
    <SchemaOrgComment
        :author="{ name: 'Cecilia Mims, Clay Love' }"
        :text="firstReviewText"
    />
    <SchemaOrgComment
        :author="{ name: 'Justin Little, Blue J Cones' }"
        :text="secondReviewText"
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
    const secondReviewText =
        "Above and beyond our expectations of quality! The creative talent at Wild Grace Videography produced visuals that beautifully represent who we are as a brand. The whole process was incredibly easy we simply sent in our product, and the rest was taken care of. I wouldn't recommend anyone else!";
    const videoTitle =
        'Video reel showcasing the work of Wild Grace Videography.';

    const pageTitle =
        'Wild Grace Videography | Denver Video Production Company';
    const description =
        'Wild Grace Videography is a Denver, Colorado-based video production company that produces creative and memorable video content to make your business stand out.';

    onMounted(() => {
        const videoElement = document.getElementById(
            'reel-video'
        ) as HTMLVideoElement;

        const getMediaSource = () => {
            // @ts-expect-error Exists only on iOS
            if (window.ManagedMediaSource) {
                console.log('using managed media source');
                // @ts-expect-error Exists only on iOS
                return new window.ManagedMediaSource();
            }
            if (window.MediaSource) {
                console.log('using media source');
                return new window.MediaSource();
            }
            console.log('no media source supported');
            return undefined;
        };

        let canPlayWebM = false;
        let videoUrl = 'https://d22668h9qdy3zj.cloudfront.net/wgv-reel.mp4';
        if (
            videoElement.canPlayType(
                'video/webm; codecs="opus, vp09.00.10.08"'
            ) === 'probably'
        ) {
            canPlayWebM = true;
            videoUrl = 'https://d22668h9qdy3zj.cloudfront.net/wgv-reel.webm';
        }

        const mediaSource = getMediaSource();
        if (mediaSource) {
            const url = URL.createObjectURL(mediaSource);
            videoElement.src = url;

            mediaSource.addEventListener('sourceopen', function () {
                mediaSource.duration = Number.POSITIVE_INFINITY;
                let sourceBuffer: SourceBuffer;
                if (canPlayWebM) {
                    sourceBuffer = mediaSource.addSourceBuffer(
                        'video/webm; codecs="opus, vp09.00.10.08"'
                    );
                } else {
                    sourceBuffer = mediaSource.addSourceBuffer(
                        'video/mp4; codecs="hvc1"'
                    );
                }

                sourceBuffer.mode = 'sequence';

                fetch(videoUrl)
                    .then(function (response) {
                        return response.arrayBuffer();
                    })
                    .then(function (arrayBuffer) {
                        sourceBuffer.addEventListener(
                            'updateend',
                            function (_e) {
                                if (
                                    !sourceBuffer.updating &&
                                    mediaSource.readyState === 'open'
                                ) {
                                    mediaSource.endOfStream();
                                }
                            }
                        );
                        sourceBuffer.appendBuffer(arrayBuffer);
                    })
                    .catch((error) =>
                        console.error('Error fetching video: ', error)
                    );
            });
        } else {
            videoElement.src = videoUrl;
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
