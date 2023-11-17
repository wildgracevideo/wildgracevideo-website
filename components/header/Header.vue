<template>
  <header
    :class="{
      'bg-website-green': openMenu,
      'h-dvh': openMenu,
      'overflow-hidden': openMenu,
    }"
  >
    <nav class="flex items-center" aria-label="Global">
      <NuxtLink
        to="/"
        @click="
          () => {
            openMenu = false;
          }
        "
      >
        <span class="sr-only">Wild Grace Videography</span>
        <img
          class="mr-10 ml-8 mt-3 mb-8 text-0"
          width="138"
          height="90"
          src="/logo1.webp"
          :alt="imageAlt"
        />
      </NuxtLink>
      <PopoverGroup class="hidden lg:flex lg:gap-x-12">
        <component v-for="item in items" :is="item.type" :config="item" />
      </PopoverGroup>
      <NuxtLink
        class="h-12 w-32 text-md hidden lg:flex ml-auto mr-8 items-center cursor-pointer text-center block rounded-xl border-2 px-auto text-website-off-white border-website-green bg-website-green hover:text-website-green hover:bg-website-off-white"
        to="/get-started"
      >
        <p class="mx-auto">Get Started</p>
      </NuxtLink>
      <HeaderMobileMenuToggle v-model="openMenu" />
    </nav>
    <HeaderMobileMenu v-model="openMenu" :items="items" />
  </header>
</template>

<script setup lang="ts">
import { PopoverGroup } from "@headlessui/vue";
import { DevicePhoneMobileIcon } from "@heroicons/vue/24/outline";
import HeaderItemDropdown from "~/components/header/HeaderItemDropdown.vue";
import HeaderItem from "~/components/header/HeaderItem.vue";
import type {
  FunctionalComponent,
  HTMLAttributes,
  VNodeProps,
} from "nuxt/dist/app/compat/capi";

const imageAlt = "Wild Grace Videography company logo.";

export interface HeaderItemConfig {
  name: string;
  href?: string;
  type: any;
  children?: {
    name: string;
    description: string;
    href: string;
    icon: FunctionalComponent<HTMLAttributes & VNodeProps>;
  }[];
}

const items: HeaderItemConfig[] = [
  {
    name: "Portfolio",
    href: "/portfolio",
    type: HeaderItem,
  },
  {
    name: "Who We Are",
    href: "/who-we-are",
    type: HeaderItem,
  },
  {
    name: "Services",
    type: HeaderItemDropdown,
    children: [
      {
        name: "Social Media Packages",
        description: "Transform your online presence",
        href: "/social-media-packages",
        icon: DevicePhoneMobileIcon,
      },
    ],
  },
  {
    name: "Shop",
    href: "/30-day-video-transformation",
    type: HeaderItem,
  },
];

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
