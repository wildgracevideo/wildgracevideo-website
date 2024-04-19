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
    const route = useRoute();
    const { data } = await useAsyncData('custom-portfolio', () =>
        queryContent('/custom-portfolio')
            .where({ path: route.params.slug })
            .findOne()
    );
    let portfolio = null;
    if (!data || !data.value!) {
        await navigateTo('/portfolio');
    } else {
        portfolio = data!.value! as Portfolio;
    }
</script>
