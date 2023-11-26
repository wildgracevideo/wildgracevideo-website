
<template>
  <SchemaOrgImage
    :name="productTitle"
    :url="imageSrc"
    :description="mainImageDescription"
  />
  <section class="cover-background-image pb-4">
    <div
      class="flex xl:flex-row flex-col justify-center items-center gap-0 xl:gap-24 mx-auto xl:mx-32 -mt-4"
    >
      <div
        class="ml-4 mr-4 xl:ml-10 xl:mr-0 xl:-mt-16 mt-4 xl:mb-0 mb-12 text-0 max-w-sm h-auto w-auto image-box-shadow max-height-488 object-contain object-center"
      >
        <img :src="imageSrc" class="aspect-square" :alt="mainImageDescription" />
      </div>
      <div class="mx-8 xl:mx-0 sm:mx-8">
        <h1
          class="text-4xl mt-8 xl:mt-64 xl:text-website-off-white text-black text-shadow sm:text-left text-center"
        >
          {{ productTitle }}
        </h1>
        <h2
          class="text-xl mt-2 xl:text-website-off-white text-black text-shadow sm:text-left text-center"
          :class="headingMargin"
          v-html="productTagLineHtml"
        />
        <p
          v-for="paragraph in paragraphs"
          class="pb-4 text-sm max-w-xl"
          v-html="paragraph"
        ></p>
        <p class="text-xl my-8 italic text-website-green">
        Price: <span class="line-through decoration-2">${{originalPriceDollars}}</span> ${{priceDollars}}
        </p>
        <DefaultButton
          :title="buttonTitle"
          :action="buyNow"
          additonal-classes="xl:mx-0 mx-auto"
        />
      </div>
    </div>
  </section>
  <section class="mt-8 xl:ml-44 ml-8">
    <h3 class="text-2xl mb-2">What's Inside</h3>
    <h4 class="text-lg curved-underline w-fit mb-8">
      {{ productTitle }} Includes:
    </h4>
    <div
      v-for="detailItem in detailItems"
      class="mt-4 flex flex-row gap-4 mr-8"
    >
      <CheckCircleIcon class="h-6 w-6 shrink-0" />
      <p class="text-sm max-w-4xl">{{ detailItem }}</p>
    </div>
  </section>
  <section class="banner-background-image w-full h-fit mt-8 pt-32 pb-8 px-4">
    <h4
      class="text-6xl text-website-off-white text-center max-w-4xl mx-auto font-family-optimus"
      v-html="callToActionTitleHtml"
    />
    <p
      class="text-website-off-white text-center mt-8 text-2xl max-w-md mx-auto"
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
import { type CheckoutRequest } from "~/types/checkout-request";
import { CheckoutType } from "~/lib/checkout-type";
import { CheckCircleIcon } from "@heroicons/vue/24/solid";

const props = defineProps<{
    productTitle: string;
    productTagLineHtml: string;
    mainImageDescription: string;
    paragraphs: string[];
    detailItems: string[];
    checkoutType: CheckoutType,
    callToActionTitleHtml: string;
    callToActionDescription: string;
    imageSrc: string;
    priceDollars: number;
    originalPriceDollars: number;
    buttonText?: string;
    extraHeadingMargin?: boolean;
}>(); 

let headingMargin = "mb-16";
if (props.extraHeadingMargin) {
    headingMargin = "xl:mb-32 mb-16";
}

let buttonTitle: string = props.buttonText || "";
if (!buttonTitle) {
    buttonTitle = `BUY NOW FOR $${props.priceDollars}`;
}

const buyNow = async () => {
  let baseUrl = window.location.protocol + "//" + window.location.hostname;
  if (window.location.port) {
    baseUrl += ":" + window.location.port;
  }
  const checkoutRequest: CheckoutRequest = {
    type: props.checkoutType,
    successUrl: `${baseUrl}/purchase-success`,
    cancelUrl: window.location.href,
  };
  const redirectUrl = await $fetch("/api/checkout", {
    method: "POST",
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
  content: "";
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
  background-image: url("/37-reel-ideas-cover.webp");
  background-repeat: no-repeat;
  background-size: 100% 420px;
}

.banner-background-image {
  background-image: url("/37-reel-ideas-banner.webp");
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

