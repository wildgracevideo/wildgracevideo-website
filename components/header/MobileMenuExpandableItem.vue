<template>
  <div class="mx-auto w-fit">
    <p class="mx-auto cursor-pointer w-fit mb-2" @click="open = !open">
      {{ config.name }}
      <ChevronDownIcon
        :class="[open ? 'rotate-180' : '', 'h-5 w-5 flex-none']"
        class="inline-block w-8 h-8"
        aria-hidden="true"
      />
    </p>
    <NuxtLink
      v-if="open"
      v-for="item in config.children"
      class="text-lg block mt-1 text-center"
      :to="item.href"
      @click="openMenu = false"
      >{{ item.name }}</NuxtLink
    >
  </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { type HeaderItemConfig } from "./Header.vue";

const props = defineProps<{
  modelValue: boolean;
  config: HeaderItemConfig;
}>();

const emit = defineEmits(["update:modelValue"]);

const openMenu = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const open = ref(false);
</script>
