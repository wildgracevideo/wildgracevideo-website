<template>
  <div
    class="py-5 border-gray border-2 mb-2 p-2"
    :key="`expandable-message-${message.id}`"
  >
    <details class="group">
      <summary
        class="flex justify-between items-center font-medium cursor-pointer list-none"
        @click="markRead"
      >
        <div>
          <span
            ><b>{{ message.firstname }} {{ message.lastname }}</b> &lt;{{
              message.email
            }}&gt;
            <span
              v-if="!message.read"
              class="rounded-full bg-blue-400 h-2 w-2 ml-2 inline-block"
            />
            <AdminTag v-if="message.reply" :label="`Reply:${message.reply.sendGridMessageStatus}`" class="text-white bg-website-green inline-block" />
          </span>
          <p class="ml-2">{{ formattedCreatedAt }}</p>
        </div>
        <span class="transition group-open:rotate-180">
          <ChevronDownIcon class="h-6 w-6" />
        </span>
      </summary>
      <div class="flex flex-row justify-between">
        <p class="text-neutral-600 mt-3 group-open:animate-fadeIn flex-1">
          {{ message.message }}
        </p>
        <div class="mx-4">
          <TrashIcon
            class="inline w-6 h-6 cursor-pointer"
            @click="() => deleteAction(message)"
          />
          <PaperAirplaneIcon
            v-if="!message.reply"
            class="w-6 h-6 inline ml-2 cursor-pointer"
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
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { PaperAirplaneIcon, TrashIcon } from "@heroicons/vue/24/outline";
import { type MessageWithRelations } from "~/lib/prisma";
import type { MessageReplyRequest } from "~/types/messages";
import type { SerializeObject } from "nitropack";

const props = defineProps<{
  message: SerializeObject<MessageWithRelations>;
  deleteAction: (message: SerializeObject<MessageWithRelations>) => Promise<void>;
  replyAction: (message: MessageReplyRequest) => Promise<void>;
}>();

const showPreview = ref(false);

const formattedCreatedAt = new Intl.DateTimeFormat(undefined, {
  timeStyle: "short",
  dateStyle: "medium",
}).format(Date.parse(props.message.createdAt));

const markRead = async () => {
  if (!props.message.read) {
    const { reply, ...messageWithoutReply } = props.message;
    const updatedMessage = {
      ...messageWithoutReply,
      read: true,
    };
    try {
      await $fetch("/api/admin/messages", {
        method: "PUT",
        body: updatedMessage,
      });
    } catch (e) {
      console.error(e);
    }
    props.message.read = true;
  }
};
</script>
