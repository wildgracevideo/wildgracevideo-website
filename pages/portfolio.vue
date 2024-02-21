<template>
    <OgMeta :title="pageTitle" :description="description" />
    <SchemaOrgWebPage :name="pageTitle" />
    <h1 class="mb-8 text-center text-4xl">{{ heading }}</h1>
    <div class="aspect-ratio mx-auto max-w-4xl px-0 sm:px-8">
        <LazyYoutube
            :video-id="mainVideo.id"
            :title="mainVideo.name"
            video-class="w-full aspect-video"
            image-class="w-full aspect-video"
            :alt="mainVideo.alt"
        />
    </div>
    <div
        class="mx-0 mb-16 mt-32 grid grid-cols-1 gap-x-16 sm:mx-8 xl:grid-cols-2"
    >
        <section
            v-for="item in videos"
            :key="item.id"
            class="mx-auto w-full max-w-lg"
        >
            <LazyYoutube
                :video-id="item.id"
                :alt="item.alt"
                video-class="aspect-video"
                image-class="aspect-video portfolio-animatable-video fade-out"
                :title="item.name"
            />
            <h2 class="ml-2 mt-4 text-lg font-semibold">{{ item.name }}</h2>
            <h3 class="mb-16 ml-2 mt-2">{{ item.description }}</h3>
        </section>
    </div>
</template>

<script setup lang="ts">
    import LazyYoutube from '~/components/LazyYoutube.vue';

    const { data } = await useAsyncData('portfolio', () =>
        queryContent('portfolio').find()
    );
    const portfolio = data!.value![0];
    const pageTitle = portfolio.title!;
    const description = portfolio.description!;
    const heading = portfolio.heading!;

    const mainVideo = {
        id: portfolio.mainReelYoutubeId!,
        name: portfolio.mainReelName!,
        alt: portfolio.mainReelAlt!,
    };

    interface CMSVideo {
        title: string;
        description: string;
        youtubeId: string;
        alt: string;
    }

    const videos = portfolio.youtubeVideos!.map((it: CMSVideo) => {
        return {
            name: it.title,
            description: it.description,
            id: it.youtubeId,
            alt: it.alt,
        };
    });

    onMounted(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('fade-out');
                    entry.target.classList.add('fade-in');
                } else {
                    entry.target.classList.remove('fade-in');
                    entry.target.classList.add('fade-out');
                }
            });
        });

        const animatableElements = document.querySelectorAll(
            '.portfolio-animatable-video'
        );
        animatableElements.forEach((element) => observer.observe(element));
    });
</script>
