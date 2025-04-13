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
    import type { CmsCustomPortfolio } from '~~/shared/types/cms';

    const route = useRoute();
    const { data } = await useAsyncData('custom-portfolio', () =>
        queryCollection('content')
            .where('stem', '=', `custom-portfolio/${route.params.slug}`)
            .first()
    );
    let portfolio: CmsCustomPortfolio | null = null;
    if (!data || !data.value) {
        await navigateTo('/portfolio');
    } else {
        portfolio = data!.value!.meta as unknown as CmsCustomPortfolio;
    }
</script>
