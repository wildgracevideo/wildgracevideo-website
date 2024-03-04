<template>
    <div
        class="logos relative overflow-hidden whitespace-nowrap bg-website-off-white px-0 py-14"
    >
        <!-- Heights and widths must match the logos-slide width defined below -->
        <div
            class="logos-slide inline-block h-16 whitespace-nowrap md:h-28"
            :style="{ '--total-icons': logos.length }"
        >
            <img
                v-for="logo in logos"
                :key="`initial-logo-${logo.companyName}`"
                :src="logo.image"
                :alt="logo.altText"
                class="logo-aspect-ratio my-0 mr-20 inline-block max-h-full w-16 md:mr-40 md:w-28"
            />
            <img
                v-for="logo in logos"
                :key="`second-logo-${logo.companyName}`"
                :src="logo.image"
                :alt="logo.altText"
                class="logo-aspect-ratio my-0 mr-20 inline-block max-h-full w-16 md:mr-40 md:w-28"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    defineProps<{
        logos: { image: string; altText: string; companyName: string }[];
    }>();
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
        width: calc(var(--total-icons) * (7rem + 10rem) * 2);
        animation: calc(6s * var(--total-icons)) slide infinite linear;
    }

    @media (max-width: 768px) {
        .logos:before,
        .logos:after {
            width: 100px;
        }

        .logos-slide {
            width: calc(var(--total-icons) * (5rem + 5rem) * 2);
        }
    }
</style>
