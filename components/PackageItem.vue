<template>
  <div
    class="rounded-3xl border-y-16 border-l-8 border-r-8 border-custom-green shadow-floating justify-between flex flex-col"
    :class="{ enlarge: enlarge }"
  >
    <div>
      <h3 class="mx-auto text-center w-fit font-bold text-4xl mb-6 h-20 mt-4">
        <span class="font-family-moontime mr-1">{{ firstWord }}</span
        ><span class="font-family-spectral">{{ words }}</span>
      </h3>
      <PackageBubble v-for="item in config.elements" :config="item" />
    </div>
    <div>
      <p class="text-center mt-auto mb-2">Starting at</p>
      <p class="text-2xl text-center mb-4">${{ config.price }}/mo</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Config as PackageBubbleConfig } from "~/components/PackageBubble.vue";

export interface Config {
  title: string;
  price: number;
  elements: PackageBubbleConfig[];
}

const props = defineProps<{
  config: Config;
  enlarge: boolean;
}>();

const wordSplit = props.config.title.split(" ");
const firstWord = wordSplit[0];
const words = wordSplit.slice(1).join(" ");
</script>

<style scoped>
@media (min-width: 1024px) {
  .enlarge {
    transform: scale(1.025);
  }
  .shadow-floating:hover {
    box-shadow: 16px 48px 96px 24px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }
}
</style>
