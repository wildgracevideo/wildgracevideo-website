<template>
    <fieldset :class="containerClass">
        <legend
            class="mb-4"
            :class="[titleTextClass, showError === true ? 'text-red-700' : '']"
        >
            <span>{{ title }}</span
            ><span v-if="showRequired" class="opacity-50"> (required)</span>
        </legend>
        <div v-for="choice in choices" :key="choice.id">
            <input
                :id="choice.id"
                type="checkbox"
                :value="choice.value"
                class="bg-website-off-white mr-2 mb-4 h-4 w-4"
                :aria-label="choice.value"
                @change="updateModelValue"
            /><label
                class="ml-2"
                :for="choice.id"
                :hidden="!!choice.hideValue"
                >{{ choice.value }}</label
            >
        </div>
    </fieldset>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { type SelectChoice } from '~~/shared/types/form-input';

    interface Props {
        title: string;
        isRequired: boolean;
        titleTextClass: string;
        modelValue: SelectChoice[];
        choices: SelectChoice[];
        containerClass?: string;
        singleItem?: boolean;
        showRequired?: boolean;
    }

    const props = withDefaults(defineProps<Props>(), {
        showRequired: true,
        containerClass: '',
        singleItem: false,
    });

    const values: Ref[] = [];
    for (const _ in props.choices) {
        const valueRef = ref('');
        values.push(valueRef);
    }

    const checkedValues = ref<SelectChoice[]>([]);
    const showError = computed({
        get() {
            return props.isRequired && checkedValues.value.length === 0;
        },
        set(_value) {},
    });

    const emit = defineEmits(['update:modelValue']);

    const itemCheckedIndex = (valueToCheck: string) => {
        return checkedValues.value.findIndex((it) => it.value === valueToCheck);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateModelValue = (event: any) => {
        if (props.singleItem) {
            checkedValues.value.forEach((it) => {
                if (event.target.value !== it.value) {
                    (
                        document.getElementById(it.id) as HTMLInputElement
                    ).checked = false;
                }
            });
        }
        const index = itemCheckedIndex(event.target.value);
        if (event.target.checked && index === -1) {
            checkedValues.value.push({
                value: event.target.value,
                id: event.target.id,
            });
        } else if (!event.target.checkbox && index !== -1) {
            checkedValues.value.splice(index, 1);
        }

        if (props.singleItem) {
            props.choices.forEach((it) => {
                const inputElement = document.getElementById(
                    it.id
                ) as HTMLInputElement;
                if (
                    inputElement.checked &&
                    inputElement.value !== event.target.value
                ) {
                    inputElement.checked = false;
                }
            });
        }
        emit('update:modelValue', checkedValues.value);
    };

    onMounted(() => {
        if (props.modelValue.length > 0) {
            props.modelValue.forEach(
                (it) =>
                    ((
                        document.getElementById(it.id) as HTMLInputElement
                    ).checked = true)
            );
        }
    });
</script>
