<template>
    <div :key="$.vnode.key || undefined">
        <AutoPlayVideo
            v-if="file.endsWith('mp4')"
            :video="file"
            :description="seoDescription"
            :title="seoTitle"
            :thumbnail-image="thumbnailImage"
            :publication-date="publicationDate"
            :class="`pointer-events-none cursor-default ${
                $attrs.class as string
            }`"
        />
        <template v-else>
            <img
                :class="`cursor-default ${$attrs.class as string}`"
                :src="file"
                :alt="seoDescription"
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
    }
    defineProps<FileConfig>();
</script>
