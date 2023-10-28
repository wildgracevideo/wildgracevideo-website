<template>
  <section class="py-8 flex mx-4 flex mx-8 justify-between">
    <XMarkIcon
      class="text-black h-10 w-10 mt-4 cursor-pointer"
      aria-hidden="true"
      @click="backClick"
    />
    <div>
      <h2 class="text-2xl mb-4">
        {{ message.firstname }} {{ message.lastname }} |
        {{ message.email }}
      </h2>
      <p>{{ message.message }}</p>
    </div>
    <button class="p-4 bg-green-400 h-fit" @click="showPreview = true">
      Preview Email
    </button>
    <PreivewEmailModal
      v-model="showPreview"
      :to-email="message.email"
      subject="Wild Grace Videography Introduction"
      :message="`Thank you for reaching out!`"
      :name="message.firstname"
      :message-id="message.id"
      :send-handler="sendHandler"
    />
  </section>
  <section class="grid divide-y-2 mx-auto max-w-lg mt-8">
    <h3 class="text-xl ml-4 mb-4">Replies</h3>
    <div v-for="reply in message.replies">
      <p class="pt-4 text w-fit mb-4">
        {{ reply.toEmail }} | {{ reply.name }} |
        {{ new Date(Date.parse(reply.createdAt)).toLocaleString() }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { type Message } from "@prisma/client";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import type { MessageReplyRequest } from "~/types/messages";

const showPreview = ref(false);

const props = defineProps<{
  message: Message;
  backClickHandler: (message: Message) => void;
}>();

const backClick = () => {
  props.backClickHandler(props.message);
};

const emit = defineEmits(["update:modelValue"]);

if (!props.message.read) {
  const updatedMessage = {
    ...props.message,
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
}

const sendHandler = async (messageReplyRequest: MessageReplyRequest) => {
  await $fetch("/api/admin/messages/reply", {
    method: "POST",
    body: messageReplyRequest,
  });
};
</script>
