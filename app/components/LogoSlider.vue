<template>
    <div
        class="logos bg-website-background relative overflow-hidden px-0 py-14 whitespace-nowrap"
    >
        <!-- Heights and widths must match the logos-slide width defined below -->
        <div
            class="logos-slide inline-block h-28 whitespace-nowrap"
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
                    class="logo-aspect-ratio my-0 mr-40 inline-block max-h-full"
                    :style="{
                        '--icon-width': `${logo.width}px`,
                    }"
                ></object>
                <NuxtImg
                    v-else
                    :src="logo.image"
                    :alt="logo.altText"
                    class="logo-aspect-ratio my-0 mr-40 inline-block max-h-full"
                    :style="{
                        '--icon-width': `${logo.width}px`,
                    }"
                    :sizes="`${logo.width}px`"
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
            -webkit-transform: translateX(-50%);
        }
    }

    .logo-aspect-ratio {
        aspect-ratio: auto 640 / 360;
    }

    .logos:before,
    .logos:after {
        position: absolute;
        top: 0;
        width: 125px;
        height: 160px;
        content: '';
        z-index: 2;
    }

    @media (min-width: 1024px) {
        .logos:before,
        .logos:after {
            position: absolute;
            top: 0;
            width: 250px;
            height: 160px;
            content: '';
            z-index: 2;
        }
    }

    .logos-slide {
        width: calc((var(--total-icons) * 10rem + var(--total-icon-width)) * 2);
        animation: calc(
                6s * var(--total-icons) +
                    (var(--total-icon-width-no-unit) / 560) * 1s
            )
            slide infinite linear;
    }

    .logos img,
    .logos object {
        width: var(--icon-width);
    }
</style>
