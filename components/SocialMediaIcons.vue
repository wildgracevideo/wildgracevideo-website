<template>
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
</template>

<script setup lang="ts">
defineProps<{
  iconFill: string;
  iconSize: number;
}>();
</script>
