<template>
    <OgMeta :title="linksData!.title" :description="linksData!.description" />
    <SchemaOrgWebPage :name="linksData!.title" />
    <NuxtLink to="/">
        <NuxtImg
            :src="runtimeConfig.public.websiteIcon"
            alt="Wild Grace Videography company logo."
            class="mx-auto mb-12 mt-8 cursor-pointer"
            width="138"
            height="90"
        />
    </NuxtLink>
    <div class="flex flex-col gap-8">
        <a
            v-for="link in linksData.links"
            :key="link.name"
            class="contact-scroll-observable mx-auto w-80 border-2 border-website-off-white bg-website-off-black px-16 py-6 text-center text-xl text-website-off-white"
            :href="link.destination"
        >
            {{ link.name }}
        </a>
    </div>
</template>

<script setup lang="ts">
    const { data } = await useAsyncData('link', () =>
        queryContent('link').find()
    );
    const linksData = data!.value![0]!;

    const runtimeConfig = useRuntimeConfig();

    definePageMeta({
        layout: 'plain',
    });
</script>
