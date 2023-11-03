<template>
  <OgMeta :title="pageTitle" :description="description" />
  <SchemaOrgWebPage :name="pageTitle" />
  <SchemaOrgImage
    :name="pageTitle"
    url="/37-reel-ideas.webp"
    :description="imageDescription"
  />
  <section class="background-image">
    <div
      class="flex lg:flex-row flex-col gap-0 lg:gap-24 mx-auto lg:mx-32 -mt-4"
    >
      <img
        class="ml-auto mr-auto lg:ml-10 lg:mr-0 mt-5 font-size-0 aspect-125 max-w-sm h-auto w-auto image-box-shadow max-height-488"
        src="/37-reel-ideas.webp"
        :alt="description"
      />
      <div class="mx-8 lg:mx-0 sm:mx-auto mx-8">
        <h1 class="text-4xl mt-10">{{ pageTitle }}</h1>
        <h2 class="text-xl mb-12 mt-2">
          37 Reel Ideas + 30-Day <i>Fillable</i> Video Content Planner
        </h2>
        <p v-for="paragraph in paragraphs" class="mb-4 text-sm max-w-xl">
          {{ paragraph }}
        </p>
        <p class="text-xl my-8 italic text-website-green">
          Price: <span class="line-through decoration-2">$15</span> $7
        </p>
        <button
          class="h-14 w-60 text-xl block lg:mx-0 mx-auto rounded-xl text-website-off-white border-website-green bg-website-green border-2 px-auto hover:text-website-green hover:bg-website-off-white"
          @click="buyNow"
        >
          BUY NOW FOR $7
        </button>
      </div>
    </div>
  </section>
  <section class="mt-16 lg:ml-44 ml-8">
    <h3 class="text-2xl mb-2">What's Inside</h3>
    <h4 class="text-lg curved-underline w-fit mb-8">
      {{ pageTitle }} Includes:
    </h4>
    <div v-for="detailItem in detailItems" class="mt-4 flex flex-row gap-4">
      <CheckCircleIcon class="h-6 w-6 shrink-0" />
      <p class="text-sm max-w-4xl">{{ detailItem }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { type CheckoutRequest, CheckoutType } from "~/types/stripe";
import { CheckCircleIcon } from "@heroicons/vue/24/solid";

const pageTitle = "30-Day Video Transformation";

const description =
  "Boost Your Social Media Presence with 37 Engaging Reel Ideas and a Content Planner. Share Your Journey, Build Trust, and Watch Your Audience Grow in 30 Days.";

const imageDescription =
  "Image of the Wild Grace Videography 30-Day Video Transformation product.";

const paragraphs = [
  "Let's get real about something we all say: 'I should be posting more on social media.' Well, I've got you covered with 37 Reel ideas and a handy video content planner to keep you organized. It's not just about showing off your product or service; your audience wants to see your journey, story, and some content that benefits them. Share value and build trust.",
  "I challenge you to create content for 30 days and watch your audience grow. Don't let fear hold you back; use social media as your playground to figure out what works. After 30 days, pick your top-performing content pieces, and voila, you've got your winning ads. No more wasted ad spend on trial and error!",
];

const detailItems = [
  "37 engaging Reel/Tik Tok prompts that will get you rolling on your 30-day video posting journey",
  "30-Day Fillable Video Content Planner that will keep you accountable from planning to posting, and get you building habits for long-term video creation",
];

useHead({
  title: pageTitle,
});

definePageMeta({
  layout: "no-contact",
});

const runtimeConfig = useRuntimeConfig();
const buyNow = async () => {
  const checkoutRequest: CheckoutRequest = {
    type: CheckoutType.ReelIdeas,
    successUrl: runtimeConfig.public.siteUrl,
    cancelUrl: `${runtimeConfig.public.siteUrl}/30-day-video-transformation`,
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

.background-image {
  background-image: url("/37-reel-ideas-cover.webp");
  background-repeat: no-repeat;
}
</style>
