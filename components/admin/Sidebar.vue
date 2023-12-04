<template>
  <header class="hidden lg:block w-60 bg-website-green text-website-off-white min-h-dvh">
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
  <header class="flex lg:hidden justify-between w-full h-16 bg-website-green">
    <span class="sr-only">Wild Grace Videography</span>
    <NuxtLink to="/admin">
      <img
        class="mr-10 ml-4 mb-8 my-2 text-0"
        width="69"
        height="45"
        src="/logo1.webp"
        :alt="imageAlt"
      />
    </NuxtLink>
    <div class="mt-4">
      <HeaderMobileMenuToggle v-model="openMenu" /> 
    </div>
  </header>
  <section v-if="openMenu" class="header-full-height bg-website-green">
    <NuxtLink
      v-for="element in elements"
      :to="element.to"
      class="flex items-center mb-4 text-center text-white mx-auto mt-8 w-fit"
      @click="openMenu = !openMenu"
    >
      <component :is="element.icon" class="w-8 h-8" />
      <p class="ml-4 text-4xl">{{ element.title }}</p>
    </NuxtLink>
  </section>
</template>

<script setup lang="ts">
import { InboxIcon, CreditCardIcon } from "@heroicons/vue/24/outline";

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

<style scoped>
.header-full-height {
    min-height: calc(100dvh - 64px);
}
</style>
