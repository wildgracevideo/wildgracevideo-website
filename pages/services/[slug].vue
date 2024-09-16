<template>
    <h1 class="mx-auto w-fit text-4xl">
        {{ data!.pageTitle }}
    </h1>
    <ServicePage :service="data!" />
</template>

<script setup lang="ts">
    import type { ServicePage } from '#build/components';

    const route = useRoute();
    const { data } = await useAsyncData('services', () =>
        queryContent('/service/').where({ path: route.params.slug }).findOne()
    );
</script>
