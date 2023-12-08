<template>
    <div :key="$.vnode.key || undefined" class="mx-auto w-fit">
        <p
            class="mx-auto mb-2 w-fit cursor-pointer"
            role="button"
            tabindex="0"
            @click="open = !open"
            @keypress="open = !open"
        >
            {{ config.name }}
            <ChevronDownIcon
                :class="[open ? 'rotate-180' : '', 'h-5 w-5 flex-none']"
                class="inline-block h-8 w-8"
                aria-hidden="true"
            />
        </p>
        <template v-if="open">
            <NuxtLink
                v-for="item in config.children"
                :key="item.name"
                class="mt-1 block text-center text-lg"
                :to="item.href"
                @click="openMenu = false"
                >{{ item.name }}</NuxtLink
            >
        </template>
    </div>
</template>

<script setup lang="ts">
    import { ChevronDownIcon } from '@heroicons/vue/20/solid';
    import { type HeaderItemConfig } from './TopBar.vue';

    const props = defineProps<{
        modelValue: boolean;
        config: HeaderItemConfig;
    }>();

    const emit = defineEmits(['update:modelValue']);

    const openMenu = computed({
        get() {
            return props.modelValue;
        },
        set(value) {
            emit('update:modelValue', value);
        },
    });

    const open = ref(false);
</script>
