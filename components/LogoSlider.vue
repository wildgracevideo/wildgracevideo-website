<template>
    <div
        class="logos relative overflow-hidden whitespace-nowrap bg-website-off-white px-0 py-14"
    >
        <!-- Heights and widths must match the logos-slide width defined below -->
        <div class="logos-slide inline-block whitespace-nowrap h-16 md:h-28" :style="{ '--total-icons': logos.length }">
            <img
                v-for="logo in logos"
                :key="`initial-logo-${logo.companyName}`"
                :src="logo.path"
                :alt="logo.altText"
                class="mr-20 my-0 inline-block w-16 md:mr-40 md:w-28 max-h-full logo-aspect-ratio"
            />
            <img
                v-for="logo in logos"
                :key="`second-logo-${logo.companyName}`"
                :src="logo.path"
                :alt="logo.altText"
                class="mr-20 my-0 inline-block w-16 md:mr-40 md:w-28 max-h-full logo-aspect-ratio"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    defineProps<{
        logos: { path: string; altText: string; companyName: string }[];
    }>();
</script>

<style scoped>
    @keyframes slide {
        100% {
            transform: translateX(-50%);
        }
    }

    .logo-aspect-ratio {
        aspect-ratio: auto 640 / 360
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
        animation: calc(3s * var(--total-icons)) slide infinite linear;
    }

    @media (max-width: 768px) {
        .logos:before,
        .logos:after {
            width: 100px;
        }

        .logos-slide {
            width: calc(var(--total-icons) * (4rem + 5rem) * 2);
        }
    }
</style>
