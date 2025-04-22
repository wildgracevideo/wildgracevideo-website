<template>
    <Meta name="description" :content="description" />
    <Meta property="og:description" :content="description" />
    <Meta name="twitter:description" :content="description" />
    <Meta name="twitter:title" :content="title" />
    <Meta property="og:title" :content="title" />
    <Meta property="og:url" :content="`${siteUrl}${String(route.path)}`" />
    <Meta name="twitter:url" :content="`${siteUrl}${String(route.path)}`" />
    <Meta property="og:type" content="website" />
    <Meta name="twitter:domain" :content="`${siteUrl.substring(8)}`" />
    <Meta property="og:image" :content="iconLocation" />
    <Meta property="og:image:type" content="image/webp" />
    <Meta property="og:image:width" content="1200" />
    <Meta property="og:image:height" content="630" />
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
    const iconName = props.icon || runtimeConfig.public.websiteIcon;
    let iconLocation = runtimeConfig.public.siteUrl;
    if (!iconName.startsWith('https')) {
        if (!iconName.startsWith('/')) {
            iconLocation += '/';
        }
        iconLocation += iconName;
    } else {
        iconLocation = iconName;
    }
    iconLocation += '?width=1200&height=630&format=webp';
    useHead({
        title: props.title,
    });
</script>
