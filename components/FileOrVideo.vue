<template>
    <div :key="$.vnode.key || undefined" :class="parentClass">
        <AutoPlayVideo
            v-if="file.file.endsWith('mp4') || file.file.endsWith('webm')"
            :video="file.file"
            :description="file.seoDescription"
            :title="file.seoTitle"
            :thumbnail-image="file.thumbnailImage"
            :publication-date="file.publicationDate"
            :class="`pointer-events-none cursor-default ${
                $attrs.class as string
            }`"
            :with-sound-control="withSoundControl"
        />
        <template v-else>
            <NuxtImg
                :class="`cursor-default ${$attrs.class as string}`"
                :src="file.file"
                :alt="file.seoDescription"
                :sizes="sizes"
                :loading="isLazy ? 'lazy' : 'eager'"
            />
            <SchemaOrgImage
                :name="file.seoTitle"
                :url="file.file"
                :description="file.seoDescription"
            />
        </template>
    </div>
</template>

<script setup lang="ts">
    export type FileInfo = {
        file: string;
        seoDescription: string;
        seoTitle: string;
        thumbnailImage?: string;
        publicationDate: string;
    };

    export type FileConfig = {
        file: FileInfo;
        sizes?: string;
        isLazy?: boolean;
        withSoundControl?: boolean;
        parentClass?: string;
    };
    defineProps<FileConfig>();

    defineOptions({
        inheritAttrs: false,
    });
</script>
