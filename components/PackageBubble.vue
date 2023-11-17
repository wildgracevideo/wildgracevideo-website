<template>
  <div
    class="rounded-3xl text-base m-4 py-4 pl-4 pr-2"
    :style="{ 'background-color': config.bgColor }"
  >
    <h4 v-if="config.title" class="font-bold w-fit mx-auto">
      {{ config.title }}
    </h4>
    <div v-if="config.title" class="h-0.5 bg-black mx-2 mb-4" />
    <ul class="px-4">
      <li v-for="detail in config.details" class="list-disc list-item">
        {{ detail }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
export interface Config {
  title?: string;
  details: string[];
  bgColor: string;
}

defineProps<{
  config: Config;
}>();
</script>
