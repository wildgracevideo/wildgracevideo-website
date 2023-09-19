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
    class="pt-44 absolute min-h-screen w-full opened-menu text-4xl z-10 flex flex-col justify-between"
  >
    <div class="flex flex-col">
      <NuxtLink class="mx-auto w-fit block" to="/" @click="openMenu = !openMenu"
        >Home</NuxtLink
      >
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
        class="mt-8 w-fit mx-auto block mb-auto"
        to="/get-started"
        @click="openMenu = !openMenu"
        >Get Started</NuxtLink
      >
    </div>
    <div class="mx-auto flex flex-row justify-center mt-8">
      <a
        href="https://www.instagram.com/wildgracevideo/"
        target="_blank"
        rel="noopener noreferrer"
        class="pl-8"
      >
        <Instagram :fill="iconFill" :height="iconSize" :width="iconSize" />
      </a>
      <a
        href="https://www.facebook.com/wildgracevideo/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Facebook :fill="iconFill" :height="iconSize" :width="iconSize" />
      </a>
      <a
        href="mailto:carly@wildgracevideography.com"
        target="_blank"
        rel="noopener noreferrer"
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
const iconFill = "#d9c5b7";

const emit = defineEmits(["update:modelValue"]);

const openMenu = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const convertStyle = () => {
  const height = window.innerHeight;
  Array.from(document.getElementsByClassName("min-h-screen")).forEach(
    (it) => ((it as HTMLElement).style.minHeight = `${height}px`)
  );
  window.addEventListener("DOMContentLoaded", convertStyle);
};
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
  background-color: #d9c5b7;
}
.active .two {
  top: 25%;
  left: 0%;
  transform: rotate(-45deg);
  background-color: #d9c5b7;
}
.opened-menu {
  background-color: #757263;
  color: #d9c5b7;
}
</style>
