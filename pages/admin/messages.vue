<template>
    <Notification
        v-for="notification in notifications"
        :key="`${notification.message}-${notification.type}`"
        :type="notification.type"
        :message="notification.message"
    />
    <h1 class="ml-8 mt-8 text-2xl">Get Started Messages</h1>
    <div class="mb-4 w-full">
        <Spinner
            v-if="pending"
            height-class="h-16"
            width-class="w-16"
            :additional-classes="['mx-auto', 'mt-16']"
        />
        <div v-else-if="data" class="mx-2 mt-8 lg:mx-8">
            <AdminExpandableMessage
                v-for="message in data"
                :key="`${message.id}${
                    updateIds.includes(message.id) ? '-update' : ''
                }`"
                :message="message"
                :delete-action="deleteAction"
                :reply-action="replyAction"
            />
        </div>
        <p v-else class="h-dvh mt-8 text-center text-xl">No Messages</p>
    </div>
</template>

<script setup lang="ts">
    import { type MessageWithRelations } from '~/lib/prisma';
    import type { MessageReplyRequest } from '~/types/messages';
    import { NotificationType } from '~/types/component-types';
    import { type SerializeObject } from '~/types/nitro';
    import type { NotificationConfig } from '~/components/Notification.vue';

    definePageMeta({ middleware: 'auth', layout: 'admin' });
    useHead({
        title: 'WGV Admin | Messages',
    });

    const updateIds: Ref<number[]> = ref([]);

    const notifications: Ref<NotificationConfig[]> = ref([]);

    const { data, pending } = await useFetch('/api/admin/messages');

    const removeFirstNotification = () => {
        if (notifications.value.length > 0) {
            notifications.value.shift();
        }
    };

    const deleteAction = async (
        message: SerializeObject<MessageWithRelations>
    ) => {
        try {
            await $fetch(`/api/admin/messages/${message.id}`, {
                method: 'delete',
            });
            data.value?.filter((it) => it.id === message.id)
                .map((it) => data.value!.indexOf(it))
                .forEach((it) => data.value!.splice(it, 1));
        } catch (e) {
            notifications.value.push({
                type: NotificationType.error,
                message: 'Failed to delete message.',
            });
            setTimeout(removeFirstNotification, 5_000);
            console.error(e);
        }
    };

    const replyAction = async (messageReplyRequest: MessageReplyRequest) => {
        try {
            const messageReply = await $fetch('/api/admin/messages/reply', {
                method: 'POST',
                body: messageReplyRequest,
            });
            data.value!.filter(
                    (it) => it.id === messageReplyRequest.messageId
                )
                .forEach((it) => (it.reply = messageReply));
            updateIds.value.push(messageReplyRequest.messageId);
        } catch (e) {
            notifications.value.push({
                type: NotificationType.error,
                message: 'Failed to send reply message.',
            });
            console.error(e);
        }
        notifications.value.push({
            type: NotificationType.success,
            message: 'Successfully sent reply.',
        });
        setTimeout(removeFirstNotification, 5_000);
    };
</script>
