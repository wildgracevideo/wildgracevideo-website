<template>
  <div
    class="h-8 w-10 cursor-pointer relative three-bar-wrapper z-20 ml-auto mr-10 block lg:hidden"
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
</template>

<script setup lang="ts">
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
.one {
  animation-delay: 0.1s;
}
.one,
.two {
  transition: all 0.3s;
}
.three-bar-wrapper:hover .three-bar-wrapper.active {
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
