<template>
    <OgMeta :title="pageTitle" :description="description" :icon="ogIcon" /> 
    <SchemaOrgWebPage type="ItemPage" :name="pageTitle" />
    <ProductOverview 
      :product-title="productTitle"
      product-tag-line-html="37 Reel Ideas for Interior Designers + 30-Day <i>Fillable Video</i> Content Planner"
      :main-image-description="imageDescription"
      :paragraphs="paragraphs"
      :detail-items="detailItems"
      :checkout-type="checkoutType"
      call-to-action-title-html="it takes 30 days to make a habit, so why not start <i>now</i> ?"
      call-to-action-description="Get 30-Day Video Transformation for Interior Designers to start truly connecting with your online community."
      image-src="/interior-designers-icon.webp"
      :price-dollars="7"
      :original-price-dollars="15"
      :product-description="description"
    />
</template>

<script setup lang="ts">
import { CheckoutType } from '~/lib/checkout-type';

const pageTitle = "Wild Grace Videography | Interior Designer Video Transformation";

const checkoutType = CheckoutType.InteriorDesignerReelIdeas;

const productTitle = "30-Day Video Transformation for Interior Designers";

const description =
  "Boost Your Social Media Presence with 37 Engaging Reel Ideas for Interior Designers and a Content Planner. Share Your Interior Design Journey, Build Trust, and Watch Your Audience Grow in 30 Days."

const imageDescription =
  "Image of the Wild Grace Videography 30-Day Video Transformation for Interior Designers product.";

const paragraphs = [
    "Let's get real about something we all say:〝I should be posting more on social media.〞Well, I've got you covered with 37 Reel Ideas for Interior Designers and a handy video content planner to keep you organized. It's not just about showing off your completed designs; your audience wants to see your journey, story, and some content that can actually help them (this will pose you as the expert, so that they come to you when they need help). It’s time you share value and build trust.",
    "I challenge you to create content for 30 days and watch your audience grow. Don't let fear hold you back; use social media as your playground to figure out what works. After 30 days, pick your top-performing content pieces, and voila, you've got your winning ads. No more wasted ad spend on trial and error!",
];

const detailItems = [
  "37 exciting Reel/TikTok prompts tailored to the interior design industry, designed to kickstart your 30-day video posting adventure",
  "30-Day Fillable Video Content Planner that will keep you accountable from planning to posting, and get you building habits for long-term video creation",
];

definePageMeta({
  layout: "no-contact",
});

const ogIcon = "og-interior-designers-icon.webp";
</script>
