<template>
  <div
    class="flex items-center w-full max-w-xs p-4 space-x-4 bg-white divide-x divide-gray-200 rounded-lg shadow space-x absolute right-6 transition-top ease-out duration-1000"
    :class="{ 'top-6': show, '-top-24': !show }"
    role="alert"
  >
    <ExclamationCircleIcon
      v-if="type === NotificationType.error"
      class="stroke-red w-6 h-6"
    />
    <div class="ps-4 text-sm text-gray-500">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
import { ExclamationCircleIcon } from "@heroicons/vue/24/outline";
import { NotificationType } from "~/types/component-types";

defineProps<{
  type: NotificationType;
  message: string;
}>();

const show = ref(false);

onMounted(() => {
  const initialDelay = 500;
  setTimeout(() => {
    show.value = true;
  }, initialDelay);
  setTimeout(() => {
    show.value = false;
  }, 5000 + initialDelay);
});
</script>
