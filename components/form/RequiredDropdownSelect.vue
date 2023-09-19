<template>
  <div :class="containerClass">
    <label class="mb-4 block" :for="id" :class="titleTextClass">
      <span>{{ title }}</span
      ><span v-if="showRequired" class="opacity-50"> (required)</span>
    </label>
    <select
      :id="id"
      v-model="value"
      class="bg-white h-11 .max-w-md w-full px-2"
      :class="{ 'border-red-700': showError, 'border-2': showError }"
    >
      <option v-for="choice in choices" :value="choice.value">
        {{ choice.value }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import SelectChoice from "~/models/SelectChoice";

interface Props {
  title: string;
  id: string;
  isRequired: boolean;
  titleTextClass: string;
  modelValue: string;
  choices: SelectChoice[];
  containerClass?: string;
  showRequired?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showRequired: true,
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
