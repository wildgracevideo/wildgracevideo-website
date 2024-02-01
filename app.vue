<template>
    <Html lang="en"></Html>
    <SchemaOrgOrganization
        name="Wild Grace Videography"
        logo="/logo1.webp"
        :same-as="[
            'https://www.instagram.com/wildgracevideo/',
            'https://www.facebook.com/wildgracevideo/',
            'https://www.linkedin.com/company/wild-grace-videography/about/',
            'https://www.tiktok.com/@wildgracevideo',
            'https://www.youtube.com/@carlykreiger4352',
        ]"
    />
    <SchemaOrgWebSite name="Wild Grace Videography" />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
onMounted(() => {
    const measurementId = runtimeConfig.public.gaMeasurementId;
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    script.async = true;
    document.body.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', measurementId);
});
</script>
