<template>
  <div :class="containerClass">
    <label :for="id" class="text-sm block mb-2" :class="titleTextClass"
      >{{ title }} <span class="opacity-50"> (required)</span></label
    >
    <textarea
      :rows="rows"
      :id="id"
      class="block text-xl w-full p-2"
      :class="{ 'border-2': showError, 'border-red-700': showError }"
      v-model="value"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  title: string;
  id: string;
  isRequired: boolean;
  titleTextClass: string;
  modelValue: string;
  rows: number;
  containerClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  containerClass: "",
});

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
