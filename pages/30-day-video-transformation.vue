<template>
  <OgMeta :title="pageTitle" :description="description" :icon="ogIcon" /> 
  <SchemaOrgWebPage type="ItemPage" :name="pageTitle" />
  <ProductOverview 
      :product-title="productTitle"
      product-tag-line-html="37 Reel Ideas + 30-Day <i>Fillable</i> Video Content Planner"
      :main-image-description="imageDescription"
      :paragraphs="paragraphs"
      :detail-items="detailItems"
      :checkout-type="checkoutType"
      call-to-action-title-html="it takes 30 days to make a habit, so why not start <i>now</i> ?"
      call-to-action-description="Get 30-Day Video Transformation to start truly connecting with your online community."
      image-src="/37-reel-ideas.webp"
      :price-dollars="0"
      :original-price-dollars="15"
      button-text="FREE"
      :extra-heading-margin="true"
      :product-description="description"
  />
</template>

<script setup lang="ts">
import { CheckoutType } from "~/lib/checkout-type";

const pageTitle = "Wild Grace Videography | 30-Day Video Transformation";

const checkoutType = CheckoutType.ReelIdeas;

const productTitle = "30-Day Video Transformation";

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
</script>
