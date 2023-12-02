<template>
  <OgMeta :title="pageTitle" :description="description" />
  <SchemaOrgWebPage type="AboutPage" :name="pageTitle" />
  <section class="mx-auto w-fit text-center">
    <h1 class="text-4xl mb-6">{{ heading }}</h1>
    <!-- <h3 class="text-2xl text-center">Have Questions? Contact me here</h3> -->
    <h3 class="text-lg text-center max-w-4xl">
        If it doesn’t arrive in your email inbox within 15 minutes, please email me at,
      <a
        class="underline text-website-green inline-block"
        href="mailto:carly@wildgracevideography.com?subject=Purchase%20Help"
        >carly@wildgracevideography.com</a
      >. Also, check spam to see if it went there!
    </h3>
  </section>
</template>

<script setup lang="ts">
const pageTitle = "Wild Grace Videography | Thank You For Your Purchase!";
const heading = "Thank You For Your Purchase!";
const description =
  "Thank you for your purchase, please reach out to Wild Grace Videography if you have any questions.";

definePageMeta({
  layout: "no-contact",
});
</script>
