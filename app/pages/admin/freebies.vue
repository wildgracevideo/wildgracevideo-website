<template>
    <h1 class="my-8 ml-8 pt-8 text-2xl">Freebies</h1>
    <UTable
        v-if="paginationResponse?.results"
        :data="paginationResponse?.results || []"
        :columns="columns"
        empty="No Freebies"
    />
    <Spinner v-else :additional-classes="['mx-auto']" />
    <div
        class="flex justify-end border-t border-neutral-200 px-3 py-3.5 dark:border-neutral-700"
    >
        <UPagination
            v-model:page="page"
            :page-count="limit"
            :total="paginationResponse?.totalResults ?? 0"
            variant="outline"
            active-variant="soft"
        />
    </div>
</template>

<script setup lang="ts">
    import type { TableRow } from '@nuxt/ui';
    import { formatDate } from '~~/shared/lib/format-date';

    definePageMeta({ middleware: 'auth', layout: 'admin' });
    useHead({
        title: 'WGV Admin | Purchases',
    });

    interface Freebie {
        email: string;
        firstName: string;
        lastName: string;
        freebieName: string;
        createdAt: string;
    }

    const columns = [
        { accessorKey: 'email', header: 'Email' },
        { accessorKey: 'firstName', header: 'First Name' },
        { accessorKey: 'lastName', header: 'Last Name' },
        { accessorKey: 'freebieName', header: 'Freebie Name' },
        {
            accessorKey: 'createdAt',
            header: 'Date',
            cell: ({ row }: { row: TableRow<Freebie> }) => {
                const formattedDate = formatDate(row.getValue('createdAt'));
                return h('span', {}, formattedDate);
            },
        },
    ];

    const limit = ref(10);

    const { data: paginationResponse } = await useLazyAsyncData(
        'freebies',
        () => $fetch(`/api/admin/freebies?offset=0&limit=${limit.value}`),
        { server: false }
    );

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
