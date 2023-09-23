<template>
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
      <div class="md:col-span-2 col-span-1 flex justify-center">
        <button
          type="submit"
          class="rounded-oval text-website-off-white border-website-off-white bg-transparent border-2 py-4 px-16 mb-12 hover:text-website-green hover:bg-website-off-white fade-out contact-scroll-observable"
        >
          Send
        </button>
      </div>
    </form>
  </div>
</template>

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

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    console.log(entries);
    entries.forEach((entry) => {
      console.log(entry);
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
