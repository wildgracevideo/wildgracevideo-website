<template>
  <header class="w-60 bg-website-green text-website-off-white min-h-dvh">
    <span class="sr-only">Wild Grace Videography</span>
    <NuxtLink to="/admin">
      <img
        class="mr-10 ml-4 mb-8 mt-4 text-0"
        width="69"
        height="45"
        src="/logo1.webp"
        :alt="imageAlt"
      />
    </NuxtLink>
    <NuxtLink
      v-for="element in elements"
      :to="element.to"
      class="flex items-center ml-4 mb-4"
    >
      <component :is="element.icon" class="w-5 h-5" />
      <p class="ml-1 text-lg">{{ element.title }}</p>
    </NuxtLink>
  </header>
</template>

<script setup lang="ts">
import { InboxIcon, CreditCardIcon } from "@heroicons/vue/24/outline";

const imageAlt = "Wild Grace Videography company logo.";
const elements = [
  {
    icon: InboxIcon,
    title: "Messages",
    to: "/admin/messages",
  },
  {
    icon: CreditCardIcon,
    title: "Purchases",
    to: "/admin/purchases",
  },
];
</script>
