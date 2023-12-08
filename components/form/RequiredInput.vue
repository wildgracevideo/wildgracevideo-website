<template>
    <div :class="containerClass">
        <label :for="id" class="mb-2 block" :class="titleTextClass"
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
            :id="id"
            v-model="value"
            v-maska
            :data-maska="dataMask"
            :data-maska-tokens="dataMaskTokens"
            :type="type"
            class="block h-11 w-full p-2 opacity-80"
            :class="[
                !!showError ? '!border-2' : '',
                !!showError ? '!border-red-700' : '',
                inputClass,
            ]"
            :placeholder="hint"
        />
        <p v-if="!!errorMessage" class="text-sm text-red-700">
            {{ errorMessage }}
        </p>
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
        showRequired?: boolean;
        containerClass?: string;
        hint?: string;
        type?: string;
        dataMask?: string;
        dataMaskTokens?: string;
        inputClass?: string;
        errorMessage?: string;
    }

    const props = withDefaults(defineProps<Props>(), {
        showRequired: true,
        containerClass: '',
        hint: '',
        type: 'text',
        dataMask: '',
        dataMaskTokens: '',
        inputClass: 'bg-website-off-white',
        errorMessage: '',
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
