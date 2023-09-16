<template>
  <svg
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    :width="width"
    :height="height"
  >
    <defs>
      <symbol id="email-icon" viewBox="0 0 100 100">
        <path
          d="M17,22v20h30V22H17z M41.1,25L32,32.1L22.9,25H41.1z M20,39V26.6l12,9.3l12-9.3V39H20z"
        ></path>
      </symbol>
    </defs>
    <g :fill="fill">
      <path
        d="M17,22v20h30V22H17z M41.1,25L32,32.1L22.9,25H41.1z M20,39V26.6l12,9.3l12-9.3V39H20z"
      ></path>
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  height: number;
  width: number;
  fill: string;
}>();
</script>
