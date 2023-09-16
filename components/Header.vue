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
      <a
        class="ml-auto mt-12 block"
        href="https://www.instagram.com/wildgracevideo/"
      >
        <Instagram :fill="iconFill" :height="iconSize" :width="iconSize" />
      </a>
      <a class="mt-12" href="https://www.facebook.com/wildgracevideo/">
        <Facebook :fill="iconFill" :height="iconSize" :width="iconSize" />
      </a>
      <a class="mt-12" href="mailto:carly@wildgracevideography.com">
        <Email :fill="iconFill" :height="iconSize" :width="iconSize" />
      </a>
    </div>
    <div class="flex md:hidden justify-between">
      <NuxtLink to="/" v-slot="{ navigate }">
        <img
          class="-mt-12 mr-3"
          width="200"
          height="160"
          src="/logo1.webp"
          @click="navigate"
        />
      </NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import Instagram from "./Instagram.vue";
import Facebook from "./Facebook.vue";
import Email from "./Email.vue";

const iconSize = 80;
const iconFill = "#000";
</script>
