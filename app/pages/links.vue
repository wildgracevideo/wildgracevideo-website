<template>
    <OgMeta :title="linksData!.title" :description="linksData!.description" />
    <SchemaOrgWebPage :name="linksData!.title" />
    <NuxtLink to="/">
        <NuxtImg
            :src="runtimeConfig.public.websiteIcon"
            alt="Wild Grace Videography company logo."
            class="mx-auto mt-8 mb-12 cursor-pointer"
            width="140"
            height="90"
        />
    </NuxtLink>
    <div class="flex flex-col gap-8">
        <a
            v-for="link in linksData.links"
            :key="link.name"
            class="contact-scroll-observable border-website-off-white bg-website-off-black text-website-off-white mx-auto w-80 border-2 px-16 py-6 text-center text-xl"
            :href="link.destination"
        >
            {{ link.name }}
        </a>
    </div>
</template>

<script setup lang="ts">
    import type { CmsLinks } from '~~/shared/types/cms';

    const { data } = await useAsyncData('link', () =>
        queryCollection('content').where('stem', '=', 'link/links').first()
    );
    const linksData = data!.value!.meta as unknown as CmsLinks;

    const runtimeConfig = useRuntimeConfig();

    definePageMeta({
        layout: 'plain',
    });
</script>
