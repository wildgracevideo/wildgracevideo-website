<template>
    <PortfolioPage
        v-if="portfolio"
        :page-title="portfolio.title"
        :description="portfolio.description"
        :heading="portfolio.heading"
        :videos="portfolio.videos"
    />
</template>

<script setup lang="ts">
    const { data } = await useAsyncData('portfolio', () =>
        queryCollection('content').path('portfolio').first()
    );
    const portfolio = data!.value!;
</script>
