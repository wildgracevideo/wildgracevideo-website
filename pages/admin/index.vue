<template>
    <p class="my-8 ml-8 text-2xl">Dashboard</p>

    <div class="mb-8 ml-12">
        Data in the last:
        <USelect
            v-model="numDays"
            :options="options"
            option-attribute="name"
            class="mt-2 w-64"
        />
    </div>

    <div v-if="!pending" class="ml-16 flex flex-row justify-start gap-8">
        <UCard
            v-for="stat in stats"
            :key="`${stat.title} - ${stat.stat}`"
            class="min-w-64"
        >
            <template #header> {{ stat.title }} </template>
            <p
                v-if="!loading"
                class="mx-auto my-8 text-center text-2xl font-bold"
            >
                {{ stat.stat }}
            </p>
            <Spinner v-else />
        </UCard>
    </div>
    <Spinner v-else :additional-classes="['mx-auto mt-24']" />
</template>

<script setup lang="ts">
    definePageMeta({ middleware: 'auth', layout: 'admin' });
    useHead({
        title: 'WGV Admin',
    });

    const options = [
        {
            name: '1 Month',
            value: 30,
        },
        {
            name: '3 Months',
            value: 90,
        },
        {
            name: '6 months',
            value: 180,
        },
        {
            name: '1 year',
            value: 365,
        },
    ];

    const loading = ref(false);

    const numDays = ref(90);

    watch(numDays, async (newValue, _oldValue) => {
        loading.value = true;
        try {
            const { data } = await useFetch(
                `/api/admin/stats?numDays=${newValue}`
            );
            stats.value = data.value;
        } catch (e: unknown) {
            console.error(e);
        }
        loading.value = false;
    });

    const { data: stats, pending } = await useLazyAsyncData(
        'messages',
        () => $fetch(`/api/admin/stats?numDays=${numDays.value}`),
        { server: false }
    );
</script>
