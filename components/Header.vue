import { space } from 'postcss/lib/list';
<template>
  <header class="text-lg">
    <div class="md:flex hidden">
      <NuxtLink to="/" v-slot="{ navigate }">
        <img
          class="-mt-12 mr-3"
          width="200"
          height="160"
          src="/logo1.webp"
          @click="navigate"
        />
      </NuxtLink>
      <NuxtLink class="mt-14 mr-8" to="/">Home</NuxtLink>
      <NuxtLink class="mt-14 mr-8" to="/portfolio">Portfolio</NuxtLink>
      <NuxtLink class="mt-14 mr-8" to="/about">About</NuxtLink>
      <NuxtLink class="mt-14" to="/get-started">Get Started</NuxtLink>
      <a
        class="ml-auto mt-12 block"
        href="https://www.instagram.com/wildgracevideo/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Instagram :fill="iconFill" :height="iconSize" :width="iconSize" />
      </a>
      <a
        class="mt-12"
        href="https://www.facebook.com/wildgracevideo/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Facebook :fill="iconFill" :height="iconSize" :width="iconSize" />
      </a>
      <a
        class="mt-12"
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
          class="-mt-12 mr-3"
          width="200"
          height="160"
          src="/logo1.webp"
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
