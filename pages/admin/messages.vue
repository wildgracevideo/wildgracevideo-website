<template>
  <AdminNotification
    v-if="errorMessage"
    :type="NotificationType.error"
    :message="errorMessage"
  />
  <h1 class="ml-8 mt-8 text-2xl">Get Started Messages</h1>
  <div class="w-full mb-4">
    <Spinner
      v-if="messages.messages === undefined"
      height-class="h-16"
      width-class="w-16"
      :additional-classes="['mx-auto', 'mt-16']"
    />
    <div v-else class="mt-8 mx-8">
      <AdminExpandableMessage
        v-for="message in messages.messages"
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

definePageMeta({ middleware: "auth", layout: "admin" });
useHead({
  title: "WGV Admin | Messages",
});

const errorMessage = ref("");

const messages: { messages: MessageWithRelations[] | undefined } = reactive({
  messages: undefined,
});
const { data: response } = await useFetch("/api/admin/messages");
messages.messages =
  (response.value as unknown as MessageWithRelations[] | undefined) || [];

const deleteAction = async (message: MessageWithRelations) => {
  try {
    await useFetch(`/api/admin/messages/${message.id}`, { method: "delete" });
    messages
      .messages!.filter((it) => it.id === message.id)
      .map((it) => messages.messages!.indexOf(it))
      .forEach((it) => messages.messages!.splice(it, 1));
  } catch (e) {
    errorMessage.value = "Failed to delete message.";
    console.error(errorMessage.value, e);
  }
};

const replyAction = async (messageReplyRequest: MessageReplyRequest) => {
  try {
    await $fetch("/api/admin/messages/reply", {
      method: "POST",
      body: messageReplyRequest,
    });
  } catch (e) {
    errorMessage.value = "Failed to send reply message.";
    console.error(errorMessage.value, e);
  }
};
</script>
