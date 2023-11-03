<template>
  <div class="my-12 mr-8">
    <div
      class="h-full w-10 cursor-pointer relative menu-wrapper z-20"
      @click="openMenu = !openMenu"
      :class="{ active: openMenu }"
    >
      <div class="absolute h-1 w-full bg-black top-0 one"></div>
      <div class="absolute h-1 w-full bg-black top-3 two"></div>
      <div
        class="absolute h-1 w-full bg-black top-6"
        :class="{ 'fade-out': openMenu, 'fade-in': !openMenu }"
      ></div>
    </div>
  </div>
  <div
    v-if="openMenu"
    class="pt-44 absolute min-h-dvh w-full bg-website-green text-website-off-white text-4xl z-10 flex flex-col justify-between"
  >
    <nav class="flex flex-col">
      <NuxtLink
        class="mt-8 w-fit mx-auto block"
        to="/portfolio"
        @click="openMenu = !openMenu"
        >Portfolio</NuxtLink
      >
      <NuxtLink
        class="mt-8 w-fit mx-auto block"
        to="/about"
        @click="openMenu = !openMenu"
        >About</NuxtLink
      >
      <NuxtLink
        class="mt-8 w-fit mx-auto block"
        to="/get-started"
        @click="openMenu = !openMenu"
        >Get Started</NuxtLink
      >
      <NuxtLink
        class="mt-8 w-fit mx-auto block mb-auto"
        to="/30-day-video-transformation"
        @click="openMenu = !openMenu"
        >Shop</NuxtLink
      >
    </nav>
    <div class="mx-auto flex flex-row justify-center mt-8">
      <a
        href="https://www.instagram.com/wildgracevideo/"
        target="_blank"
        rel="noopener noreferrer"
        class="pl-8"
        aria-label="Instagram"
      >
        <Instagram :fill="iconFill" :height="iconSize" :width="iconSize" />
      </a>
      <a
        href="https://www.linkedin.com/in/carly-kreiger-a391a8133/"
        target="_blank"
        rel="noopener noreferrer"
        class="pl-8 mt-3"
        aria-label="Linkedin"
      >
        <Linkedin :fill="iconFill" :height="iconSize" :width="iconSize" />
      </a>
      <a
        href="https://www.facebook.com/wildgracevideo/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
      >
        <Facebook :fill="iconFill" :height="iconSize" :width="iconSize" />
      </a>
      <a
        href="mailto:carly@wildgracevideography.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Email"
      >
        <Email :fill="iconFill" :height="iconSize" :width="iconSize" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
}>();

const iconSize = 80;
const iconFill = "rgb(var(--color-website-off-white))";

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
    if (window.innerWidth >= 768) {
      openMenu.value = false;
    }
  });
});
</script>

<style scoped>
.one {
  animation-delay: 0.1s;
}
.one,
.two {
  transition: all 0.3s;
}
.menu-wrapper:hover .menu-bar.active {
  animation: none;
}
.active .one {
  top: 25%;
  left: 0%;
  transform: rotate(45deg);
  background-color: rgb(var(--color-website-off-white));
}
.active .two {
  top: 25%;
  left: 0%;
  transform: rotate(-45deg);
  background-color: rgb(var(--color-website-off-white));
}
</style>
