<template>
    <h1 class="mx-auto w-fit text-4xl">
        <span
            class="font-family-cardo mx-2 block text-center lg:mx-auto xl:inline-block"
            >Wild Grace Videography</span
        ><span
            class="font-family-bright-sunshine mx-auto block text-center text-6xl lg:mx-4 xl:inline-block"
            >X</span
        ><span
            class="font-family-brittany grow-transition relative mx-2 block text-center lg:mx-auto xl:inline-block"
            >Samantha Melissa Marketing</span
        >
    </h1>
    <ServicePage :service="data!" />
</template>

<script setup lang="ts">
    import type { ServicePage } from '#build/components';

    const { data } = await useAsyncData('services', () =>
        queryContent('/service')
            .where({ path: 'social-media-packages' })
            .findOne()
    );
</script>
