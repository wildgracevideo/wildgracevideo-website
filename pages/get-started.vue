<template>
    <Notification
        v-for="notification in notifications"
        :key="`${notification.message}-${notification.type}`"
        :type="notification.type"
        :message="notification.message"
    />
    <div>
        <RecaptchaLoader />
        <OgMeta :title="pageTitle" :description="description" />
        <SchemaOrgWebPage :name="pageTitle" />
        <h1 class="mb-16 text-center text-2xl">
            We can't wait to hear about your next project!
        </h1>
        <h1
            class="relative top-28 text-center text-4xl text-black"
            :class="{
                hidden: showForm,
                block: !showForm,
                'fade-in': !showForm,
            }"
        >
            Thank you!
        </h1>
        <form
            class="mx-8 grid max-w-4xl grid-cols-1 gap-x-4 gap-y-6 lg:mx-auto lg:grid-cols-2"
            :class="{ invisible: !showForm, 'fade-out': !showForm }"
            @submit.prevent="submit"
        >
            <RequiredInput
                id="firstname"
                v-model="firstName"
                title="First Name"
                :is-required="isRequired"
                title-text-class="text-black"
                hint="First Name"
                :input-class="inputClass"
            />
            <RequiredInput
                id="lastname"
                v-model="lastName"
                title="Last Name"
                :is-required="isRequired"
                title-text-class="text-black"
                hint="Last Name"
                :input-class="inputClass"
            />
            <RequiredInput
                id="businessname"
                v-model="businessName"
                title="Business Name"
                :is-required="isRequired"
                title-text-class="text-black"
                hint="Business Name"
                :input-class="inputClass"
            />
            <RequiredInput
                id="email"
                v-model="email"
                title="Email"
                type="email"
                :is-required="isRequired"
                title-text-class="text-black"
                hint="example@gmail.com"
                :input-class="inputClass"
            />
            <RequiredInput
                id="phone"
                v-model="phone"
                title="Phone"
                :is-required="isRequired"
                title-text-class="text-black"
                data-mask="(###) ###-####"
                hint="(888) 888 8888"
                :error-message="phoneErrorMessage"
                :input-class="inputClass"
            />
            <RequiredInput
                id="instagramhandle"
                v-model="instagramHandle"
                title="Instagram Handle"
                :is-required="false"
                title-text-class="text-black"
                :show-required="false"
                data-mask="!@A"
                data-mask-tokens="A:[a-zA-Z0-9\.\_]:multiple"
                hint="@example"
                :input-class="inputClass"
            />
            <RequiredSelect
                v-model="interests"
                title="Interested in..."
                container-class="mb-2 md:col-span-2 col-span-1"
                :is-required="isRequired"
                title-text-class="text-black"
                :choices="INTERESTS_CHOICES"
            />
            <RequiredSelect
                v-model="businessType"
                title="What kind of business are you?"
                container-class="mb-2 md:col-span-2 col-span-1"
                :is-required="isRequired"
                title-text-class="text-black"
                :single-item="true"
                :choices="BUSINESS_TYPE_CHOICES"
            />
            <RequiredTextArea
                id="goals"
                v-model="goals"
                :rows="3"
                title="Tell us a little about your brand, and your goals for working together!"
                :is-required="isRequired"
                title-text-class="text-black"
                container-class="md:col-span-2 col-span-1"
                hint="The more detail, the better!"
                :input-class="inputClass"
            />
            <RequiredDropdownSelect
                id="how-did-you-hear-dropdown"
                v-model="hearChoice"
                title="How did you hear about us?"
                container-class="mb-2 md:col-span-2 col-span-1"
                :is-required="isRequired"
                title-text-class="text-black"
                :choices="HEAR_CHOICE"
                :input-class="inputClass"
            />
            <RequiredSelect
                v-model="monthlyTipSignup"
                title="I want to sign up to receive monthly tips on how to create video content that will increase sales! "
                container-class="mb-2 md:col-span-2 col-span-1"
                :is-required="false"
                title-text-class="text-black"
                :choices="MONTHLY_TIP_SIGNUP"
                :show-required="false"
            />
            <p class="col-span-1 text-center text-xs text-black md:col-span-2">
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
            <div class="col-span-1 mx-auto mb-2 md:col-span-2">
                <button
                    action="submit"
                    class="h-14 w-40 rounded-xl border-2 border-website-primary bg-transparent text-xl text-website-primary"
                    :class="{
                        'hover:bg-website-primary': !sendingForm,
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
    import { type SelectChoice } from '~/types/form-input';
    import OgMeta from '~/components/OgMeta.vue';
    import {
        type GetStartedSubmitRequest,
        RecaptchaType,
    } from '~/types/form-requests';
    import { NotificationType } from '~/types/component-types';
    import type { NotificationConfig } from '~/components/Notification.vue';
    import RequiredInput from '../components/form/RequiredInput.vue';
    import RequiredTextArea from '../components/form/RequiredTextArea.vue';
    import RequiredSelect from '../components/form/RequiredSelect.vue';
    import RequiredDropdownSelect from '../components/form/RequiredDropdownSelect.vue';

    const pageTitle = 'Wild Grace Videography | Get Started';
    const description =
        'Get started with Wild Grace Videography, a Denver, Colorado-based video production company, to create a new video to make your business stand out.';

    definePageMeta({
        layout: 'no-contact',
    });

    const inputClass = 'bg-website-off-white border-2 border-website-primary';

    const INTERESTS_CHOICES = [
        {
            id: 'monthly-video-prodcution-choice',
            value: 'Monthly Video Production',
        },
        { id: 'video-prodcution-choice', value: 'Video Production' },
        {
            id: 'course-video-prodcution-choice',
            value: 'Course Video Production',
        },
        { id: 'photography-choice', value: 'Photography' },
    ];

    const BUSINESS_TYPE_CHOICES = [
        { id: 'product-choice', value: 'Product' },
        { id: 'service-choice', value: 'Service' },
        { id: 'other-choice', value: 'Other' },
    ];

    const MONTHLY_TIP_SIGNUP = [
        {
            id: 'monthly-tip-signup-choice',
            value: 'Monthly Tip Signup',
            hideValue: true,
        },
    ];

    const HEAR_CHOICE = [
        { id: 'instagram-choice', value: 'Instagram' },
        { id: 'facebook-choice', value: 'Facebook' },
        { id: 'linkedin-choice', value: 'Linkedin' },
        { id: 'tiktok-choice', value: 'TikTok' },
        { id: 'google-choice', value: 'Google' },
        { id: 'referral-choice', value: 'Referral' },
        { id: 'other-choice', value: 'Other' },
    ];

    const firstName = ref('');
    const lastName = ref('');
    const businessName = ref('');
    const phone = ref('');
    const instagramHandle = ref('');
    const goals = ref('');
    const email = ref('');
    const interests = ref<SelectChoice[]>([]);
    const businessType = ref<SelectChoice[]>([]);
    const monthlyTipSignup = ref(MONTHLY_TIP_SIGNUP);
    const hearChoice = ref('');
    const phoneErrorMessage = ref('');

    const showForm = ref(true);
    const sendingForm = ref(false);

    const isRequired = ref(false);

    const { $submitRecaptcha } = useNuxtApp();

    const validatePhone = () => {
        if (sendingForm.value) {
            return;
        }

        if (phone.value && phone.value.length === 14) {
            return true;
        } else {
            phoneErrorMessage.value = 'Please input a valid phone number.';
            return false;
        }
    };

    const notifications: Ref<NotificationConfig[]> = ref([]);
    const removeFirstNotification = () => {
        if (notifications.value.length > 0) {
            notifications.value.shift();
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
            $submitRecaptcha(RecaptchaType.GetStarted, async (token) => {
                const getStartedRequest: GetStartedSubmitRequest = {
                    token,
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
                try {
                    await $fetch(`/api/forms/get-started`, {
                        method: 'POST',
                        body: getStartedRequest,
                    });
                    showForm.value = false;
                    sendingForm.value = false;
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } catch (e) {
                    console.error(e);
                    sendingForm.value = false;
                    notifications.value.push({
                        type: NotificationType.error,
                        message:
                            'The message failed to send, please try again.',
                    });
                    setTimeout(removeFirstNotification, 5_000);
                }
            });
        }
    };
</script>
