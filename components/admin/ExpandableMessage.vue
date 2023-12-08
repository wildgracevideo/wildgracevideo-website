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
                            v-if="message.reply"
                            :label="`Reply:${message.reply.sendGridMessageStatus}`"
                            additional-classes="inline-block bg-website-green text-white"
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
                        v-if="!message.reply"
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
    import type { SerializeObject } from 'nitropack';
    import { type MessageWithRelations } from '~/lib/prisma';
    import type { MessageReplyRequest } from '~/types/messages';

    const props = defineProps<{
        message: SerializeObject<MessageWithRelations>;
        deleteAction: (
            message: SerializeObject<MessageWithRelations>
        ) => Promise<void>;
        replyAction: (message: MessageReplyRequest) => Promise<void>;
    }>();

    const showPreview = ref(false);

    const formattedCreatedAt = new Intl.DateTimeFormat(undefined, {
        timeStyle: 'short',
        dateStyle: 'medium',
    }).format(Date.parse(props.message.createdAt));

    const markRead = async () => {
        if (!props.message.read) {
            // This is used to separate the message from the reply
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { reply, ...messageWithoutReply } = props.message;
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
