<template>
  <OgMeta :title="pageTitle" :description="description" />
  <SchemaOrgWebPage type="AboutPage" :name="pageTitle" />
  <SchemaOrgImage
    :name="imageTitle"
    url="/Carly1.webp"
    :description="imageDescription"
  />
  <div class="grid grid-cols-1 md:grid-cols-2 mb-16">
    <article
      class="mt-16 md:ml-24 ml-8 mr-8 md:mr-16 leading-loose text fade-in-left order-last md:order-first"
    >
      <p>
        I'm Carly, and creating videos is my thing. After graduating from the
        University of Vermont (Go Catamounts!) I made the decision to pack my
        bags and fly out west—and now call Denver, Colorado my home.
      </p>
      <br />
      <p>
        Ever since I was little, I have always found passion and excitement
        through creating videos. From creating embarrassing movie trailers with
        my friends when I was younger, to putting together creative travel
        videos from my semester abroad in New Zealand, and compiling footage of
        the ranch I worked at in Wyoming. Creating videos as a “souvenir” from
        moments through life has always been important to me.
      </p>
      <br />
      <p>
        At Wild Grace Videography, I am focused on providing detailed and
        personalized videos to match your brand and relay your message in a
        professional, yet exciting style.
      </p>
      <br />
      <p>
        I am outgoing in my video style and always exploring new ways to capture
        the viewer's eye and enhance my video style—WILD.
      </p>
      <br />
      <p>
        I focus on providing my clients with a smooth and enjoyable experience
        to create a lasting partnership that embodies trust and
        positivity—GRACE.
      </p>
      <br />
      <p>
        I feel beyond fortunate that I have been able to combine my love for
        creativity and video into my own business. They say if you choose a job
        you love, you will never work a day in your life. And that's why I made
        video my thing.
      </p>
    </article>
    <div class="mx-8 order-first md:order-last">
      <img
        src="/Carly1.webp"
        class="max-w-4xl aspect-125 w-full font-size-0 fade-in-right"
        :alt="imageDescription"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import OgMeta from "~/components/OgMeta.vue";

const imageTitle = "Picture of Carly Kreiger.";
const imageDescription =
  "A picture of Carly Kreiger, the founder of Wild Grace Videography.";

const pageTitle =
  "About Wild Grace Videography | Denver Video Production Company";
const description =
  "Learn more about Wild Grace Videography, a Denver, Colorado-based video production company, that creates memorable videos to make your business stand out.";

useHead({
  title: pageTitle,
});
</script>
