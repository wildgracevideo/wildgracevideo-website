<template>
  <OgMeta :title="pageTitle" :description="description" :icon="ogIcon" />
  <SchemaOrgWebPage type="ItemPage" :name="pageTitle" />
  <h1 class="mx-auto text-4xl w-fit">
    <span
      class="font-family-cardo xl:inline-block block text-center lg:mx-auto mx-2"
      >Wild Grace Videography</span
    ><span
      class="font-family-bright-sunshine text-6xl text-center block xl:inline-block lg:mx-4 mx-auto"
      >X</span
    ><span
      class="font-family-brittany grow-transition relative block xl:inline-block text-center lg:mx-auto mx-2"
      >Samantha Melissa Marketing</span
    >
  </h1>
  <h2 class="text-2xl w-fit mx-auto mt-10 mb-6 text-center">
    Social Media Marketing + Video + Photo
  </h2>
  <h3 class="mx-8 lg:mx-auto text-center max-w-4xl">{{ heading }}</h3>
  <p class="text-center mt-4 mb-4 text-xl mx-4">
    Learn more about Samantha Melissa Marketing
    <a
      class="underline text-website-green"
      href="https://samanthamelissamarketing.com/"
      >here</a
    >.
  </p>
  <h4 class="w-fit mx-auto mb-8">3-Month Retainer</h4>
  <section
    class="grid lg:grid-cols-3 grid-cols-1 gap-20 xl:mx-16 lg:mx-4 sm:mx-16 mx-4 mb-20"
  >
    <PackageItem
      v-for="(item, index) in packages"
      :config="item"
      :key="item.title"
      :enlarge="index == 1"
    />
  </section>
  <section class="rounded-3xl">
    <div
      class="rounded-3xl border-y-16 border-l-8 border-r-8 border-custom-green grid grid-cols-1 lg:grid-cols-3 gap-4 xl:mx-16 lg:mx-4 sm:mx-16 mx-4"
    >
      <div>
        <h3
          class="mx-auto text-center w-fit font-bold text-4xl mb-2 mt-4 font-family-spectral"
        >
          <span class="font-family-moontime">The</span> Add-Ons
        </h3>
        <PackageBubble :config="addons[0]" />
      </div>
      <PackageBubble :config="addons[1]" />
      <PackageBubble :config="addons[2]" />
    </div>
  </section>
  <p class="text-center my-8">
    Social Media Packages are customizable based on your needs. Price range
    varies depending on scope of work.
  </p>
</template>

<script setup lang="ts">
import { type Config } from "~/components/PackageItem.vue";

const pageTitle = "Wild Grace Videography | Social Media Packages";

const description =
  "Revamp your Colorado business' online presence with Samantha Melissa Marketing & Wild Grace Videography. Tailored packages for engaging social media!";

const heading =
  "Wild Grace Videography and Samantha Melissa Marketing are partnering together to provide Colorado businesses with a full-service social media makeover. Elevate your online presence with our tailored packages designed to transform your social media platforms into engaging hubs for your audience.";

const ogIcon = "social-media-og.webp";

const greenColor = "rgba(110, 132, 103, 0.54)";
const beigeColor = "rgba(248, 240, 227, 0.7)";
const addons = [
  {
    bgColor: beigeColor,
    details: [
      "Account setup assistance",
      "Additional Instagram/Facebook accounts",
    ],
  },
  {
    bgColor: beigeColor,
    details: [
      "Additional posts",
      "Daily monitoring and engagement",
      "1 Blog + social media blog post",
      "Additional marketing asset design",
      "Newsletter assistance",
    ],
  },
  {
    bgColor: greenColor,
    details: [
      "Additional photos",
      "Additional short form videos",
      "Long form videos",
      "Animated captions",
      "Talent acquisition",
      "Studio rental",
    ],
  },
];

const packages: Config[] = [
  {
    title: "The Beyond Basics",
    price: 1000,
    elements: [
      {
        bgColor: beigeColor,
        title: "Social Media Management",
        details: [
          "1-Hour consultation",
          "Audit of your social media accounts",
          "Individual strategy tailored to your goals",
          "Content idea calender",
        ],
      },
      {
        bgColor: greenColor,
        title: "Content Creation",
        details: [
          "Half-day (4 hours) on-site photo shoot",
          "30 edited branding photos",
          "One round of revisions",
        ],
      },
    ],
  },
  {
    title: "The Batch Bundle",
    price: 2800,
    elements: [
      {
        bgColor: beigeColor,
        title: "Social Media Management",
        details: [
          "1-2 Instagram and Facebook social media feed & story posts",
          "Social media grahic design",
          "Caption writing",
          "Content scheduling",
          "Hastag optimization",
          "Quarterly performance tracking",
          "Strategy suggestions",
          "1-Hour consultation",
        ],
      },
      {
        bgColor: greenColor,
        title: "Content Creation",
        details: [
          "Half-day (4 hours) on-site video & photo shoot",
          "30 edited branding photos",
          "(8) 15-30 sec social media videos (2 videos/week)",
          "Engaging captions",
          "One round of revisions",
        ],
      },
    ],
  },
  {
    title: "The Bold Breakthrough",
    price: 4500,
    elements: [
      {
        bgColor: beigeColor,
        title: "Social Media Management",
        details: [
          "3-4 Instagram and Facebook social media feed & story posts",
          "Social media grahic design",
          "Caption writing",
          "Content scheduling",
          "Hastag optimization",
          "Quarterly performance tracking",
          "Strategy suggestions",
          "1-Hour consultation",
        ],
      },
      {
        bgColor: greenColor,
        title: "Content Creation",
        details: [
          "Full-day (8 hours) on-site video & photo shoot",
          "30 edited branding photos",
          "(16) 15-30 sec social media videos (4 videos/week)",
          "Engaging captions",
          "One round of revisions",
        ],
      },
    ],
  },
];
</script>
