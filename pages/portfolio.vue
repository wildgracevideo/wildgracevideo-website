<template>
  <div>
    <h1 class="text-center text-6xl mb-8">Portfolio</h1>
    <iframe
      :src="mainVideoURL"
      title="Main Portofilio video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      class="px-8 lg:mx-auto w-full main-video-container"
    ></iframe>
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-x-16 mx-16 mt-32 mb-16">
      <div v-for="item in videos" class="video-container mx-auto">
        <iframe
          width="100%"
          :src="item.url"
          :title="item.name"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          class="video"
        >
        </iframe>
        <h2 class="text-lg font-bold mt-4">{{ item.name }}</h2>
        <h3 class="mt-2 mb-16">{{ item.description }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const mainVideoURL = "https://youtube.com/embed/yWjmuJ_6mkA";

const videos = [
  {
    name: "The Curtis Hotel",
    description: "Teaser/Promo Video",
    url: "https://www.youtube.com/embed/ieRb3ZCgPwk",
  },
  {
    name: "Genesee Nutrition",
    description: "Website Video",
    url: "https://www.youtube.com/embed/ZVYOhYmYn3w",
  },
  {
    name: "Madlom Real Estate",
    description: "Staff Recruitment Video",
    url: "https://www.youtube.com/embed/jXGrsa0MZWo",
  },
  {
    name: "KB Digital Designs",
    description: "Creative Promotional Video",
    url: "https://www.youtube.com/embed/mzGrOYT7viE",
  },
  {
    name: "Nordica Spec Ad",
    description: "Creative Commercial",
    url: "https://www.youtube.com/embed/FEHxRKq0220",
  },
  {
    name: "Big Island, Hawaii",
    description: "Travel & Tourism Video",
    url: "https://www.youtube.com/embed/-9b9t_bAEz8",
  },
];
</script>

<style scoped>
.video-container {
  max-width: 490px;
  width: 100%;
}
.video {
  aspect-ratio: 2/1;
}
.main-video-container {
  max-width: 883px;
  aspect-ratio: 2 / 1;
}
</style>
