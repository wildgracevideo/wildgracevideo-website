<template>
    <div class="bg-img w-full mb-16 flex flex-col items-center justify-center gap-8">
        <h1 class="max-w-md text-4xl text-white font-family-optimus text-center tracking-wide">welcome to the place where you get all of the content creation resources right at your fingertips.</h1>
        <ChevronDownIcon class="w-16 h-16 text-white cursor-pointer" @click="scrollDown" />
    </div>
    <h2 class="text-4xl mb-8 text-center" ref="heading">BROWSE ALL</h2>
    <div class="grid lg:grid-cols-2 grid-cols-1 gap-8 mx-8 mb-8 text-center">
        <div v-for="shopItem in shopItems" :key="shopItem.title">
            <NuxtLink :to="shopItem.url" class="rounded-xl block relative overflow-hidden bg-no-repeat bg-cover w-fit max-h-96 mb-8 mx-auto shadow-floating">
                <img :src="shopItem.imageSrc" class="aspect-square max-h-96">
                  <div class="absolute top-0 right-0 bottom-0 left-0 overflow-hidden opacity-0"/>
            </NuxtLink>
            <h3 class="text-lg mb-4 max-w-sm mx-auto h-14">{{ shopItem.title }} </h3>
            <p class="max-w-sm mx-auto text-sm mb-4">{{ shopItem.description }} </p>
            <p class="max-w-sm mx-auto">
                <span class="line-through decoration-2">${{shopItem.originalPriceDollars}}</span> 
                ${{ shopItem.priceDollars }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ChevronDownIcon } from "@heroicons/vue/20/solid";

    const heading: Ref<HTMLElement | null> = ref(null);

    const scrollDown = () => {
        heading.value?.scrollIntoView({ behavior: "smooth" });
    };

    const shopItems = [
        {
            imageSrc: "/interior-designers-icon.webp",
            title: "30-Day Video Transformation for Interior Designers",
            description: "Boost Your Social Media Presence with 37 Engaging Reel Ideas and a Content Planner. Share Your Journey, Build Trust, and Watch Your Audience Grow in 30 Days.",
            priceDollars: 7,
            originalPriceDollars: 15,
            url: "/video-transformation-for-interior-designers",
        },
        {
            imageSrc: "/37-reel-ideas.webp",
            title: "30-Day Video Transformation",
            description: "Boost Your Social Media Presence with 37 Engaging Reel Ideas for Interior Designers and a Content Planner. Share Your Interior Design Journey, Build Trust, and Watch Your Audience Grow in 30 Days.",
            priceDollars: 0,
            originalPriceDollars: 15,
            url: "/30-day-video-transformation",
        }
    ];
</script>

<style scoped>
.bg-img {
  background-image: url("/shop-cover.webp");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 500px
}

@media (min-width: 1024px) {
  .shadow-floating:hover {
    box-shadow: 8px 24px 48px 12px rgba(0, 0, 0, 0.2);
  }
}
</style>
