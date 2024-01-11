<template>
    <OgMeta :title="title" :description="description" />
    <SchemaOrgWebPage :name="title" />
    <SchemaOrgVideo
        :name="videoTitle"
        url="https://content.wildgracevideo.com/wgv-reel-h264.mp4"
        content-url="https://content.wildgracevideo.com/wgv-reel-h264.mp4"
        upload-date="2023-09-25T22:13:39.520Z"
        description="Main video reel showcasing the work of Wild Grace Videography, a Denver, Colorado-based video production company."
        :thumbnail-url="thumbnailImage"
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
    <Markdown
        :markdown-string="`# ${pageTitle}`"
        component-class="no-default-format mt-16 mb-16 text-5xl ml-16 mr-24 em:font-medium strong:font-bold leading-14 tracking-tighter"
    />
    <Markdown
        :markdown-string="pageTagline"
        component-class="ml-12 mr-16 mb-16"
    />
    <div ref="mountainStaticContainer" class="grid md:grid-cols-2 grid-cols-1">
        <div
            ref="mountainBackground"
            class="bg-website-off-black fill-website-accent mountain-background hidden md:block"
         ></div>
        <div class="p-12 h-6dvh">
            <div ref="testimonial1" class="top-1/3 text-center hidden p-12">
                <Markdown :markdown-string="homeData!.testimonialQuotes[0].quote" />
                <br />
                <p>- {{ homeData!.testimonialQuotes[0].author }}</p>
            </div>
            <div ref="testimonial2" class="top-1/3 text-center hidden p-12">
                <Markdown :markdown-string="homeData!.testimonialQuotes[1].quote" />
                <br />
                <p>- {{ homeData!.testimonialQuotes[1].author }}</p>
            </div>
        </div>
    </div>
    <Markdown
        :markdown-string="`## ${homeData!.videoHighlightTitle!}`"
        component-class="my-16 max-w-3xl w-fit mx-auto text-center no-default-format strong:font-bold leading-14 tracking-tighter em:font-medium text-5xl" />
</template>

<script setup lang="ts">
    const { data } = await useAsyncData('home', () =>
        queryContent('home').find()
    );

    const homeData = data!.value![0]!;
    const title = homeData.title!;
    const description = homeData.description;
    const pageTitle = homeData.pageTitle!;
    const pageTagline = homeData.pageTagline!;
    const videoTitle = homeData.videoTitle!;
    const thumbnailImage = homeData.thumbnailImage!;

    const mountainBackground: Ref<HTMLElement | null> = ref(null);
    const mountainStaticContainer: Ref<HTMLElement | null> = ref(null);
    const testimonial1: Ref<HTMLElement | null> = ref(null);
    const testimonial2: Ref<HTMLElement | null> = ref(null);

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

        if ('safari' in window) {
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

        addEventListener('scroll', (_event: Event) => {
            const mountainRect =
                mountainBackground.value!.getBoundingClientRect();
            const mountainTop = mountainRect.top;
            const mountainHeight = mountainRect.height;
            const triggerPercent = 0.9;
            const triggerPoint = mountainHeight * triggerPercent;
            const triggerOffset = mountainHeight * (1 - triggerPercent);
            const stepSize = (mountainHeight / 100) * (triggerPercent);

            if (mountainTop < triggerPoint) { 
                const width =
                    Math.min(
                        100,
                        ((mountainHeight / 6) - mountainTop - triggerOffset) / stepSize
                    ) * 1;
                mountainBackground.value!.style.setProperty(
                    '--mountain-width',
                    `${width}%`
                );
            } else {
                mountainBackground.value!.style.setProperty(
                    '--mountain-width',
                    '0%'
                );
            }

            const mountainStaticRect = mountainStaticContainer.value!.getBoundingClientRect();
            console.log(`mountain top: ${mountainTop}, mountain static top: ${mountainStaticRect.top}, innerHeight: ${window.innerHeight}`);
            const mountainStaticTop  = mountainStaticRect.top;
            if (mountainStaticTop < 0 && mountainStaticTop >= (-2.5 * innerHeight)) {
                testimonial1.value!.classList.remove('hidden', 'fade-out-quick');
                testimonial1.value!.classList.add('fixed', 'fade-in-quick');
                testimonial2.value!.classList.add('hidden', 'fade-out-quick');
                testimonial2.value!.classList.remove('fixed', 'fade-in-quick');
            } else if(mountainStaticTop < 0 && mountainStaticTop >= -5 * innerHeight) {
                testimonial1.value!.classList.add('hidden', 'fade-out-quick');
                testimonial1.value!.classList.remove('fixed', 'fade-in-quick');
                testimonial2.value!.classList.remove('hidden', 'fade-out-quick');
                testimonial2.value!.classList.add('fixed', 'fade-in-quick');
            } else { 
                testimonial2.value!.classList.add('hidden', 'fade-out-quick');
                testimonial2.value!.classList.remove('fixed', 'fade-in-quick');
                testimonial1.value!.classList.add('hidden', 'fade-out-quick');
                testimonial1.value!.classList.remove('fixed', 'fade-in-quick');
            }
        });
    });
</script>

<style scoped>
    .mountain-background {
        --mountain-width: 0%;
    }

    .mountain-background::before {
        background-image: url('/mountain.svg');
        background-attachment: fixed;
        background-position-x: 0%;
        background-position-y: 40%;
        background-repeat: no-repeat;
        background-size: 50%;
        content: '';
        position: relative;
        display: inline-block;
        height: 100%;
        width: var(--mountain-width);
    }
</style>
