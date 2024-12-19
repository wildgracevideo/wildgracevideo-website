<template>
    <h1 class="mx-auto w-fit text-4xl">
        <span
            class="font-family-cardo mx-2 block text-center lg:mx-auto xl:inline-block"
            >Wild Grace <br class="inline-block sm:hidden" />
            Videography</span
        ><span
            class="font-family-bright-sunshine mx-auto mt-2 block text-center text-6xl sm:mt-0 lg:mx-4 xl:inline-block"
            >X</span
        ><span
            class="font-family-brittany grow-transition relative mx-2 block text-center leading-loose lg:mx-auto xl:inline-block"
            >Samantha Melissa <br class="inline-block sm:hidden" />
            Marketing</span
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
