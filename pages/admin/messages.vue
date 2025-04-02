<template>
    <h1 class="my-8 ml-8 text-2xl">Get Started Messages</h1>
    <UTable :rows="messages || []" :columns="columns" :loading="pending">
        <template #read-data="{ row }">
            <span
                v-if="!row.read"
                class="ml-2 inline-block h-2 w-2 rounded-full bg-blue-400"
            />
            <span v-else />
        </template>
        <template #status-data="{ row }">
            <AdminTag
                v-if="row.messageReply"
                :label="`Reply:${row.messageReply.sendGridMessageStatus}`"
                additional-classes="inline-block bg-website-accent text-website-off-black"
            />
        </template>
        <template #createdAt-data="{ row }">
            <span>
                {{ formatDate(row.createdAt) }}
            </span>
        </template>
        <template #actions-data="{ row }">
            <EnvelopeOpenIcon
                class="inline h-6 w-6 cursor-pointer"
                @click="() => showPreviewAction(row)"
            />
            <TrashIcon
                class="mx-4 inline h-6 w-6 cursor-pointer"
                @click="
                    () => {
                        selectedMessage = row;
                        showDeleteConfirmation = true;
                    }
                "
            />
            <PaperAirplaneIcon
                v-if="!row.messageReply"
                class="inline h-6 w-6 cursor-pointer"
                @click="() => showReplyAction(row)"
            />
        </template>
    </UTable>

    <UModal v-model="showDeleteConfirmation">
        <UCard>
            <template #header>
                Are you sure you want to delete the message?
            </template>
            <span class="float-right my-4">
                <UButton
                    label="No"
                    color="red"
                    class="mx-4"
                    @click="showDeleteConfirmation = false"
                />
                <UButton label="Yes" color="green" @click="deleteAction" />
            </span>
        </UCard>
    </UModal>

    <UModal v-model="showReplyModal">
        <UCard>
            <template #header> Send email </template>
            <UForm
                :schema="messageReplySchema"
                :state="messageReplyState"
                class="space-y-4"
                @submit="replyAction"
            >
                <UFormGroup label="To Email" name="email">
                    <UInput v-model="messageReplyState.email" />
                </UFormGroup>

                <UFormGroup label="Name" name="name">
                    <UInput v-model="messageReplyState.name" />
                </UFormGroup>

                <UButton
                    type="submit"
                    color="green"
                    class="my-8 ml-auto mr-4 block"
                >
                    Submit
                </UButton>
            </UForm>
        </UCard>
    </UModal>

    <UModal v-model="showPreview">
        <UCard>
            <template #header> Message </template>
            <span class="whitespace-pre-wrap" v-html="formatMessage()" />
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
    import { type InferType, object, string } from 'yup';
    import {
        EnvelopeOpenIcon,
        PaperAirplaneIcon,
        TrashIcon,
    } from '@heroicons/vue/24/outline';
    import { type MessageWithReply } from '~/drizzle/schema';

    definePageMeta({ middleware: 'auth', layout: 'admin' });
    useHead({
        title: 'WGV Admin | Messages',
    });

    const showDeleteConfirmation = ref(false);
    const showPreview = ref(false);
    const showReplyModal = ref(false);

    const selectedMessage = ref(null);

    const messageReplySchema = object({
        email: string().email('Invalid email').required('Required'),
        name: string().required('Required'),
    });

    type MessageReplySchema = InferType<typeof schema>;

    const messageReplyState = reactive({
        email: undefined,
        name: undefined,
    });

    const toast = useToast();

    const columns = [
        { key: 'read' },
        { key: 'firstname', label: 'First Name' },
        { key: 'lastname', label: 'Last Name' },
        { key: 'email', label: 'Email' },
        { key: 'createdAt', label: 'Created At' },
        { key: 'status' },
        { key: 'actions' },
    ];

    const { data: messages, pending } = await useLazyAsyncData(
        'messages',
        () => $fetch('/api/admin/messages'),
        { server: false }
    );

    const deleteAction = async () => {
        try {
            await $fetch(`/api/admin/messages/${selectedMessage.value.id}`, {
                method: 'delete',
            });
            messages.value
                ?.filter((it) => it.id === selectedMessage.value.id)
                .map((it) => messages.value!.indexOf(it))
                .forEach((it) => messages.value!.splice(it, 1));
            showDeleteConfirmation.value = false;
            toast.add({
                title: 'Successfully deleted the message.',
                color: 'green',
                icon: 'i-heroicons-check-badge',
            });
        } catch (e) {
            toast.add({
                title: 'Failed to delete message',
                color: 'red',
                icon: 'i-heroicons-information-circle',
            });
            console.error(e);
        }
    };

    const replyAction = async (event: FormSubmitEvent<MessageReplySchema>) => {
        try {
            const messageReply = await $fetch('/api/admin/messages/reply', {
                method: 'POST',
                body: {
                    name: event.data.name,
                    toEmail: event.data.email,
                    messageId: selectedMessage.value.id,
                },
            });
            messages
                .value!.filter((it) => it.id === selectedMessage.value.id)
                .forEach((it) => (it.messageReply = messageReply));
            toast.add({
                title: 'Successfully sent reply.',
                color: 'green',
                icon: 'i-heroicons-check-badge',
            });
        } catch (e) {
            toast.add({
                title: 'Failed to send reply message.',
                color: 'red',
                icon: 'i-heroicons-information-circle',
            });
            console.error(e);
        }
        showReplyModal.value = false;
    };

    const markRead = async () => {
        if (!selectedMessage.value.read) {
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

    async function showReplyAction(row: MessageWithReply) {
        selectedMessage.value = row;
        messageReplyState.email = row.email;
        messageReplyState.name = row.firstname;
        showReplyModal.value = true;
    }

    function formatMessage(): string {
        return selectedMessage.value.message
            .replaceAll('\\n', '<br />')
            .replaceAll("\\'", "'");
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
