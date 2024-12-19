<template>
    <Html lang="en">
        <SchemaOrgOrganization
            name="Wild Grace Videography" :logo="runtimeConfig.public.websiteIcon" :same-as="[
            'https://www.instagram.com/wildgracevideo/',
            'https://www.facebook.com/wildgracevideo/',
            'https://www.linkedin.com/company/wild-grace-videography/about/',
            'https://www.tiktok.com/@wildgracevideo',
            'https://www.youtube.com/@carlykreiger4352',
        ]" />
        <SchemaOrgWebSite
    name="Wild Grace Videography" :url="siteUrl"
            description="Wild Grace Videography is a Denver, Colorado-based video production company that produces creative and memorable video content to make your business stand out." />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </Html>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
let siteUrl = runtimeConfig.public.siteUrl;
siteUrl = siteUrl.endsWith('/') ?
    siteUrl.slice(0, -1) :
    siteUrl;
const { proxy } = useScriptMetaPixel()

onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/shaka-player@4.12.2/dist/shaka-player.compiled.min.js';
  script.prefetch = true;
  script.async = true;
  document.head.appendChild(script);
  script.onload = () => {
    console.log("shaka loaded");
    const shakaLoadedEvent = document.createEvent("Event");
    shakaLoadedEvent.initEvent("shaka-loaded");
    document.dispatchEvent(shakaLoadedEvent);
  };
  proxy.fbq('track', 'PageView');
});
</script>
