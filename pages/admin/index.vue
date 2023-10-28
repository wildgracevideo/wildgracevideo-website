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
      :message="(message as unknown as Message)"
      :click-handler="previewClickHandler"
    />
  </div>
</template>

<script setup lang="ts">
import { type Message } from "@prisma/client";
import MessagePreview from "~/components/MessagePreview.vue";

const selectedMessage: Ref<Message | undefined> = ref(undefined);

definePageMeta({ middleware: "auth", layout: "admin" });
const headers = useRequestHeaders(["cookie"]) as HeadersInit;
const { data: messages } = await useFetch("/api/admin/messages", { headers });

const previewClickHandler = (message: Message) => {
  selectedMessage.value = message;
};
const backClickHandler = (message: Message) => {
  selectedMessage.value = undefined;
  if (messages.value != null) {
    messages.value
      .filter((it) => it.id === message.id)
      .forEach((it) => (it.read = true));
  }
};
</script>
