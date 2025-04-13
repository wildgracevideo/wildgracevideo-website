<template>
    <OgMeta :title="pageTitle" :description="description" />
    <SchemaOrgWebPage type="AboutPage" :name="pageTitle" />
    <section class="mx-auto w-fit text-center">
        <h1 class="mb-6 text-4xl">{{ heading }}</h1>
        <h3 class="max-w-4xl text-center text-lg">
            If it doesn’t arrive in your email inbox within 15 minutes, please
            email me at,
            <a
                class="text-website-primary inline-block underline"
                href="mailto:carly@wildgracevideo.com?subject=Purchase%20Help"
                >carly@wildgracevideo.com</a
            >. Also, check spam to see if it went there!
        </h3>
    </section>
</template>

<script setup lang="ts">
    const pageTitle = 'Wild Grace Videography | Thank You For Your Purchase!';
    const heading = 'Thank You For Your Purchase!';
    const description =
        'Thank you for your purchase, please reach out to Wild Grace Videography if you have any questions.';

    definePageMeta({
        layout: 'no-contact',
    });
</script>
