<template>
  <header class="text-lg">
    <div class="lg:flex hidden">
      <NuxtLink
        to="/"
        @click="
          () => {
            openMenu = !openMenu;
          }
        "
      >
        <img
          class="mr-10 ml-8 mt-3 mb-8 font-size-0"
          width="138"
          height="90"
          src="/logo1.webp"
          :alt="imageAlt"
        />
      </NuxtLink>
      <nav class="mt-12">
        <NuxtLink class="mr-8" to="/portfolio">Portfolio</NuxtLink>
        <NuxtLink class="mr-8" to="/about">About</NuxtLink>
        <NuxtLink class="mr-8" to="/get-started">Get Started</NuxtLink>
        <NuxtLink to="/30-day-video-transformation">Shop</NuxtLink>
      </nav>
      <a
        class="ml-auto mt-8 block"
        href="https://www.instagram.com/wildgracevideo/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <Instagram :fill="iconFill" :height="iconSize" :width="iconSize" />
      </a>
      <a
        class="mt-11 -mr-8"
        href="https://www.linkedin.com/in/carly-kreiger-a391a8133/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Linkedin"
      >
        <Linkedin :fill="iconFill" :height="iconSize" :width="iconSize" />
      </a>
      <a
        class="mt-8 -mr-6"
        href="https://www.facebook.com/wildgracevideo/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
      >
        <Facebook :fill="iconFill" :height="iconSize" :width="iconSize" />
      </a>
      <a
        class="mt-8"
        href="mailto:carly@wildgracevideography.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Email"
      >
        <Email :fill="iconFill" :height="iconSize" :width="iconSize" />
      </a>
    </div>
    <div
      class="flex lg:hidden justify-between"
      :class="{ 'bg-website-green': openMenu }"
    >
      <NuxtLink
        class="z-20"
        to="/"
        @click="
          () => {
            openMenu = !openMenu;
          }
        "
      >
        <img
          class="mt-3 mr-3 ml-8 mb-8 font-size-0"
          width="138"
          height="90"
          src="/logo1.webp"
          :alt="imageAlt"
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

const imageAlt = "Wild Grace Videography company logo.";

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
