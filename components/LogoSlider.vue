<template>
    <div
        class="logos relative overflow-hidden whitespace-nowrap bg-white px-0 py-14"
    >
        <div class="logos-slide inline-block whitespace-nowrap">
            <img
                v-for="logo in logos"
                :key="`initial-logo-${logo.companyName}`"
                :src="logo.path"
                :alt="logo.altText"
                class="mx-10 my-0 inline-block h-12"
            />
            <img
                v-for="logo in logos"
                :key="`second-logo-${logo.companyName}`"
                :src="logo.path"
                :alt="logo.altText"
                class="mx-10 my-0 inline-block h-12"
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
        from {
            transform: translateX(0);
        }

        to {
            transform: translateX(-100%);
        }
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
        background: linear-gradient(to left, rgba(255, 255, 255, 0), white);
    }

    .logos:after {
        right: 0;
        background: linear-gradient(to right, rgba(255, 255, 255, 0), white);
    }

    .logos:hover .logos-slide {
        animation-play-state: paused;
    }

    .logos-slide {
        animation: 25s slide infinite linear;
    }
</style>
