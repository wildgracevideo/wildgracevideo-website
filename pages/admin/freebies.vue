<template>
    <p class="my-8 mb-4 ml-8 text-2xl">Purchases</p>

    <UTable
        :rows="paginationResponse?.results || []"
        :loading="pending || loading"
        :columns="columns"
        class="mx-4"
    >
        <template #createdAt-data="{ row }">
            <span>
                {{ formatDate(row.createdAt) }}
            </span>
        </template>
    </UTable>
    <div
        class="flex justify-end border-t border-gray-200 px-3 py-3.5 dark:border-gray-700"
    >
        <UPagination
            v-model="page"
            :page-count="limit"
            :total="paginationResponse?.totalResults ?? 0"
        />
    </div>
</template>

<script setup lang="ts">
    definePageMeta({ middleware: 'auth', layout: 'admin' });
    useHead({
        title: 'WGV Admin | Purchases',
    });

    const columns = [
        { key: 'email', label: 'Email' },
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'freebieName', label: 'Freebie Name' },
        { key: 'createdAt', label: 'Date' },
    ];

    const limit = ref(10);

    const { data: paginationResponse, pending } = await useLazyAsyncData(
        'freebies',
        () => $fetch(`/api/admin/freebies?offset=0&limit=${limit.value}`),
        { server: false }
    );

    const formatDate = (dateStr: string) => {
        const gmtDate = new Date(dateStr);
        const timezoneOffset = gmtDate.getTimezoneOffset();
        const localDate = new Date(gmtDate.getTime() - timezoneOffset * 60000);
        return new Intl.DateTimeFormat(undefined, {
            timeStyle: 'short',
            dateStyle: 'medium',
        }).format(localDate);
    };

    const loading = ref(false);

    const page = ref(1);

    watch(page, async (newValue) => {
        loading.value = true;
        await pageSelectHandler(newValue - 1);
        loading.value = false;
    });

    const pageSelectHandler = async (pageIndex: number) => {
        loading.value = true;
        const { data: paginationUpdateResponse } = await useFetch(
            `/api/admin/freebies?offset=${pageIndex * limit.value}&limit=${
                limit.value
            }`
        );
        loading.value = false;
        paginationResponse.value = paginationUpdateResponse.value;
    };
</script>
