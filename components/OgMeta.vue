<template>
    <Meta name="description" :content="description" />
    <Meta property="og:description" :content="description" />
    <Meta name="twitter:description" :content="description" />
    <Meta name="twitter:title" :cotent="title" />
    <Meta property="og:title" :content="title" />
    <Meta property="og:url" :content="`${siteUrl}${String(route.path)}`" />
    <Meta name="twitter:url" :content="`${siteUrl}${String(route.path)}`" />
    <Meta property="og:type" content="website" />
    <Meta name="twitter:domain" :content="`${siteUrl.substring(8)}`" />
    <Meta property="og:image" :content="iconLocation" />
    <Meta property="twitter:image" :content="iconLocation" />
    <Link rel="canonical" :href="canonicalUrl" />
</template>

<script setup lang="ts">
    const runtimeConfig = useRuntimeConfig();
    const siteUrl = runtimeConfig.public.siteUrl as string;
    const route = useRoute();
    const canonicalUrl = `${siteUrl}${String(route.path)}/`.replace(
        /\/+$/g,
        ''
    );
    const props = defineProps<{
        description: string;
        title: string;
        icon?: string;
    }>();
    const iconName = props.icon || runtimeConfig.public.wesbiteIcon;
    const iconLocation = runtimeConfig.public.siteUrl + '/' + iconName;
    useHead({
        title: props.title,
    });
</script>
