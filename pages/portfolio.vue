<template>
    <OgMeta :title="pageTitle" :description="description" />
    <SchemaOrgWebPage :name="pageTitle" />
    <h1 class="mb-8 text-center text-4xl">{{ heading }}</h1>
    <div
        class="mx-0 mb-16 mt-16 grid grid-cols-1 gap-x-8 sm:mx-8 xl:grid-cols-2"
    >
        <section v-for="item in videos" :key="item.id" class="w-full">
            <LazyVideo :video="item.videoInfo" :video-title="item.title" />
        </section>
    </div>
</template>

<script setup lang="ts">
    import LazyVideo from '~/components/LazyVideo.vue';
    import type { VideoInfo } from '~/lib/video';

    const { data } = await useAsyncData('portfolio', () =>
        queryContent('portfolio').find()
    );
    const portfolio = data!.value![0];
    const pageTitle = portfolio.title!;
    const description = portfolio.description!;
    const heading = portfolio.heading!;

    const videos = portfolio.videos! as {
        videoInfo: VideoInfo;
        videoTitle: string;
    }[];

    onMounted(() => {
        // const observer = new IntersectionObserver((entries) => {
        //     entries.forEach((entry) => {
        //         if (entry.isIntersecting) {
        //             entry.target.classList.remove('fade-out');
        //             entry.target.classList.add('fade-in');
        //         } else {
        //             entry.target.classList.remove('fade-in');
        //             entry.target.classList.add('fade-out');
        //         }
        //     });
        // });
        //
        // const animatableElements = document.querySelectorAll(
        //     '.portfolio-animatable-video'
        // );
        // animatableElements.forEach((element) => observer.observe(element));
    });
</script>
