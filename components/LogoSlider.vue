<template>
    <div
        class="logos relative overflow-hidden whitespace-nowrap bg-website-off-white px-0 py-14"
    >
        <!-- Heights and widths must match the logos-slide width defined below -->
        <div
            class="logos-slide inline-block h-16 whitespace-nowrap md:h-28"
            :style="{
                '--total-icons': logos.length,
                '--total-icon-width': `${totalWidth}px`,
                '--total-icon-width-no-unit': `${totalWidth}`,
            }"
        >
            <template
                v-for="(logo, index) in [...logos, ...logos]"
                :key="`${index % logos.length}-logo-${logo.companyName}`"
            >
                <object
                    v-if="logo.image.endsWith('.svg')"
                    :data="logo.image"
                    type="image/svg+xml"
                    :aria-label="logo.altText"
                    class="logo-aspect-ratio my-0 mr-20 inline-block max-h-full md:mr-40"
                    :style="{
                        '--icon-width': `${logo.width}px`,
                    }"
                ></object>
                <img
                    v-else
                    :src="logo.image"
                    :alt="logo.altText"
                    class="logo-aspect-ratio my-0 mr-20 inline-block max-h-full md:mr-40"
                    :style="{
                        '--icon-width': `${logo.width}px`,
                    }"
                />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        logos: {
            image: string;
            altText: string;
            companyName: string;
            width: number;
        }[];
    }>();
    const totalWidth = props.logos
        .map((it) => it.width)
        .reduce((count, current) => count + current, 0);
</script>

<style scoped>
    @keyframes slide {
        100% {
            transform: translateX(-50%);
        }
    }

    .logo-aspect-ratio {
        aspect-ratio: auto 640 / 360;
    }

    .logos:before,
    .logos:after {
        position: absolute;
        top: 0;
        width: 250px;
        height: 160px;
        content: '';
        z-index: 2;
    }

    .logos:before {
        left: 0;
        background: linear-gradient(
            to left,
            rgba(250, 249, 249, 0),
            rgba(250, 249, 249, 1)
        );
    }

    .logos:after {
        right: 0;
        background: linear-gradient(
            to right,
            rgba(250, 249, 249, 0),
            rgba(250, 249, 249, 1)
        );
    }

    .logos-slide {
        width: calc((var(--total-icons) * 10rem + var(--total-icon-width)) * 2);
        animation: calc(
                3s * var(--total-icons) +
                    (var(--total-icon-width-no-unit) / 560) * 1s
            )
            slide infinite linear;
    }

    .logos img,
    .logos object {
        width: var(--icon-width);
    }

    @media (max-width: 768px) {
        .logos:before,
        .logos:after {
            width: 100px;
        }

        .logos img {
            width: calc(var(--icon-width) * 0.75);
        }

        .logos-slide {
            width: calc(
                (var(--total-icons) * 5rem + var(--total-icon-width) * 0.75) * 2
            );
        }
    }
</style>
