<template>
  <div :class="containerClass">
    <label :for="id" class="text-sm block mb-2" :class="titleTextClass"
      >{{ title
      }}<span
        v-if="showRequired"
        class="opacity-50"
        :class="{ hidden: !showRequired }"
      >
        (required)</span
      ></label
    >
    <input
      type="text"
      :id="id"
      class="block h-11 w-full p-2 opacity-80"
      :class="{ 'border-2': showError, 'border-red-700': showError }"
      v-model="value"
      :placeholder="hint"
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
  showRequired?: boolean;
  containerClass?: string;
  hint?: string;
}

const props = withDefaults(defineProps<Props>(), {
  showRequired: true,
  containerClass: "",
  hint: "",
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
