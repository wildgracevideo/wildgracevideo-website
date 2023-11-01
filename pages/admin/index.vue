<template>
  <div v-if="selectedMessage">
    <MessageDetail
      :message="selectedMessage"
      :back-click-handler="backClickHandler"
    />
  </div>
  <div v-else class="grid divide-y-2 mx-auto max-w-md">
    <h1 class="pt-4 mx-auto text-xl w-fit mb-4">Messages</h1>
    <MessagePreview
      v-for="message in messages"
      :message="(message as unknown as MessageWithRelations)"
      :click-handler="previewClickHandler"
    />
  </div>
</template>

<script setup lang="ts">
import { type MessageWithRelations } from "~/lib/prisma";
import MessagePreview from "~/components/MessagePreview.vue";

definePageMeta({ middleware: "auth", layout: "admin" });

const selectedMessage: Ref<MessageWithRelations | undefined> = ref(undefined);
const { data: messages } = await useFetch("/api/admin/messages");

const previewClickHandler = (message: MessageWithRelations) => {
  selectedMessage.value = message;
};
const backClickHandler = (message: MessageWithRelations) => {
  selectedMessage.value = undefined;
  if (messages.value != null) {
    messages.value
      .filter((it) => it.id === message.id)
      .forEach((it) => (it.read = true));
  }
};
</script>
