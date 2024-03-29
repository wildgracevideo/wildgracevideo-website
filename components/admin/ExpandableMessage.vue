<template>
    <div
        :key="`expandable-message-${message.id}`"
        class="border-gray mb-2 border-2 p-2 py-5"
    >
        <details class="group">
            <summary
                class="flex cursor-pointer list-none items-center justify-between font-medium"
                role="button"
                tabindex="0"
                @click="markRead"
                @keypress="markRead"
            >
                <div>
                    <span
                        ><b>{{ message.firstname }} {{ message.lastname }}</b>
                        &lt;{{ message.email }}&gt;
                        <span
                            v-if="!message.read"
                            class="ml-2 inline-block h-2 w-2 rounded-full bg-blue-400"
                        />
                        <AdminTag
                            v-if="message.messageReply"
                            :label="`Reply:${message.messageReply.sendGridMessageStatus}`"
                            additional-classes="inline-block bg-website-primary text-white"
                        />
                    </span>
                    <p class="ml-2">{{ formattedCreatedAt }}</p>
                </div>
                <span class="transition group-open:rotate-180">
                    <ChevronDownIcon class="h-6 w-6" />
                </span>
            </summary>
            <div class="flex flex-row justify-between">
                <p
                    class="group-open:animate-fadeIn mt-3 flex-1 text-neutral-600"
                >
                    {{ message.message }}
                </p>
                <div class="mx-4">
                    <TrashIcon
                        class="inline h-6 w-6 cursor-pointer"
                        @click="() => deleteAction(message)"
                    />
                    <PaperAirplaneIcon
                        v-if="!message.messageReply"
                        class="ml-2 inline h-6 w-6 cursor-pointer"
                        @click="showPreview = true"
                    />
                </div>
            </div>
        </details>
    </div>
    <AdminPreivewEmailModal
        v-model="showPreview"
        :to-email="message.email"
        subject="Wild Grace Videography Introduction"
        :message="`Thank you for reaching out!`"
        :name="message.firstname"
        :message-id="message.id"
        :send-handler="replyAction"
    />
</template>

<script setup lang="ts">
    import { ChevronDownIcon } from '@heroicons/vue/20/solid';
    import { PaperAirplaneIcon, TrashIcon } from '@heroicons/vue/24/outline';
    import type { InferInsertModel } from 'drizzle-orm';
    import type { SerializeObject } from 'nitropack';
    import type { messageReplies, MessageWithReply } from '~/drizzle/schema';

    const props = defineProps<{
        message: SerializeObject<MessageWithReply>;
        deleteAction: (
            message: SerializeObject<MessageWithReply>
        ) => Promise<void>;
        replyAction: (
            message: InferInsertModel<typeof messageReplies>
        ) => Promise<void>;
    }>();

    const showPreview = ref(false);

    const gmtDate = new Date(props.message.createdAt);
    const timezoneOffset = gmtDate.getTimezoneOffset();
    const localDate = new Date(gmtDate.getTime() - timezoneOffset * 60000);
    const formattedCreatedAt = new Intl.DateTimeFormat(undefined, {
        timeStyle: 'short',
        dateStyle: 'medium',
    }).format(localDate);

    const markRead = async () => {
        if (!props.message.read) {
            // This is used to separate the message from the reply
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { messageReply, ...messageWithoutReply } = props.message;
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
            // TOOD: I believe this is needed to make sure read state works as needed
            // eslint-disable-next-line vue/no-mutating-props
            props.message.read = true;
        }
    };
</script>
