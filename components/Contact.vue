<template>
  <RecaptchaLoader />
  <div class="bg-website-green pt-8">
    <h2
      class="text-website-off-white text-3xl text-center"
      :class="{ hidden: !showForm }"
    >
      Contact Us
    </h2>
    <h2
      class="text-website-blue text-3xl text-center relative top-28 text-website-off-white"
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
        title-text-class="text-website-off-white text-sm"
        v-model="firstName"
        hint="First Name"
        container-class="fade-out contact-scroll-observable"
      />
      <RequiredInput
        title="Last Name"
        id="lastname"
        :is-required="isRequired"
        title-text-class="text-website-off-white text-sm"
        v-model="lastName"
        hint="Last Name"
        container-class="fade-out contact-scroll-observable"
      />
      <RequiredInput
        title="Email"
        id="email"
        type="email"
        :is-required="isRequired"
        title-text-class="text-website-off-white"
        v-model="email"
        hint="example@gmail.com"
        container-class="md:col-span-2 col-span-1 text-sm fade-out contact-scroll-observable"
      />
      <RequiredTextArea
        :rows="3"
        title="Message"
        id="message"
        :is-required="isRequired"
        title-text-class="text-website-off-white text-sm"
        v-model="message"
        container-class="md:col-span-2 col-span-1 text-sm fade-out contact-scroll-observable"
      />
      <p
        class="md:col-span-2 col-span-1 text-xs text-website-off-white text-center fade-out contact-scroll-observable"
      >
        This site is protected by reCAPTCHA and the Google
        <a href="https://policies.google.com/privacy" class="underline"
          >Privacy Policy</a
        >
        and
        <a href="https://policies.google.com/terms" class="underline"
          >Terms of Service</a
        >
        apply.
      </p>
      <div class="md:col-span-2 col-span-1 flex justify-center">
        <button
          type="submit"
          class="rounded-oval text-website-off-white border-website-off-white bg-transparent border-2 py-4 px-16 mb-12 contact-scroll-observable"
          :class="{
            'opacity-50': sendingForm,
            'hover:text-website-green': !sendingForm,
            'hover:bg-website-off-white': !sendingForm,
            'cursor-default': sendingForm,
            'fade-out': !sendingForm,
          }"
        >
          Send
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { RecaptchaType } from "~/types/form-requests";
import RequiredInput from "./form/RequiredInput.vue";
import RequiredTextArea from "./form/RequiredTextArea.vue";
import { submitRecaptcha } from "~/src/submitRecaptcha";
import { type ContactSubmitRequest } from "~/types/form-requests";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const message = ref("");

const showForm = ref(true);
const sendingForm = ref(false);

const isRequired = ref(false);

const send = () => {
  if (sendingForm.value) {
    return;
  }
  isRequired.value = true;

  if (firstName.value && lastName.value && email.value && message.value) {
    sendingForm.value = true;
    submitRecaptcha(RecaptchaType.Contact, async (token) => {
      const contactSubmitRequest: ContactSubmitRequest = {
        token: token,
        firstname: `${firstName.value}`,
        lastname: `${lastName.value}`,
        message: `${message.value}`,
        email: `${email.value}`,
      };
      try {
        await $fetch(`/api/forms/contact`, {
          method: "POST",
          body: contactSubmitRequest,
        });
        firstName.value = "";
        lastName.value = "";
        email.value = "";
        message.value = "";
        showForm.value = false;
        sendingForm.value = false;
      } catch (e) {
        console.error(e);
        sendingForm.value = false;
        showForm.value = true;
      }
    });
  }
};

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("fade-out");
        entry.target.classList.add("fade-in");
      } else {
        entry.target.classList.remove("fade-in");
        entry.target.classList.add("fade-out");
      }
    });
  });

  const animatableElements = document.querySelectorAll(
    ".contact-scroll-observable"
  );
  animatableElements.forEach((element) => observer.observe(element));
});
</script>
