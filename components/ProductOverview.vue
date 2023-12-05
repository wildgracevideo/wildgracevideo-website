<template>
    <SchemaOrgImage
        :name="productTitle"
        :url="imageSrc"
        :description="mainImageDescription"
    />
    <SchemaOrgProduct
        :name="productTitle"
        :image="imageSrc"
        :offers="[
            {
                price: priceDollars,
                priceCurrency: 'USD',
                availability: 'InStock',
            },
        ]"
        :description="productDescription"
    />
    <section class="cover-background-image pb-4">
        <div
            class="mx-auto -mt-4 flex flex-col items-center justify-center gap-0 xl:mx-32 xl:flex-row xl:gap-24"
        >
            <div
                class="text-0 image-box-shadow max-height-488 mb-12 ml-4 mr-4 mt-4 h-auto w-auto max-w-sm object-contain object-center xl:-mt-16 xl:mb-0 xl:ml-10 xl:mr-0"
            >
                <img
                    :src="imageSrc"
                    class="aspect-square"
                    :alt="mainImageDescription"
                />
            </div>
            <div class="mx-8 sm:mx-8 xl:mx-0">
                <h1
                    class="text-shadow mt-8 text-center text-4xl text-black sm:text-left xl:mt-64 xl:text-website-off-white"
                >
                    {{ productTitle }}
                </h1>
                <h2
                    class="text-shadow mt-2 text-center text-xl text-black sm:text-left xl:text-website-off-white"
                    :class="headingMargin"
                    v-html="productTagLineHtml"
                />
                <p
                    v-for="(paragraph, i) in paragraphs"
                    :key="`${i}-product-overview-p`"
                    class="max-w-xl pb-4 text-sm"
                    v-html="paragraph"
                ></p>
                <p class="my-8 text-xl italic text-website-green">
                    Price:
                    <span class="line-through decoration-2"
                        >${{ originalPriceDollars }}</span
                    >
                    ${{ priceDollars }}
                </p>
                <DefaultButton
                    :title="buttonTitle"
                    :action="buyNow"
                    additonal-classes="xl:mx-0 mx-auto"
                />
            </div>
        </div>
    </section>
    <section class="ml-8 mt-8 xl:ml-44">
        <h3 class="mb-2 text-2xl">What's Inside</h3>
        <h4 class="curved-underline mb-8 w-fit text-lg">
            {{ productTitle }} Includes:
        </h4>
        <div
            v-for="(detailItem, i) in detailItems"
            :key="`${i}-detailItem`"
            class="mr-8 mt-4 flex flex-row gap-4"
        >
            <CheckCircleIcon class="h-6 w-6 shrink-0" />
            <p class="max-w-4xl text-sm">{{ detailItem }}</p>
        </div>
    </section>
    <section class="banner-background-image mt-8 h-fit w-full px-4 pb-8 pt-32">
        <h4
            class="font-family-optimus mx-auto max-w-4xl text-center text-6xl text-website-off-white"
            v-html="callToActionTitleHtml"
        />
        <p
            class="mx-auto mt-8 max-w-md text-center text-2xl text-website-off-white"
        >
            {{ callToActionDescription }}
        </p>
        <DefaultButton
            :title="buttonTitle"
            :action="buyNow"
            :inverse="true"
            additonal-classes="mx-auto mt-16"
        />
    </section>
</template>

<script setup lang="ts">
    import { CheckCircleIcon } from '@heroicons/vue/24/solid';
    import { type CheckoutRequest } from '~/types/checkout-request';
    import { CheckoutType } from '~/lib/checkout-type';

    const props = defineProps<{
        productTitle: string;
        productTagLineHtml: string;
        mainImageDescription: string;
        paragraphs: string[];
        detailItems: string[];
        checkoutType: CheckoutType;
        callToActionTitleHtml: string;
        callToActionDescription: string;
        imageSrc: string;
        priceDollars: number;
        originalPriceDollars: number;
        buttonText?: string;
        extraHeadingMargin?: boolean;
        productDescription: string;
    }>();

    let headingMargin = 'mb-16';
    if (props.extraHeadingMargin) {
        headingMargin = 'xl:mb-32 mb-16';
    }

    let buttonTitle: string = props.buttonText || '';
    if (!buttonTitle) {
        buttonTitle = `BUY NOW FOR $${props.priceDollars}`;
    }

    const buyNow = async () => {
        let baseUrl =
            window.location.protocol + '//' + window.location.hostname;
        if (window.location.port) {
            baseUrl += ':' + window.location.port;
        }
        const checkoutRequest: CheckoutRequest = {
            type: props.checkoutType,
            successUrl: `${baseUrl}/purchase-success`,
            cancelUrl: window.location.href,
        };
        const redirectUrl = await $fetch('/api/checkout', {
            method: 'POST',
            body: checkoutRequest,
        });
        window.location.href = redirectUrl;
    };
</script>

<style scoped>
    .aspect-ratio-cover {
        aspect-ratio: 1.6/1;
    }

    .curved-underline {
        position: relative;
        margin-right: 1rem;
    }

    .curved-underline:after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        height: 7px;
        width: 100%;
        border: solid 2px rgb(var(--color-website-green));
        border-color: rgb(var(--color-website-green)) transparent transparent
            transparent;
        border-radius: 50%;
    }

    .max-height-488 {
        max-height: 488px;
    }

    .h-600 {
        height: 600px;
    }

    .cover-background-image {
        background-image: url('/37-reel-ideas-cover.webp');
        background-repeat: no-repeat;
        background-size: 100% 420px;
    }

    .banner-background-image {
        background-image: url('/37-reel-ideas-banner.webp');
        background-repeat: no-repeat;
    }

    @media (min-width: 768px) {
        .cover-background-image {
            background-size: 100% 440px;
        }
    }

    @media (min-width: 1280px) {
        .text-shadow {
            text-shadow: 8px 8px 12px black;
        }
    }
</style>
