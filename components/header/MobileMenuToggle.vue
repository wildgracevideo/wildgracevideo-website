<template>
    <div
        class="three-bar-wrapper relative z-20 ml-auto mr-10 block h-8 w-10 cursor-pointer lg:hidden"
        :class="{ active: openMenu }"
        @click="openMenu = !openMenu"
    >
        <div class="one absolute top-0 h-1 w-full bg-black"></div>
        <div class="two absolute top-3 h-1 w-full bg-black"></div>
        <div
            class="absolute top-6 h-1 w-full bg-black"
            :class="{ 'fade-out': openMenu, 'fade-in': !openMenu }"
        ></div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        modelValue: boolean;
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
</script>

<style scoped>
    .one {
        animation-delay: 0.1s;
    }
    .one,
    .two {
        transition: all 0.3s;
    }
    .three-bar-wrapper:hover .three-bar-wrapper.active {
        animation: none;
    }
    .active .one {
        top: 25%;
        left: 0%;
        transform: rotate(45deg);
        background-color: rgb(var(--color-website-off-white));
    }
    .active .two {
        top: 25%;
        left: 0%;
        transform: rotate(-45deg);
        background-color: rgb(var(--color-website-off-white));
    }
</style>
