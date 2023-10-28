<template>
  <div>
    <OgMeta :title="pageTitle" :description="description" />
    <SchemaOrgWebPage :name="pageTitle" />
    <h1 class="text-2xl text-center mb-16">
      We can't wait to hear about your next project!
    </h1>
    <h1
      class="text-black text-4xl text-center relative top-28"
      :class="{ hidden: showForm, block: !showForm, 'fade-in': !showForm }"
    >
      Thank you!
    </h1>
    <form
      class="grid grid-cols-1 lg:grid-cols-2 max-w-4xl lg:mx-auto mx-8 gap-x-4 gap-y-6"
      :class="{ invisible: !showForm, 'fade-out': !showForm }"
      @submit.prevent="submit"
    >
      <RequiredInput
        title="First Name"
        id="firstname"
        :is-required="isRequired"
        title-text-class="text-black"
        v-model="firstName"
        hint="First Name"
        :input-class="inputClass"
      />
      <RequiredInput
        title="Last Name"
        id="lastname"
        :is-required="isRequired"
        title-text-class="text-black"
        v-model="lastName"
        hint="Last Name"
        :input-class="inputClass"
      />
      <RequiredInput
        title="Business Name"
        id="businessname"
        :is-required="isRequired"
        title-text-class="text-black"
        v-model="businessName"
        hint="Business Name"
        :input-class="inputClass"
      />
      <RequiredInput
        title="Email"
        id="email"
        type="email"
        :is-required="isRequired"
        title-text-class="text-black"
        v-model="email"
        hint="example@gmail.com"
        :input-class="inputClass"
      />
      <RequiredInput
        title="Phone"
        id="phone"
        :is-required="isRequired"
        title-text-class="text-black"
        v-model="phone"
        data-mask="(###) ###-####"
        hint="(888) 888 8888"
        :error-message="phoneErrorMessage"
        :input-class="inputClass"
      />
      <RequiredInput
        title="Instagram Handle"
        id="instagramhandle"
        :is-required="false"
        title-text-class="text-black"
        v-model="instagramHandle"
        :show-required="false"
        data-mask="!@A"
        data-mask-tokens="A:[a-zA-Z0-9\.\_]:multiple"
        hint="@example"
        :input-class="inputClass"
      />
      <RequiredSelect
        title="Interested in..."
        container-class="mb-2 md:col-span-2 col-span-1"
        :is-required="isRequired"
        title-text-class="text-black"
        v-model="interests"
        :choices="INTERESTS_CHOICES"
      />
      <RequiredSelect
        title="What kind of business are you?"
        container-class="mb-2 md:col-span-2 col-span-1"
        :is-required="isRequired"
        title-text-class="text-black"
        v-model="businessType"
        :single-item="true"
        :choices="BUSINESS_TYPE_CHOICES"
      />
      <RequiredTextArea
        :rows="3"
        title="Tell us a little about your brand, and your goals for working together!"
        id="goals"
        :is-required="isRequired"
        title-text-class="text-black"
        v-model="goals"
        container-class="md:col-span-2 col-span-1"
        hint="The more detail, the better!"
        :input-class="inputClass"
      />
      <RequiredDropdownSelect
        id="how-did-you-hear-dropdown"
        title="How did you hear about us?"
        container-class="mb-2 md:col-span-2 col-span-1"
        :is-required="isRequired"
        title-text-class="text-black"
        v-model="hearChoice"
        :choices="HEAR_CHOICE"
        :input-class="inputClass"
      />
      <RequiredSelect
        title="I want to sign up to receive monthly tips on how to create video content that will increase sales! "
        container-class="mb-2 md:col-span-2 col-span-1"
        :is-required="false"
        title-text-class="text-black"
        v-model="monthlyTipSignup"
        :choices="MONTHLY_TIP_SIGNUP"
        :show-required="false"
      />
      <p class="md:col-span-2 col-span-1 text-xs text-black text-center">
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
      <div class="mb-2 md:col-span-2 col-span-1 mx-auto">
        <button
          action="submit"
          class="h-14 w-40 text-xl rounded-xl text-website-green border-website-green bg-transparent border-2"
          :class="{
            'hover:bg-website-green': !sendingForm,
            'hover:text-website-off-white': !sendingForm,
            'opacity-50': sendingForm,
            'cursor-default': sendingForm,
          }"
        >
          Send
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import RequiredInput from "../components/form/RequiredInput.vue";
import RequiredTextArea from "../components/form/RequiredTextArea.vue";
import RequiredSelect from "../components/form/RequiredSelect.vue";
import RequiredDropdownSelect from "../components/form/RequiredDropdownSelect.vue";
import type SelectChoice from "~/types/SelectChoice";
import OgMeta from "~/components/OgMeta.vue";
import { submitRecaptcha } from "~/src/submitRecaptcha";
import { type GetStartedSubmitRequest } from "~/types/netlify-request";

const pageTitle =
  "Get Started with Wild Grace Videography | Denver Video Production Company";
const description =
  "Get started with Wild Grace Videography, a Denver, Colorado-based video production company, to create a new video to make your business stand out.";

useHead({
  title: pageTitle,
});

definePageMeta({
  layout: "get-started",
});

let inputClass = "bg-website-off-white border-2 border-website-green";

const INTERESTS_CHOICES = [
  { id: "monthly-video-prodcution-choice", value: "Monthly Video Production" },
  { id: "video-prodcution-choice", value: "Video Production" },
  { id: "course-video-prodcution-choice", value: "Course Video Production" },
  { id: "photography-choice", value: "Photography" },
];

const BUSINESS_TYPE_CHOICES = [
  { id: "product-choice", value: "Product" },
  { id: "service-choice", value: "Service" },
  { id: "other-choice", value: "Other" },
];

const MONTHLY_TIP_SIGNUP = [
  {
    id: "monthly-tip-signup-choice",
    value: "Monthly Tip Signup",
    hideValue: true,
  },
];

const HEAR_CHOICE = [
  { id: "instagram-choice", value: "Instagram" },
  { id: "facebook-choice", value: "Facebook" },
  { id: "linkedin-choice", value: "Linkedin" },
  { id: "tiktok-choice", value: "TikTok" },
  { id: "google-choice", value: "Google" },
  { id: "referral-choice", value: "Referral" },
  { id: "other-choice", value: "Other" },
];

const firstName = ref("");
const lastName = ref("");
const businessName = ref("");
const phone = ref("");
const instagramHandle = ref("");
const goals = ref("");
const email = ref("");
const interests = ref<SelectChoice[]>([]);
const businessType = ref<SelectChoice[]>([]);
const monthlyTipSignup = ref(MONTHLY_TIP_SIGNUP);
const hearChoice = ref("");
const phoneErrorMessage = ref("");

const showForm = ref(true);
const sendingForm = ref(false);

const isRequired = ref(false);

const validatePhone = () => {
  if (sendingForm.value) {
    return;
  }

  if (phone.value && phone.value.length === 14) {
    return true;
  } else {
    phoneErrorMessage.value = "Please input a valid phone number.";
    return false;
  }
};

const submit = () => {
  isRequired.value = true;

  if (
    validatePhone() &&
    email.value &&
    firstName.value &&
    lastName.value &&
    businessName.value &&
    phone.value &&
    goals.value &&
    interests.value.length > 0 &&
    businessType.value.length > 0 &&
    hearChoice.value
  ) {
    sendingForm.value = true;
    submitRecaptcha("get_started", (token) => {
      const getStartedRequest: GetStartedSubmitRequest = {
        token: token,
        firstname: `${firstName.value}`,
        lastname: `${lastName.value}`,
        email: `${email.value}`,
        businessName: `${businessName.value}`,
        phone: `${phone.value}`,
        goals: `${goals.value}`,
        interests: interests.value.map((it) => it.value),
        businessType: `${businessType.value[0].value}`,
        hearChoice: `${hearChoice.value}`,
        monthlyTipSignup: monthlyTipSignup.value.length > 0,
        instagramHandle: `${instagramHandle.value}`,
      };
      $fetch(`/.netlify/functions/get-started-submit`, {
        method: "POST",
        body: getStartedRequest,
      })
        .then((res: any) => {
          console.log(res);
          showForm.value = false;
          sendingForm.value = false;
          window.scrollTo({ top: 0, behavior: "smooth" });
        })
        .catch((err) => {
          console.error(err);
          sendingForm.value = false;
        });
    });
  }
};
</script>
