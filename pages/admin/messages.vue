<template>
    <h1 class="my-8 ml-8 text-2xl">Get Started Messages</h1>
    <UTable
        v-if="data"
        :data="data || []"
        :columns="columns"
        empty="No Messages"
    >
        <template #actions-cell="{ row }: { row: TableRow<MessageWithReply> }">
            <EnvelopeOpenIcon
                class="inline h-6 w-6 cursor-pointer"
                @click="() => showPreviewAction(row.original)"
            />
            <TrashIcon
                class="mx-4 inline h-6 w-6 cursor-pointer"
                @click="
                    () => {
                        selectedMessage = row.original;
                        showDeleteConfirmation = true;
                    }
                "
            />
        </template>
    </UTable>
    <Spinner v-else :additional-classes="['mx-auto']" />

    <UModal v-model:open="showDeleteConfirmation">
        <template #content>
            <UCard>
                <template #header>
                    Are you sure you want to delete the message?
                </template>
                <span class="float-right my-4">
                    <UButton
                        label="No"
                        color="error"
                        class="mx-4"
                        @click="showDeleteConfirmation = false"
                    />
                    <UButton
                        label="Yes"
                        color="success"
                        @click="deleteAction"
                    />
                </span>
            </UCard>
        </template>
    </UModal>

    <UModal v-model:open="showPreview">
        <template #content>
            <UCard>
                <template #header> Message </template>
                <span class="whitespace-pre-wrap" v-html="formatMessage()" />
            </UCard>
        </template>
    </UModal>
</template>

<script setup lang="ts">
    import { EnvelopeOpenIcon, TrashIcon } from '@heroicons/vue/24/outline';
    import type { TableRow } from '@nuxt/ui';
    import { h } from 'vue';
    import { type MessageWithReply } from '~/drizzle/schema';

    definePageMeta({ middleware: 'auth', layout: 'admin' });
    useHead({
        title: 'WGV Admin | Messages',
    });

    const showDeleteConfirmation = ref(false);
    const showPreview = ref(false);

    const selectedMessage: Ref<MessageWithReply | null> = ref(null);

    const toast = useToast();

    const columns = [
        {
            accessorKey: 'read',
            header: '',
            cell: ({ row }: { row: TableRow<MessageWithReply> }) => {
                if (row.getValue('read')) {
                    return h('span');
                } else {
                    return h('span', {
                        class: 'ml-2 inline-block h-2 w-2 rounded-full bg-blue-400',
                    });
                }
            },
        },
        { accessorKey: 'firstname', header: 'First Name' },
        { accessorKey: 'lastname', header: 'Last Name' },
        { accessorKey: 'email', header: 'Email' },
        {
            accessorKey: 'createdAt',
            header: 'Created At',
            cell: ({ row }: { row: TableRow<MessageWithReply> }) => {
                const formattedDate = formatDate(row.getValue('createdAt'));
                return h('span', {}, formattedDate);
            },
        },
        { accessorKey: 'actions', header: ' ' },
    ];

    const { data  } = await useLazyAsyncData(
        'messages',
        async () => {
            return (await $fetch('/api/admin/messages')) as MessageWithReply[];
        },
        { server: false }
    );

    const deleteAction = async () => {
        if (!selectedMessage.value) {
            return;
        }
        try {
            await $fetch(`/api/admin/messages/${selectedMessage.value!.id}`, {
                method: 'delete',
            });
            data.value
                ?.filter((it) => it.id === selectedMessage.value?.id)
                .map((it) => data.value!.indexOf(it))
                .forEach((it) => data.value!.splice(it, 1));
            showDeleteConfirmation.value = false;
            toast.add({
                title: 'Successfully deleted the message.',
                color: 'success',
                icon: 'i-heroicons-check-badge',
            });
        } catch (e) {
            toast.add({
                title: 'Failed to delete message',
                color: 'error',
                icon: 'i-heroicons-information-circle',
            });
            console.error(e);
        }
    };

    const markRead = async () => {
        if (selectedMessage.value != null && !selectedMessage.value.read) {
            // This is used to separate the message from the reply
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { messageReply, ...messageWithoutReply } =
                selectedMessage.value;
            const updatedMessage = {
                ...messageWithoutReply,
                read: true,
            };
            try {
                await $fetch('/api/admin/messages', {
                    method: 'PUT',
                    body: updatedMessage,
                });
            } catch (e) {
                console.error(e);
            }
            selectedMessage.value.read = true;
        }
    };

    async function showPreviewAction(row: MessageWithReply) {
        selectedMessage.value = row;
        markRead();
        showPreview.value = true;
    }

    function formatMessage(): string {
        return (
            selectedMessage.value?.message
                .replaceAll('\\n', '<br />')
                .replaceAll("\\'", "'") ?? ''
        );
    }

    function formatDate(dateString: string): string {
        const gmtDate = new Date(dateString);
        const timezoneOffset = gmtDate.getTimezoneOffset();
        const localDate = new Date(gmtDate.getTime() - timezoneOffset * 60000);
        return new Intl.DateTimeFormat(undefined, {
            timeStyle: 'short',
            dateStyle: 'medium',
        }).format(localDate);
    }
</script>
