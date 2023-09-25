<template>
  <OgMeta :title="pageTitle" :description="description" />
  <SchemaOrgWebPage :name="pageTitle" />
  <div>
    <h1 class="text-center text-4xl mb-8">Video Production Portfolio</h1>
    <div
      class="aspect-ratio lg:mx-auto px-8 portfolio-page-main-video-container"
    >
      <LazyYoutube
        :video-id="mainVideo.id"
        :title="mainVideo.name"
        video-class="w-full aspect-video"
        image-class="w-full aspect-video"
        :alt="mainVideo.alt"
      />
    </div>
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-x-16 mx-16 mt-32 mb-16">
      <div
        v-for="item in videos"
        class="portfolio-page-video-container w-full mx-auto"
      >
        <LazyYoutube
          :video-id="item.id"
          :alt="item.alt"
          video-class="aspect-video"
          image-class="aspect-video portfolio-animatable-video fade-out"
          :title="item.name"
        />
        <h2 class="text-lg font-bold mt-4">{{ item.name }}</h2>
        <h3 class="mt-2 mb-16">{{ item.description }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LazyYoutube from "~/components/LazyYoutube.vue";
import OgMeta from "~/components/OgMeta.vue";

const pageTitle =
  "About Wild Grace Videography | Denver Video Production Company";
const description =
  "View the portfolio for Wild Grace Videography, a Denver, Colorado-based video production company, that produces creative and memorable video content to make your business stand out.";

useHead({
  title: pageTitle,
});

const mainVideo = {
  id: "yWjmuJ_6mkA",
  name: "Video Production Portfolio",
  alt: "Video reel showcasing the work of Wild Grace Videography.",
};

const videos = [
  {
    name: "The Curtis Hotel",
    description: "Teaser/Promo Video",
    id: "ieRb3ZCgPwk",
    alt: "Promotion video created by Wild Grace Videography for the Curtis Hotel.",
  },
  {
    name: "Genesee Nutrition",
    description: "Website Video",
    id: "ZVYOhYmYn3w",
    alt: "Website video created by Wild Grace Videography Genesee Nutrition.",
  },
  {
    name: "Madlom Real Estate",
    description: "Staff Recruitment Video",
    id: "jXGrsa0MZWo",
    alt: "A staff recruitment video created by Wild Grace Videography Madlom Real Estate",
  },
  {
    name: "KB Digital Designs",
    description: "Creative Promotional Video",
    id: "mzGrOYT7viE",
    alt: "A promotional video created by Wild Grace Videography KB Digital Designs.",
  },
  {
    name: "Nordica Spec Ad",
    description: "Creative Commercial",
    id: "FEHxRKq0220",
    alt: "A spec ad created by Wild Grace Videography highlighting Nordica ski equipment.",
  },
  {
    name: "Big Island, Hawaii",
    description: "Travel & Tourism Video",
    id: "-9b9t_bAEz8",
    alt: "A travel video created by Wild Grace Videography showcasing the Big Island of Hawaii.",
  },
];

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    console.log(entries);
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting) {
        entry.target.classList.remove("fade-out");
        entry.target.classList.add("fade-in");
      } else {
        entry.target.classList.remove("fade-in");
        entry.target.classList.add("fade-out");
      }
    });
  });

  const animatableElements = document.querySelectorAll(
    ".portfolio-animatable-video"
  );
  animatableElements.forEach((element) => observer.observe(element));
});
</script>

<style scoped>
.portfolio-page-video-container {
  max-width: 490px;
}
.portfolio-page-main-video-container {
  max-width: 883px;
}
</style>
