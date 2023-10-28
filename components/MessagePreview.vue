<template>
  <section class="py-4 flex mx-4 cursor-pointer" @click="messageClickHandler">
    <div>
      <h3>{{ message.firstname }} {{ message.lastname }}</h3>
      <h4>{{ message.email }}</h4>
    </div>
    <div
      v-if="!message.read"
      class="rounded-full bg-blue-400 h-3 w-3 ml-auto my-auto"
    />
  </section>
</template>

<script setup lang="ts">
import { type Message } from "@prisma/client";

const props = defineProps<{
  message: Message;
  clickHandler: (message: Message) => void;
}>();

const messageClickHandler = () => {
  props.clickHandler(props.message);
};
</script>
