<template>
  <OgMeta :title="pageTitle" :description="description" />
  <SchemaOrgWebPage :name="pageTitle" />
  <SchemaOrgVideo
    :name="videoTitle"
    url="https://d22668h9qdy3zj.cloudfront.net/wgv-reel.mp4"
    description="Main video reel showcasing the work of Wild Grace Videography, a Denver, Colorado-based video production company."
  />
  <SchemaOrgComment
    :author="{ name: 'Cecilia Mims, Clay Love' }"
    :text="firstReviewText"
  />
  <SchemaOrgComment
    :author="{ name: 'Justin Little, Blue J Cones' }"
    :text="secondReviewText"
  />
  <video
    class="w-full max-w-full aspect-video -mt-4 pointer-events-none cursor-default"
    autoplay
    muted
    loop
    disablePictureInPicture
    playsinline
    :title="videoTitle"
  >
    <source
      src="https://d22668h9qdy3zj.cloudfront.net/wgv-reel.mp4"
      type="video/mp4"
    />
  </video>
  <div
    class="grid md:grid-cols-2 grid-cols-1 gap-x-8 mx-16 md:my-12 leading-loose"
  >
    <div class="md:my-0 my-12">
      <p>&#x301D;{{ firstReviewText }}&#x301E;</p>
      <p class="mx-4">Cecelia Mims, Clay Love</p>
    </div>
    <div class="md:my-0 my-12">
      <p>
        &#x301D;Above and beyond our expectations of quality! The creative
        talent at Wild Grace Videography produced visuals that
        <span class="italic">beautifully</span>
        represent who we are as a brand. The whole process was incredibly easy;
        we simply sent in our product, and the rest was taken care of. I
        wouldn't recommend anyone else!&#x301E;
      </p>
      <p class="mx-4">Justin Little, Blue J Cones</p>
    </div>
  </div>
</template>

<script setup lang="ts">
let firstReviewText =
  "It has been a pleasant and fruitful experience working with Carly. She has developed material that has met my expectations and more. Thank you Carly for helping me with my media needs and in a timely manner.";
let secondReviewText =
  "Above and beyond our expectations of quality! The creative talent at Wild Grace Videography produced visuals that beautifully represent who we are as a brand. The whole process was incredibly easy we simply sent in our product, and the rest was taken care of. I wouldn't recommend anyone else!";
const videoTitle = "Video reel showcasing the work of Wild Grace Videography.";

const pageTitle = "Wild Grace Videography | Denver Video Production Company";
const description =
  "Wild Grace Videography is a Denver, Colorado-based video production company that produces creative and memorable video content to make your business stand out.";

useHead({
  title: pageTitle,
});
</script>
