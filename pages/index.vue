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
        component-class="no-default-format mt-32 mb-16 text-5xl mx-8 em:font-medium strong:font-bold leading-14 tracking-tighter lg:mx-auto w-3/4 text-center"
    />
    <Markdown
        :markdown-string="pageTagline"
        component-class="mx-8 mb-32 max-w-6xl text-center lg:mx-auto"
    />
    <!-- TODO: Fix me for mobile -->
    <div ref="mountainStaticContainer" class="grid grid-cols-1 md:grid-cols-2">
        <div
            ref="mountainBackground"
            class="mountain-background hidden bg-website-off-black fill-website-accent md:block"
        ></div>
        <div class="h-6dvh bg-website-off-black p-12 text-website-accent">
            <div ref="testimonial1" class="top-1/3 hidden p-12 text-center">
                <Markdown
                    :markdown-string="homeData!.testimonialQuotes[0].quote"
                />
                <br />
                <p>- {{ homeData!.testimonialQuotes[0].author }}</p>
            </div>
            <div ref="testimonial2" class="top-1/3 hidden p-12 text-center">
                <Markdown
                    :markdown-string="homeData!.testimonialQuotes[1].quote"
                />
                <br />
                <p>- {{ homeData!.testimonialQuotes[1].author }}</p>
            </div>
        </div>
    </div>
    <Markdown
        :markdown-string="`## ${homeData!.videoHighlightTitle!}`"
        component-class="my-24 max-w-3xl w-fit mx-8 md:mx-auto text-center no-default-format strong:font-bold leading-14 tracking-tighter em:font-medium text-5xl"
    />
    <div class="mx-16 mb-48 grid grid-cols-1 gap-x-10 lg:grid-cols-3">
        <div
            v-for="video in videos"
            :key="`home-highlight-video-${video.title}`"
        >
            <!-- TODO: Handle low-power mode for iOS -->
            <video
                class="pointer-events-none mb-4 mt-8 aspect-video cursor-default bg-fixed lg:mt-0"
                autoplay
                muted
                loop
                disablePictureInPicture
                playsinline
                :title="videoTitle"
            >
                <source :src="video.video" type="video/mp4" />
            </video>
            <h3 class="mb-12 text-center text-2xl">
                {{ video.title }}
            </h3>
            <p class="text-center">
                {{ video.description }}
            </p>
        </div>
    </div>
    <div class="mx-12 mb-36 grid grid-cols-1 gap-x-16 md:grid-cols-2 xl:mx-24">
        <div>
            <h2 class="strong:font-bold mb-8 text-5xl">
                MEET YOUR <strong>ADVENTURE-LOVING VIDEOGRAPHER</strong>
            </h2>
            <p>
                I'm Carly, and creating videos is my thing. After graduating
                from the University of Vermont (Go Catamounts!) I made the
                decision to pack my bags and fly out west—and now call Denver,
                Colorado my home.
                <br class="mb-8" />
                Ever since I was younger, I have always found passion and
                excitement through creating videos. From creating embarrassing
                movie trailers with my friends when I was younger, to putting
                together creative travel videos from my semester abroad in New
                Zealand, and compiling footage of the ranch I worked at in
                Wyoming. Creating travel and outdoor videos as a “souvenir” from
                moments through life has always been important to me.
                <br class="mb-8" />
                At Wild Grace Video Productions, I am focused on providing
                detailed and personalized videos to match your brand and relay
                your message in a professional, yet exciting style.
                <br class="mb-8" />
                I feel beyond fortunate that I have been able to combine my love
                for creativity and video into my own business and I’m excited to
                share that same energy and excitement with you.
            </p>
        </div>
        <img src="/videographer.gif" alt="TODO ALT" />
    </div>
    <h2 class="mb-12 ml-8 text-5xl font-bold lg:ml-16">TRUSTED BY</h2>
    <LogoSlider class="mb-32" :logos="logos" />
    <div class="strong:font-bold bg-website-accent">
        <div class="w-4/5 pb-24">
            <h2 class="mb-12 ml-8 pt-32 text-5xl lg:ml-24">
                HOW DOES THIS <strong>WORK</strong>?
            </h2>
            <div class="pb-16">
                <h3 class="strong:font-bold mb-6 ml-12 text-4xl lg:ml-32">
                    <strong>Step 1.</strong> Discovery Call
                </h3>
                <p class="ml-16 lg:ml-36">
                    This initial step is where I get to know you and your
                    project. We discuss your vision, goals, and requirements.
                    It's a collaborative conversation where I gather essential
                    details to ensure I’m aligned with your vision.
                </p>
            </div>
            <div class="pb-16">
                <h3 class="strong:font-bold mb-6 ml-12 text-4xl lg:ml-32">
                    <strong>Step 2.</strong> Plan. Plan. Plan.
                </h3>
                <p class="ml-16 lg:ml-36">
                    Once I’ve understood your objectives, we begin the planning
                    phase. This involves crafting a detailed strategy,
                    storyboard, and production plan. We'll work together closely
                    to finalize every aspect of the project before moving
                    forward.
                </p>
            </div>
            <div class="pb-16">
                <h3 class="strong:font-bold mb-6 ml-12 text-4xl lg:ml-32">
                    <strong>Step 3.</strong> Create + Deliver!
                </h3>
                <p class="ml-16 lg:ml-36">
                    This is where the magic happens! I’ll bring the plans to
                    life by utilizing a wide range of cinematic equipment and
                    leveraging my expertise. Collaboration with industry experts
                    may also come into play to ensure the highest quality and
                    creativity for your project. Throughout this stage, I
                    maintain communication and transparency, ensuring the
                    project aligns with your expectations.
                    <br class="mb-8" />
                    Finally, I’ll deliver the finished product, ready to exceed
                    your vision and goals.
                </p>
            </div>
        </div>
    </div>
    <div
        class="wave-background mb-32 grid w-full grid-cols-1 items-center justify-center gap-x-10 px-8 md:grid-cols-3"
    >
        <video
            v-for="video in parallaxVideos"
            :key="`parallax-video-${video.title}`"
            class="pointer-events-none mx-auto mb-4 mt-8 aspect-video cursor-default bg-fixed lg:mx-0 lg:mt-0"
            autoplay
            muted
            loop
            disablePictureInPicture
            playsinline
            :title="videoTitle"
        >
            <source :src="video.path" type="video/mp4" />
        </video>
    </div>
    <div class="mx-8 mb-32 lg:mx-32">
        <h2 class="mx-auto mb-20 mt-32 max-w-lg text-center text-4xl font-bold">
            FREQUENTLY ASKED QUESTIONS
        </h2>
        <template v-for="faq in faqs" :key="`faq-${faq.question}`">
            <h3 class="mb-4 font-bold">+ {{ faq.question }}</h3>
            <p class="mb-10">
                {{ faq.answer }}
            </p>
        </template>
    </div>
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

    // TODO: Alt/template images for SEO
    const videos = [
        {
            title: 'BOUTIQUE HOTELS',
            description:
                'Let us capture the essence of your boutique hotel by showcasing your unique spaces and highlighting the beauty of your surroundings. We’ll craft compelling visuals that will speak to your brand and up-level your marketing for years to come.',
            video: '/boutique-hotels.mp4',
        },
        {
            title: 'OUTDOOR-RELATED PRODUCTS',
            description:
                "Let us spotlight your outdoor gear with visuals that showcase their top-notch quality and demonstrate their ideal use in the great outdoors. Let our compelling imagery redefine your brand's marketing impact for the long term.",
            video: '/outdoor-brands.mp4',
        },
        {
            title: 'OUTDOOR ADVENTURE COMPANIES',
            description:
                "Get ready to flaunt your outdoor excursions with visuals that bring out their thrill and showcase the excitement of your adventure. Our compelling imagery will redefine your brand's marketing impact, attracting thrill-seekers and enthusiasts for unforgettable experiences.",
            video: '/adventure-brands.mp4',
        },
    ];

    const logos = [
        { path: '/slider-logos/3m.svg', altText: 'Test', companyName: 'Test' },
        {
            path: '/slider-logos/barstool-store.svg',
            altText: 'Test',
            companyName: 'Test',
        },
        {
            path: '/slider-logos/budweiser.svg',
            altText: 'Test',
            companyName: 'Test',
        },
        {
            path: '/slider-logos/buzzfeed.svg',
            altText: 'Test',
            companyName: 'Test',
        },
        {
            path: '/slider-logos/forbes.svg',
            altText: 'Test',
            companyName: 'Test',
        },
        {
            path: '/slider-logos/macys.svg',
            altText: 'Test',
            companyName: 'Test',
        },
        {
            path: '/slider-logos/menshealth.svg',
            altText: 'Test',
            companyName: 'Test',
        },
        {
            path: '/slider-logos/mrbeast.svg',
            altText: 'Test',
            companyName: 'Test',
        },
    ];

    const faqs = [
        {
            question: 'Do you do both photo and video?',
            answer: "I specialize in video production but can also offer photography services upon request. Whether you're seeking a stunning video production, captivating photography, or a combination of both, I’m committed to meeting your creative needs and bringing your vision to life.",
        },
        {
            question: 'What is the turnaround time?',
            answer: 'Turnaround time varies based on the project scope and I will provide an estimated timeline during the Discovery Call. However, the majority of our projects have a 2-week turnaround time from the last shoot date.',
        },
        {
            question:
                'How involved are you in the planning and storyboarding process?',
            answer: 'I am adaptable to your preferences. Typically, I take the lead in planning and storyboarding based on the insights gathered during our discovery call and pre-production meeting. However, I welcome your involvement at any level—whether you prefer a hands-on approach in planning every detail or entrusting me to handle the creative process, I’m here to accommodate your needs and vision.',
        },
        {
            question: 'Can we choose the music for our video?',
            answer: "Typically, I curate music based on my expertise and the flow of the editing process. I have access to a wide range of quality, royalty-free tracks from a subscription platform. However, I value your preferences. If you have specific genre ideas or would like to be presented with song options, I'm more than happy to provide you with a selection to choose from. Otherwise, rest assured that I'll select music that complements the video seamlessly, drawing from my experience and creative instincts which have been successful in past projects.",
        },
    ];

    const parallaxVideos = [
        {
            path: '/parallax-video-1.jpg',
            altText: '',
            title: 'Parallax video 1',
        },
        {
            path: '/parallax-video-2.jpg',
            altText: '',
            title: 'Parallax video 2',
        },
        {
            path: '/parallax-video-3.jpg',
            altText: '',
            title: 'Parallax video 3',
        },
    ];

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
            const triggerPercent = 1;
            const triggerPoint = mountainHeight * triggerPercent;
            const triggerOffset = mountainHeight * (1 - triggerPercent);
            const stepSize = (mountainHeight / 100) * triggerPercent;

            if (mountainTop < triggerPoint) {
                const width =
                    Math.min(
                        100,
                        (mountainHeight / 6 - mountainTop - triggerOffset) /
                            stepSize
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

            const mountainStaticRect =
                mountainStaticContainer.value!.getBoundingClientRect();
            console.log(
                `mountain top: ${mountainTop}, mountain static top: ${mountainStaticRect.top}, innerHeight: ${window.innerHeight}`
            );
            const mountainStaticTop = mountainStaticRect.top;
            if (
                mountainStaticTop < innerHeight / 2 &&
                mountainStaticTop >= -2 * innerHeight
            ) {
                testimonial1.value!.classList.remove(
                    'hidden',
                    'fade-out-quick'
                );
                testimonial1.value!.classList.add('fixed', 'fade-in-quick');
                testimonial2.value!.classList.add('hidden', 'fade-out-quick');
                testimonial2.value!.classList.remove('fixed', 'fade-in-quick');
            } else if (
                mountainStaticTop < innerHeight / 2 &&
                mountainStaticTop >= -5 * innerHeight
            ) {
                testimonial1.value!.classList.add('hidden', 'fade-out-quick');
                testimonial1.value!.classList.remove('fixed', 'fade-in-quick');
                testimonial2.value!.classList.remove(
                    'hidden',
                    'fade-out-quick'
                );
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

    .wave-background {
        background-image: url('/wave.jpg');
        background-attachment: fixed;
        /* background-repeat: no-repeat; */
        background-size: 100%;
        min-height: 56rem;
        height: 100%;
    }
</style>
