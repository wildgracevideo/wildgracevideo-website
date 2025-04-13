<template>
    <div :class="containerClass">
        <label class="mb-4 block" :for="id" :class="titleTextClass">
            <span>{{ title }}</span
            ><span v-if="showRequired" class="opacity-50"> (required)</span>
        </label>
        <select
            :id="id"
            v-model="value"
            class="h-11 w-full max-w-lg px-2"
            :class="[
                inputClass,
                { 'border-red-700!': showError, 'border-2!': showError },
            ]"
        >
            <option value="" disabled selected hidden>Select</option>
            <option
                v-for="choice in choices"
                :key="choice.id"
                :value="choice.value"
            >
                {{ choice.value }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { type SelectChoice } from '~~/shared/types/form-input';

    interface Props {
        title: string;
        id: string;
        isRequired: boolean;
        titleTextClass: string;
        modelValue: string;
        choices: SelectChoice[];
        containerClass?: string;
        showRequired?: boolean;
        inputClass?: string;
    }

    const props = withDefaults(defineProps<Props>(), {
        showRequired: true,
        containerClass: '',
        inputClass: 'bg-website-off-white',
    });

    const emit = defineEmits(['update:modelValue']);

    const value = computed({
        get() {
            return props.modelValue;
        },
        set(value) {
            emit('update:modelValue', value);
        },
    });

    const showError = computed({
        get() {
            return props.isRequired && !value.value;
        },
        set(_value) {},
    });
</script>
