<template>
  <NuxtLayout :name="layout">
    <StoryblokComponent v-if="story" :blok="story.content" />
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const route = useRoute();
const routeName = route.name!.toString();
const story = await useAsyncStoryblok(routeName, { version: "draft" });
const layout = story.value.content.layout;
</script>
