<template>
  <div
    class="rounded-3xl border-y-16 border-l-8 border-r-8 border-custom-green shadow-floating justify-between flex flex-col"
    :class="{ enlarge: enlarge }"
  >
    <div>
      <h3 class="mx-auto text-center w-fit font-bold text-4xl mb-6 mt-4">
        <span class="font-family-moontime mr-1">{{ firstWord }}</span
        ><span class="font-family-spectral">{{ words }}</span>
      </h3>
      <p class="text-center mx-4">{{ config.description }}</p>
      <div v-if="config.description" class="h-0.5 bg-black mx-8 my-4" />
      <template v-if="isPackageBubble">
        <PackageBubble
          v-for="item in config.elements"
          :config="item as PackageBubbleConfig"
        />
      </template>
      <PackageBubbleSimple :details="config.elements as string[]" />
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
  description?: string;
  title: string;
  price: number;
  elements: PackageBubbleConfig[] | string[];
}

const props = defineProps<{
  config: Config;
  enlarge: boolean;
}>();

let isPackageBubble: boolean;
try {
  isPackageBubble = "title" in (props.config.elements[0] as any);
} catch (e) {
  isPackageBubble = false;
}

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
