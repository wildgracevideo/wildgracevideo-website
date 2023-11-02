<template>
  <Html lang="en"></Html>
  <SchemaOrgOrganization
    name="Wild Grace Videography"
    logo="/logo1.webp"
    :same-as="[
      'https://www.instagram.com/wildgracevideo/',
      'https://www.facebook.com/wildgracevideo/',
      'https://www.linkedin.com/company/wild-grace-videography/about/',
      'https://www.tiktok.com/@wildgracevideography',
      'https://www.youtube.com/@carlykreiger4352',
    ]"
  />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
onMounted(() => {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", runtimeConfig.public.gaMeasurementId);
});
useHead({
  script: [
    {
      children: `
        window.omnisend = window.omnisend || [];
        omnisend.push(["accountID", "653fd28726fc1ed542dcefb5"]);
        omnisend.push(["track", "$pageViewed"]);
        !function(){var e=document.createElement("script");
        e.type="text/javascript",e.async=!0,
        e.src="https://omnisnippet1.com/inshop/launcher-v2.js";
        var t=document.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(e,t)}();
      `,
      body: true,
    },
  ],
});
</script>
