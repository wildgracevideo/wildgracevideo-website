<template>
  <OgMeta :title="pageTitle" :description="description" />
  <SchemaOrgWebPage type="ItemPage" :name="pageTitle" />
  <h1 class="mx-auto text-4xl text-center">Video Content That Converts</h1>
  <h2 class="text-2xl w-fit mx-auto mt-10 mb-6 text-center">
    Social Media Video Packages
  </h2>
  <div class="mx-8 lg:mx-auto max-w-6xl text-center">
    <p class="mb-4">
      Elevate your social media presence effortlessly. Say goodbye to the daily
      grind of staying top-of-mind. Picture waking up excited to focus on your
      business, relieved from the stress of constant social media upkeep.
    </p>
    <p class="mb-4">
      Get a fresh batch of professionally crafted videos with a simple click,
      freeing you from last-minute content hassles.
    </p>
    <p>
      Join the "Video Content that Converts" Program for full control of your
      social media presence. Each month, enjoy:
    </p>
    <ul class="mt-4 mb-8 w-fit mx-8 lg:mx-auto">
      <li
        v-for="item in headingItems"
        class="list-disc list-item w-fit text-left"
      >
        {{ item }}
      </li>
    </ul>
  </div>

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
  <p class="text-center my-8">
    All packages include a 14-day turnaround & 1 round of revisions.
  </p>
</template>

<script setup lang="ts">
const pageTitle = "Wild Grace Videography | Video Content That Converts";
const description =
  "Streamline your social media presence effortlessly. Experience monthly expertly crafted videos with our 'Video Content that Converts' program.";

const headingItems = [
  "🎥 Dedicated filming day",
  "🗣️ Content strategy session",
  "📝 Custom content outline",
  "🎬 Polished video content delivered to your inbox",
];

const packages = [
  {
    title: "The Starter",
    price: 750,
    description:
      "This gets your video presence in the game. Perfect for emerging startups",
    elements: [
      "Content provided by client",
      "(5) 15-30 sec social media edits",
      "Engaging captions",
      "30-min content strategy session",
    ],
  },
  {
    title: "The Competitor",
    price: 1750,
    description:
      "Perfect for brands to grow their social presence and deliver valuable & consistent content for their audience",
    elements: [
      "1 Half-day video shoot (5 hrs)",
      "(4) iPhone-filmed 15-30 sec social media edits",
      "(4) Professional 15-30 sec social media edits",
      "Engaging captions",
      "1-Hour content strategy session",
    ],
  },
  {
    title: "The Elite",
    price: 3000,
    description:
      "Ideal for brands seeking to create engaging content to grow brand awareness, audience trust, and stand out from the competition.",
    elements: [
      "1 Full-day video shoot (10 hrs)",
      "(8) iPhone-filmed 15-30 sec social media edits",
      "(8) Professional 15-30 sec social media edits",
      "Engaging captions",
      "1-Hour content strategy session",
    ],
  },
];
</script>
