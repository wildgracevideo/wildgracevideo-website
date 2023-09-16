<template>
  <div class="contact-bg pt-8">
    <h2 class="text-white text-3xl text-center">Contact Us</h2>
    <form
      class="grid md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-8 mt-12 md:mx-auto mx-8 max-w-3xl"
      id="contact-form"
      @submit.prevent="send"
    >
      <div>
        <label for="firstname" class="text-white text-sm block"
          >First Name</label
        >
        <input
          type="text"
          id="firstname"
          class="block text-xl h-11 w-full"
          v-model="firstName"
        />
      </div>
      <div>
        <label for="lastname" class="text-white text-sm block">Last Name</label>
        <input
          type="text"
          id="lastname"
          class="block text-xl h-11 w-full"
          v-model="lastName"
        />
      </div>
      <div class="md:col-span-2 col-span-1">
        <label for="email" class="text-white text-sm block">Email</label>
        <input
          type="text"
          id="email"
          class="block text-xl h-11 w-full"
          v-model="email"
        />
      </div>
      <div class="md:col-span-2 col-span-1">
        <label for="message" class="text-white text-sm block">Message</label>
        <textarea
          id="message"
          rows="3"
          class="block text-xl w-full"
          v-model="message"
        />
      </div>
      <div class="md:col-span-2 col-span-1 flex justify-center">
        <button
          type="submit"
          class="rounded-oval text-red-100 border-red-100 border-2 py-4 px-16 send-button mb-12"
        >
          Send
        </button>
      </div>
    </form>
  </div>
</template>

<style>
.contact-bg {
  background-color: #757263;
}
.rounded-oval {
  border-radius: 50%;
}
.send-button:hover {
  background-color: #fee2e2;
  color: black;
}
</style>

<script setup lang="ts">
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const message = ref("");

const send = (e: any) => {
  e.preventDefault();

  $fetch("/.netlify/functions/contact-submit", {
    method: "POST",
    body: {
      firstname: firstName,
      lastname: lastName,
      message,
      email,
    },
  }).then((res: any) => {
    console.log(res);
    firstName.value = "";
    lastName.value = "";
    email.value = "";
    message.value = "";
  });
};
</script>
