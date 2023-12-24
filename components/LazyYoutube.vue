<template>
    <div
        v-if="!videoPlaying"
        class="relative cursor-pointer"
        tabindex="0"
        role="button"
        @keypress="videoPlaying = true"
        @click="videoPlaying = true"
    >
        <span class="play-button absolute z-10"
            ><YoutubePlay fill="black"
        /></span>
        <img
            :src="`https://i.ytimg.com/vi_webp/${videoId}/maxresdefault.webp`"
            :alt="alt"
            class="w-full"
            :class="imageClass"
        />
    </div>
    <iframe
        v-else
        :src="`https://www.youtube.com/embed/${videoId}?autoplay=1`"
        :title="title"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        class="w-full"
        :class="videoClass"
    >
    </iframe>
</template>

<script setup lang="ts">
    defineProps<{
        videoId: string;
        alt: string;
        title: string;
        videoClass: string;
        imageClass: string;
    }>();

    const videoPlaying = ref(false);
</script>

<style scoped>
    .play-button {
        top: 50%;
        left: 55%;
        transform: translate(-50%, -50%);
    }
</style>
