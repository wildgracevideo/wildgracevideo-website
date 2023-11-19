<template>
  <OgMeta :title="pageTitle" :description="description" :icon="ogIcon" />
  <SchemaOrgWebPage type="ItemPage" :name="pageTitle" />
  <SchemaOrgImage
    :name="pageTitle"
    url="37-reel-ideas.webp"
    :description="imageDescription"
  />
  <section class="cover-background-image pb-4">
    <div
      class="flex lg:flex-row flex-col justify-center items-center gap-0 lg:gap-24 mx-auto lg:mx-32 -mt-4"
    >
      <div
        class="ml-4 mr-4 lg:ml-10 lg:mr-0 mt-20 text-0 max-w-sm h-auto w-auto image-box-shadow max-height-488 object-contain object-center"
      >
        <img src="/37-reel-ideas.webp" class="aspect-125" :alt="description" />
      </div>
      <div class="mx-8 lg:mx-0 sm:mx-auto">
        <h1
          class="text-4xl mt-8 lg:mt-72 lg:text-website-off-white text-black text-shadow"
        >
          {{ pageTitle }}
        </h1>
        <h2
          class="text-xl lg:mb-36 mb-12 mt-2 lg:text-website-off-white text-black text-shadow"
        >
          37 Reel Ideas + 30-Day <i>Fillable</i> Video Content Planner
        </h2>
        <p
          v-for="paragraph in paragraphs"
          class="pb-4 text-sm max-w-xl"
          v-html="paragraph"
        ></p>
        <p class="text-xl my-8 italic text-website-green">
          Price: <span class="line-through decoration-2">$15</span> $7
        </p>
        <DefaultButton
          title="BUY NOW FOR $7"
          :action="buyNow"
          additonal-classes="lg:mx-0 mx-auto"
        />
      </div>
    </div>
  </section>
  <section class="mt-8 lg:ml-44 ml-8">
    <h3 class="text-2xl mb-2">What's Inside</h3>
    <h4 class="text-lg curved-underline w-fit mb-8">
      {{ pageTitle }} Includes:
    </h4>
    <div
      v-for="detailItem in detailItems"
      class="mt-4 flex flex-row gap-4 mr-8"
    >
      <CheckCircleIcon class="h-6 w-6 shrink-0" />
      <p class="text-sm max-w-4xl">{{ detailItem }}</p>
    </div>
  </section>
  <section class="banner-background-image w-full h-fit mt-8 pt-32 pb-16 px-4">
    <h4
      class="text-6xl text-website-off-white text-center max-w-4xl mx-auto font-family-optimus"
    >
      it takes 30 days to make a habit, so why not start <i>now</i> ?
    </h4>
    <p
      class="text-website-off-white text-center mt-8 text-2xl max-w-md mx-auto"
    >
      Get 30-Day Video Transformation to start truly connecting with your online
      community.
    </p>
    <DefaultButton
      title="BUY NOW FOR $7"
      :action="buyNow"
      :inverse="true"
      additonal-classes="mx-auto mt-16"
    />
  </section>
</template>

<script setup lang="ts">
import { type CheckoutRequest, CheckoutType } from "~/types/stripe";
import { CheckCircleIcon } from "@heroicons/vue/24/solid";

const pageTitle = "Wild Grace Videography | 30-Day Video Transformation";

const description =
  "Boost Your Social Media Presence with 37 Engaging Reel Ideas and a Content Planner. Share Your Journey, Build Trust, and Watch Your Audience Grow in 30 Days.";

const imageDescription =
  "Image of the Wild Grace Videography 30-Day Video Transformation product.";

const paragraphs = [
  "Let's get real about something we all say:&#x301DI should be posting more on social media.&#x301E;Well, I've got you covered with 37 Reel Ideas and a handy video content planner to keep you organized. It's not just about showing off your product or service; your audience wants to see your journey, story, and some content that benefits them. Share value and build trust.",
  "I challenge you to create content for 30 days and watch your audience grow. Don't let fear hold you back; use social media as your playground to figure out what works. After 30 days, pick your top-performing content pieces, and voila, you've got your winning ads. No more wasted ad spend on trial and error!",
];

const detailItems = [
  "37 engaging Reel/Tik Tok prompts that will get you rolling on your 30-day video posting journey",
  "30-Day Fillable Video Content Planner that will keep you accountable from planning to posting, and get you building habits for long-term video creation",
];

definePageMeta({
  layout: "no-contact",
});

const ogIcon = "37-reel-ideas-og.webp";

const buyNow = async () => {
  let baseUrl = window.location.protocol + "//" + window.location.hostname;
  if (window.location.port) {
    baseUrl += ":" + window.location.port;
  }
  const checkoutRequest: CheckoutRequest = {
    type: CheckoutType.ReelIdeas,
    successUrl: `${baseUrl}/purchase-success`,
    cancelUrl: `${baseUrl}/30-day-video-transformation`,
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
  background-size: 100% 460px; /* 1024 - 1321 */
}

.banner-background-image {
  background-image: url("/37-reel-ideas-banner.webp");
  background-repeat: no-repeat;
}

.banner-background-image {
  background-size: 100% 800px;
}

@media (min-width: 1024px) {
  .text-shadow {
    text-shadow: 8px 8px 12px black;
  }
}
</style>
