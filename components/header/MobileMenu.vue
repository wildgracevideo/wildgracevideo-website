<template>
  <div
    v-if="openMenu"
    class="w-full bg-website-green text-website-off-white text-4xl z-20 flex flex-col justify-between h-full -mt-32 pt-32"
  >
    <nav class="flex flex-col gap-8">
      <template v-for="item in items">
        <HeaderMobileMenuExpandableItem
          v-if="item.children"
          v-model="openMenu"
          :config="item"
        />
        <NuxtLink
          v-else
          class="w-fit mx-auto block"
          :to="item.href"
          @click="openMenu = false"
        >
          {{ item.name }}
        </NuxtLink>
      </template>
      <NuxtLink
        class="h-16 w-60 mx-auto flex items-center cursor-pointer text-center block rounded-xl border-2 px-auto text-website-green border-website-off-white bg-website-off-white hover:text-website-off-white hover:bg-website-green"
        to="/get-started"
        @click="openMenu = false"
      >
        <p class="mx-auto">Get Started</p>
      </NuxtLink>
    </nav>
    <SocialMediaIcons
      icon-fill="rgb(var(--color-website-off-white))"
      class="mt-auto"
      :icon-size="80"
    />
  </div>
</template>

<script setup lang="ts">
import { type HeaderItemConfig } from "./Header.vue";

const props = defineProps<{
  modelValue: boolean;
  items: HeaderItemConfig[];
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

onMounted(() => {
  window.addEventListener("resize", (event) => {
    if (window.innerWidth >= 1024) {
      openMenu.value = false;
    }
  });
});
</script>
