<template>
    <PortfolioPage
        v-if="portfolio"
        :page-title="portfolio.pageTitle"
        :description="portfolio.description"
        :heading="portfolio.heading"
        :videos="portfolio.videos"
    />
</template>

<script setup lang="ts">
    const { data } = await useAsyncData('portfolio', () =>
        queryContent('portfolio').find()
    );
    const portfolio = data!.value![0] as Portfolio;
</script>
