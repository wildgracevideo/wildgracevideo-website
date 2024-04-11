<template>
    <video
        ref="videoElement"
        :class="`{$attrs.class as string}`"
        muted
        loop
        disablePictureInPicture
        playsinline
        :title="title"
    >
        <SchemaOrgVideo
            :name="title"
            :url="video"
            :content-url="video"
            :upload-date="publicationDate"
            :description="description"
            :thumbnail="{ url: thumbnailImage, contentUrl: thumbnailImage }"
        />
    </video>
</template>

<script setup lang="ts">
    const videoElement = ref<HTMLVideoElement>();

    onMounted(() => {
        function handleIntersection(entries: IntersectionObserverEntry[]) {
            entries.map((entry: IntersectionObserverEntry) => {
                if (entry.isIntersecting) {
                    const videoSource: HTMLSourceElement =
                        document.createElement('source');
                    videoSource.type = 'video/mp4';
                    videoSource.src = props.video;
                    videoElement.value!.appendChild(videoSource);
                    videoElement.value!.play();
                    observer.unobserve(entry.target);
                }
            });
        }

        const observer = new IntersectionObserver(handleIntersection, {
            rootMargin: '200px',
        });
        observer.observe(videoElement.value!);
    });

    const props = defineProps<{
        title: string;
        description: string;
        thumbnailImage: string | undefined;
        video: string;
        publicationDate: string;
    }>();
</script>
