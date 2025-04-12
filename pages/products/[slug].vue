<template>
    <OgMeta
        :title="pageTitle"
        :description="product.description"
        :icon="product.ogImage!"
    />
    <SchemaOrgWebPage type="ItemPage" :name="pageTitle" />
    <ProductOverview
        :product-title="product.productName"
        :product-tag-line-markdown="product.productTagline"
        :main-image-description="imageDescription"
        :product-description-markdown="product.productDescription"
        :whats-inside-markdown="product.whatsInsideComponents"
        :call-to-action-title-markdown="product.callToActionTitle"
        :call-to-action-description-markdown="product.callToActionSubheading"
        :image-src="product.productImage"
        :price-dollars="product.priceDollars"
        :original-price-dollars="product.originalPriceDollars"
        :route="route.params.slug as string"
        :product-description="product.description"
        :call-to-action-background-image="product.callToActionBackgroundImage"
        :top-background-image="product.topBackgroundImage"
    />
</template>

<script setup lang="ts">
    import type { CmsProduct } from '~/types/cms';

    definePageMeta({
        layout: 'no-contact',
    });

    const route = useRoute();
    const { data } = await useAsyncData('products', () => {
        return queryCollection('content')
            .where('stem', '=', `product/${route.params.slug}`)
            .first();
    });

    const product = data?.value?.meta as unknown as CmsProduct;
    if (!product) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Page Not Found',
        });
    }
    const pageTitle = product.title;
    const imageDescription = product.imageDescription;
</script>
