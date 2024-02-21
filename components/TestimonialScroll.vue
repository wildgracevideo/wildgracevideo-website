<template>
    <section>
        <div
            ref="mountainStaticContainer"
            class="font-family-playfair-display hidden text-lg leading-7 tracking-wider md:grid md:grid-cols-2"
        >
            <div
                ref="mountainBackground"
                class="mountain-background bg-website-off-black fill-website-accent"
            ></div>
            <div class="h-6dvh bg-website-off-black p-12 text-website-accent">
                <div
                    ref="testimonial1"
                    class="top-1/4 hidden p-12 text-center md:top-1/3"
                >
                    <Markdown
                        :markdown-string="`&#8220;${testimonialQuotes[0].quote}&#8221;`"
                    />
                    <br />
                    <p>- {{ testimonialQuotes[0].author }}</p>
                </div>
                <div
                    ref="testimonial2"
                    class="top-1/4 hidden p-12 text-center md:top-1/3"
                >
                    <Markdown
                        :markdown-string="`&#8220;${testimonialQuotes[1].quote}&#8221;`"
                    />
                    <br />
                    <p>- {{ testimonialQuotes[1].author }}</p>
                </div>
            </div>
        </div>
        <div class="block md:hidden">
            <div class="bg-website-off-black p-12 text-website-accent">
                <div
                    class="home-scroll-observable fade-out mb-16 p-12 text-center"
                >
                    <Markdown :markdown-string="testimonialQuotes[0].quote" />
                    <br />
                    <p>- {{ testimonialQuotes[0].author }}</p>
                </div>
                <div class="home-scroll-observable fade-out p-12 text-center">
                    <Markdown :markdown-string="testimonialQuotes[1].quote" />
                    <br />
                    <p>- {{ testimonialQuotes[1].author }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    const mountainBackground: Ref<HTMLElement | null> = ref(null);
    const mountainStaticContainer: Ref<HTMLElement | null> = ref(null);
    const testimonial1: Ref<HTMLElement | null> = ref(null);
    const testimonial2: Ref<HTMLElement | null> = ref(null);

    defineProps<{
        testimonialQuotes: { quote: string; author: string }[];
    }>();

    onMounted(async () => {
        const scrollHandler = (_event: Event) => {
            if (window.innerWidth < 768) {
                return;
            }
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
            const mountainStaticTop = mountainStaticRect.top;
            if (
                mountainStaticTop < innerHeight / 4 &&
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
                mountainStaticTop < innerHeight / 4 &&
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
        };
        addEventListener('scroll', scrollHandler);
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
