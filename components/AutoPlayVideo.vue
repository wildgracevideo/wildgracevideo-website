<template>
    <video
        :class="`t{$attrs.class as string}`"
        autoplay
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
            :thumbnail-url="thumbnailImage"
        />
        <source :src="video" type="video/mp4" />
    </video>
</template>

<script setup lang="ts">
    defineProps<{
        title: string;
        description: string;
        thumbnailImage: string | undefined;
        video: string;
        publicationDate: string;
    }>();
</script>
