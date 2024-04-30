<template>
    <div :key="$.vnode.key || undefined" :class="parentClass">
        <AutoPlayVideo
            v-if="file.endsWith('mp4') || file.endsWith('webm')"
            :video="file"
            :description="seoDescription"
            :title="seoTitle"
            :thumbnail-image="thumbnailImage"
            :publication-date="publicationDate"
            :class="`pointer-events-none cursor-default ${
                $attrs.class as string
            }`"
            :with-sound-control="withSoundControl"
        />
        <template v-else>
            <img
                :class="`cursor-default ${$attrs.class as string}`"
                :src="file"
                :alt="seoDescription"
                :loading="isLazy ? 'lazy' : 'eager'"
            />
            <SchemaOrgImage
                :name="seoTitle"
                :url="file"
                :description="seoDescription"
            />
        </template>
    </div>
</template>

<script setup lang="ts">
    export interface FileConfig {
        file: string;
        seoDescription: string;
        seoTitle: string;
        thumbnailImage?: string;
        publicationDate: string;
        isLazy?: boolean;
        withSoundControl?: boolean;
        parentClass?: string;
    }
    defineProps<FileConfig>();

    defineOptions({
        inheritAttrs: false,
    });
</script>
