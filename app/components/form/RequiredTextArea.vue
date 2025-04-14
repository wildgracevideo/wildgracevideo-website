<template>
    <div :class="containerClass">
        <label :for="id" class="mb-2 block" :class="titleTextClass"
            >{{ title }} <span class="opacity-50"> (required)</span></label
        >
        <textarea
            :id="id"
            v-model="value"
            :rows="rows"
            class="block w-full p-2 opacity-80"
            :class="[
                inputClass,
                { 'border-2!': showError, 'border-red-700!': showError },
            ]"
            :placeholder="hint"
            maxlength="5000"
        />
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue';

    interface Props {
        title: string;
        id: string;
        isRequired: boolean;
        titleTextClass: string;
        modelValue: string;
        rows: number;
        containerClass?: string;
        hint?: string;
        inputClass?: string;
    }

    const props = withDefaults(defineProps<Props>(), {
        containerClass: '',
        hint: '',
        inputClass: 'bg-website-background',
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
