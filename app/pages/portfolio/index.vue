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
    import type { CmsPortfolio } from '~~/shared/types/cms';

    const { data } = await useAsyncData('portfolio', () =>
        queryCollection('content')
            .where('stem', '=', 'portfolio/portfolio')
            .first()
    );
    const portfolio = data!.value!.meta as unknown as CmsPortfolio;
</script>
