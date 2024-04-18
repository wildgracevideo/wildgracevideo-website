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
    const route = useRoute();
    const { data } = await useAsyncData('custom-portfolio', () =>
        queryContent('/custom-portfolio')
            .where({ path: route.params.slug })
            .findOne()
    );
    const portfolio = data!.value! as Portfolio;
</script>
