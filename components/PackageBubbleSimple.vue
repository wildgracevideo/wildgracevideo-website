<template>
  <div class="rounded-3xl text-base m-4 py-4 pl-4 pr-2">
    <ul class="px-4">
      <li v-for="detail in details" class="list-disc list-item">
        {{ detail }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  details: string[];
}>();
</script>
