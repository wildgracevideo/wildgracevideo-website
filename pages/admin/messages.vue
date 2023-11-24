<template>
  <AdminNotification
    v-for="notification in notifications"
    :type="notification.type"
    :message="notification.message"
  />
  <h1 class="ml-8 mt-8 text-2xl">Get Started Messages</h1>
  <div class="w-full mb-4">
    <Spinner
      v-if="loading"
      height-class="h-16"
      width-class="w-16"
      :additional-classes="['mx-auto', 'mt-16']"
    />
    <div v-else class="mt-8 mx-8">
      <AdminExpandableMessage
        v-for="message in messages.messages"
        :key="`${message.id}${updateIds.includes(message.id) ? '-update' : ''}`"
        :message="message"
        :delete-action="deleteAction"
        :reply-action="replyAction"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type MessageWithRelations } from "~/lib/prisma";
import type { MessageReplyRequest } from "~/types/messages";
import { NotificationType } from "~/types/component-types";
import { MessageReply } from "@prisma/client";

definePageMeta({ middleware: "auth", layout: "admin" });
useHead({
  title: "WGV Admin | Messages",
});

const updateIds: Ref<number[]> = ref([]);

const loading = ref(true);
const notifications: Ref<{type: NotificationType, message: string}[]> = ref([]);

const messages: { messages: MessageWithRelations[] } = reactive({
  messages: [],
});
const { data: response } = await useFetch("/api/admin/messages");
onMounted(() => {
    messages.messages =
      (response.value as unknown as MessageWithRelations[]) || [];
    loading.value = false;
});

const removeFirstNotification = () => {
  if (notifications.value.length > 0) {
    notifications.value.shift();
  }
}

const deleteAction = async (message: MessageWithRelations) => {
  try {
    await useFetch(`/api/admin/messages/${message.id}`, { method: "delete" });
    messages
      .messages!.filter((it) => it.id === message.id)
      .map((it) => messages.messages!.indexOf(it))
      .forEach((it) => messages.messages!.splice(it, 1));
  } catch (e) {
    notifications.value.push({ type: NotificationType.error, message: "Failed to delete message."});
    setTimeout(removeFirstNotification, 5_000);
    console.error(e);
  }
};

const replyAction = async (messageReplyRequest: MessageReplyRequest) => {
  try {
    const messageReply = await $fetch("/api/admin/messages/reply", {
      method: "POST",
      body: messageReplyRequest,
    });
    messages
      .messages!.filter((it) => it.id === messageReplyRequest.messageId)
      .forEach((it) => it.reply = messageReply as unknown as MessageReply);
    updateIds.value.push(messageReplyRequest.messageId);
  } catch (e) {
    notifications.value.push({ type: NotificationType.error, message: "Failed to send reply message." });
    console.error(e);
  }
  notifications.value.push({ type: NotificationType.success, message: "Successfully sent reply." });
  setTimeout(removeFirstNotification, 5_000);
};
</script>
