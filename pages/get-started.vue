<template>
  <div>
    <div class="text-4xl text-center mb-16">
      We can't wait to hear about your next project!
    </div>
    <div
      class="grid grid-cols-1 lg:grid-cols-2 max-w-4xl lg:mx-auto mx-8 gap-x-4 gap-y-6"
    >
      <div>
        <RequiredInput
          title="First Name"
          name="firstname"
          :is-required="isRequired"
          title-text-class="text-black"
          v-model="firstName"
        />
      </div>
      <div>
        <RequiredInput
          title="Last Name"
          name="lastname"
          :is-required="isRequired"
          title-text-class="text-black"
          v-model="lastName"
        />
      </div>
      <div>
        <RequiredInput
          title="Business Name"
          name="businessname"
          :is-required="isRequired"
          title-text-class="text-black"
          v-model="businessName"
        />
      </div>
      <div>
        <RequiredInput
          title="Email"
          name="email"
          :is-required="isRequired"
          title-text-class="text-black"
          v-model="email"
        />
      </div>
      <div>
        <RequiredInput
          title="Phone"
          name="phone"
          :is-required="isRequired"
          title-text-class="text-black"
          v-model="phone"
        />
      </div>
      <div>
        <RequiredInput
          title="Instagram Handle"
          name="instagramhandle"
          :is-required="false"
          title-text-class="text-black"
          v-model="instagramHandle"
          :show-required="false"
        />
      </div>
      <div class="md:col-span-2 col-span-1">
        <RequiredTextArea
          :rows="3"
          title="Tell us a little about your brand, and your goals for working together!"
          name="goals"
          :is-required="isRequired"
          title-text-class="text-black"
          v-model="goals"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RequiredInput from "../components/RequiredInput.vue";
import RequiredTextArea from "../components/RequiredTextArea.vue";

definePageMeta({
  layout: "get-started",
});

const firstName = ref("");
const lastName = ref("");
const businessName = ref("");
const phone = ref("");
const instagramHandle = ref("");
const goals = ref("");
const email = ref("");

const showForm = ref(true);

const isRequired = ref(false);
</script>
