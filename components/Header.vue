import { space } from 'postcss/lib/list';
<template>
  <header class="text-lg">
    <div class="md:flex hidden">
      <NuxtLink to="/" v-slot="{ navigate }">
        <img
          class="mr-10 ml-8 mt-3 mb-8"
          width="138"
          height="90"
          src="/logo1.webp"
          :alt="imageAlt"
          @click="navigate"
        />
      </NuxtLink>
      <NuxtLink class="mt-12 mr-8" to="/">Home</NuxtLink>
      <NuxtLink class="mt-12 mr-8" to="/portfolio">Portfolio</NuxtLink>
      <NuxtLink class="mt-12 mr-8" to="/about">About</NuxtLink>
      <NuxtLink class="mt-12" to="/get-started">Get Started</NuxtLink>
      <a
        class="ml-auto mt-8 block"
        href="https://www.instagram.com/wildgracevideo/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Instagram :fill="iconFill" :height="iconSize" :width="iconSize" />
      </a>
      <a
        class="mt-8"
        href="https://www.facebook.com/wildgracevideo/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Facebook :fill="iconFill" :height="iconSize" :width="iconSize" />
      </a>
      <a
        class="mt-8"
        href="mailto:carly@wildgracevideography.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Email :fill="iconFill" :height="iconSize" :width="iconSize" />
      </a>
    </div>
    <div
      class="flex md:hidden justify-between"
      :class="{ 'opened-menu': openMenu }"
    >
      <NuxtLink to="/" v-slot="{ navigate }" class="z-20">
        <img
          class="mt-3 mr-3 ml-8 mb-8"
          width="138"
          height="90"
          src="/logo1.webp"
          :alt="imageAlt"
          @click="navigate"
        />
      </NuxtLink>
      <Menu v-model="openMenu" />
    </div>
  </header>
</template>

<script setup lang="ts">
import Instagram from "./Instagram.vue";
import Facebook from "./Facebook.vue";
import Email from "./Email.vue";
import Menu from "./Menu.vue";

const iconSize = 80;
const iconFill = "#000";

const imageAlt =
  "Wild Grace Videography company logo, a Denver Colorado based Video Production compan.";

const props = defineProps<{
  modelValue: boolean;
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
</script>

<style scoped>
.opened-menu {
  background-color: #757263;
}
</style>
