<template>
  <label :for="name" class="text-sm block" :class="titleTextClass"
    >{{ title
    }}<span class="opacity-50" :class="{ hidden: !(showRequired || true) }">
      (required)</span
    ></label
  >
  <input
    type="text"
    :id="name"
    class="block text-xl h-11 w-full"
    :class="{ 'border-2': showError, 'border-red-700': showError }"
    v-model="value"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  title: string;
  name: string;
  isRequired: boolean;
  titleTextClass: string;
  modelValue: string;
  showRequired: boolean;
}>();
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const showError = computed({
  get() {
    return props.isRequired && !value.value;
  },
  set(value) {},
});
</script>
