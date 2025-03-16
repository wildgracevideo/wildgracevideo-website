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
                hasMerchantReturnPolicy: {
                    returnPolicyCategory: 'MerchantReturnNotPermitted',
                    applicableCountry: 'US',
                },
            },
        ]"
        :description="productDescription"
    />
    <section
        class="cover-background-image pb-4"
        :style="{ 'background-image': `url('${topBackgroundImage}')` }"
    >
        <div
            class="mx-auto -mt-4 flex flex-col items-center justify-center gap-0 xl:mx-32 xl:flex-row xl:gap-24"
        >
            <div
                class="text-0 image-box-shadow max-height-488 mb-12 ml-4 mr-4 mt-4 h-auto w-auto max-w-sm object-contain object-center xl:-mt-16 xl:mb-0 xl:ml-10 xl:mr-0"
            >
                <NuxtImg
                    :src="imageSrc"
                    class="aspect-square"
                    :alt="mainImageDescription"
                    sizes="488px"
                />
            </div>
            <div class="mx-8 sm:mx-8 xl:mx-0">
                <div
                    class="text-shadow mt-8 min-h-fit text-center text-4xl text-black sm:text-left lg:h-52 xl:mt-64 xl:text-website-off-white"
                >
                    <h1>{{ productTitle }}</h1>
                    <Markdown
                        :component-class="`mt-2 text-xl h-14 mb-16 no-default-format`"
                        :markdown-string="`## ${productTagLineMarkdown}`"
                    />
                </div>
                <Markdown
                    component-class="max-w-xl pb-4 text-sm product-description"
                    :markdown-string="productDescriptionMarkdown"
                />
                <p class="my-8 text-xl italic text-website-primary">
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
            v-for="(detailItem, i) in whatsInsideMarkdown"
            :key="`${i}-detailItem`"
            class="mr-8 mt-4 flex flex-row gap-4"
        >
            <CheckCircleIcon class="h-6 w-6 shrink-0" />
            <Markdown
                component-class="max-w-4xl text-sm"
                :markdown-string="detailItem.text"
            />
        </div>
    </section>
    <section
        class="banner-background-image mt-8 h-fit w-full px-4 pb-8 pt-32"
        :style="{ 'background-image': `url('${callToActionBackgroundImage}')` }"
    >
        <Markdown
            component-class="subheading-font mx-auto max-w-4xl text-center text-6xl text-website-off-white"
            :markdown-string="`${callToActionTitleMarkdown}`"
        />
        <Markdown
            component-class="mx-auto mt-8 max-w-md text-center text-2xl text-website-off-white"
            :markdown-string="callToActionDescriptionMarkdown"
        />
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

    const props = defineProps<{
        productTitle: string;
        productTagLineMarkdown: string;
        mainImageDescription: string;
        productDescriptionMarkdown: string;
        whatsInsideMarkdown: { text: string }[];
        callToActionTitleMarkdown: string;
        callToActionDescriptionMarkdown: string;
        imageSrc: string;
        priceDollars: number;
        originalPriceDollars: number;
        productDescription: string;
        route: string;
        callToActionBackgroundImage: string;
        topBackgroundImage: string;
    }>();

    let buttonTitle: string;
    if (!props.priceDollars) {
        buttonTitle = 'FREE';
    } else {
        buttonTitle = `BUY NOW FOR $${props.priceDollars}`;
    }

    const buyNow = async () => {
        let baseUrl =
            window.location.protocol + '//' + window.location.hostname;
        if (window.location.port) {
            baseUrl += ':' + window.location.port;
        }
        const checkoutRequest: CheckoutRequest = {
            route: props.route,
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
        border: solid 2px rgb(var(--color-website-primary));
        border-color: rgb(var(--color-website-primary)) transparent transparent
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
        background-repeat: no-repeat;
        background-size: 100% 420px;
    }

    .banner-background-image {
        background-repeat: no-repeat;
    }

    .product-description > p {
        margin-bottom: 24px;
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
