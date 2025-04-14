<template>
    <h1 class="my-8 ml-8 pt-8 text-2xl">Purchases</h1>
    <UTable
        v-if="paginationResponse?.results"
        :data="(paginationResponse?.results ?? []) as Purchase[]"
        :columns="columns"
        empty="No Purchases"
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
    import type { MessageStatus } from '~~/shared/drizzle/schema';
    import { formatDate } from '~~/shared/lib/format-date';

    definePageMeta({ middleware: 'auth', layout: 'admin' });
    useHead({
        title: 'WGV Admin | Purchases',
    });

    interface Purchase {
        email: string;
        firstName: string;
        lastName: string;
        product: string;
        sendGridMessageStatus: MessageStatus;
        createdAt: string;
    }

    const columns = [
        { accessorKey: 'email', header: 'Email' },
        { accessorKey: 'firstName', header: 'First Name' },
        { accessorKey: 'lastName', header: 'Last Name' },
        { accessorKey: 'product', header: 'Product' },
        { accessorKey: 'sendGridMessageStatus', header: 'Message Status' },
        {
            accessorKey: 'createdAt',
            header: 'Date',
            cell: ({ row }: { row: TableRow<Purchase> }) => {
                const formattedDate = formatDate(row.getValue('createdAt'));
                return h('span', {}, formattedDate);
            },
        },
    ];

    const limit = ref(10);

    const { data: paginationResponse } = await useLazyAsyncData(
        'purchases',
        () => $fetch(`/api/admin/purchases?offset=0&limit=${limit.value}`),
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
            `/api/admin/purchases?offset=${pageIndex * limit.value}&limit=${
                limit.value
            }`
        );
        loading.value = false;
        paginationResponse.value = paginationUpdateResponse.value;
    };
</script>
