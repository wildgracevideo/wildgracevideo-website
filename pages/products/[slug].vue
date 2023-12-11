<template>
    <OgMeta
        :title="pageTitle"
        :description="data!.description"
        :icon="data!.ogImage!"
    />
    <SchemaOrgWebPage type="ItemPage" :name="pageTitle" />
    <ProductOverview
        :product-title="data!.productName!"
        :product-tag-line-markdown="data!.productTagline!"
        :main-image-description="imageDescription"
        :product-description-markdown="data!.productDescription!"
        :whats-inside-markdown="data!.whatsInsideComponents!"
        :call-to-action-title-markdown="data!.callToActionTitle!"
        :call-to-action-description-markdown="data!.callToActionSubheading!"
        :image-src="data!.productImage!"
        :price-dollars="data!.priceDollars! as number"
        :original-price-dollars="data!.originalPriceDollars! as number"
        :route="route.params.slug as string"
        :product-description="data!.description!"
        :call-to-action-background-image="data!.callToActionBackgroundImage!"
        :top-background-image="data!.topBackgroundImage!"
    />
</template>

<script setup lang="ts">
    definePageMeta({
        layout: 'no-contact',
    });

    const route = useRoute();
    const { data } = await useAsyncData('products', () =>
        queryContent('/product').where({ path: route.params.slug }).findOne()
    );
    const pageTitle = data!.value!.title!;
    const imageDescription = data!.value!.imageDescription!;
</script>
