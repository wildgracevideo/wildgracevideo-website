<template>
  <div class="contact-bg pt-8">
    <h2 class="text-white text-3xl text-center" :class="{ hidden: !showForm }">
      Contact Us
    </h2>
    <h2
      class="text-white text-3xl text-center relative top-28"
      :class="{ hidden: showForm, block: !showForm, 'fade-in': !showForm }"
    >
      Thank you!
    </h2>
    <form
      class="grid md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-8 mt-12 md:mx-auto mx-8 max-w-3xl"
      :class="{ invisible: !showForm, 'fade-out': !showForm }"
      id="contact-form"
      @submit.prevent="send"
    >
      <RequiredInput
        title="First Name"
        id="firstname"
        :is-required="isRequired"
        title-text-class="text-white text-sm"
        v-model="firstName"
        hint="First Name"
      />
      <RequiredInput
        title="Last Name"
        id="lastname"
        :is-required="isRequired"
        title-text-class="text-white text-sm"
        v-model="lastName"
        hint="Last Name"
      />
      <RequiredInput
        title="Email"
        id="email"
        :is-required="isRequired"
        title-text-class="text-white"
        v-model="email"
        hint="example@gmail.com"
        container-class="md:col-span-2 col-span-1 text-sm"
      />
      <RequiredTextArea
        :rows="3"
        title="Message"
        id="message"
        :is-required="isRequired"
        title-text-class="text-white text-sm"
        v-model="message"
        container-class="md:col-span-2 col-span-1"
      />
      <div class="md:col-span-2 col-span-1 flex justify-center">
        <button
          type="submit"
          class="rounded-oval text-red-100 border-red-100 border-2 py-4 px-16 send-button mb-12 !bg-transparent"
        >
          Send
        </button>
      </div>
    </form>
  </div>
</template>
<style scoped>
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
import RequiredInput from "./form/RequiredInput.vue";
import RequiredTextArea from "./form/RequiredTextArea.vue";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const message = ref("");

const showForm = ref(true);

const isRequired = ref(false);

const send = () => {
  isRequired.value = true;

  if (firstName.value && lastName.value && email.value && message.value) {
    $fetch("/.netlify/functions/contact-submit", {
      method: "POST",
      body: {
        firstname: `${firstName.value}`,
        lastname: `${lastName.value}`,
        message: `${message.value}`,
        email: `${email.value}`,
      },
    }).then((res: any) => {
      console.log(res);
      firstName.value = "";
      lastName.value = "";
      email.value = "";
      message.value = "";
      showForm.value = false;
    });
  }
};
</script>
