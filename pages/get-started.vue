<template>
    <Notification
        v-for="notification in notifications"
        :key="`${notification.message}-${notification.type}`"
        :type="notification.type"
        :message="notification.message"
    />
    <div
        class="[&_input]:placeholder-website-secondary [&_textarea]:placeholder-website-secondary"
    >
        <RecaptchaLoader />
        <OgMeta :title="pageTitle" :description="description" />
        <SchemaOrgWebPage :name="pageTitle" />
        <h1 class="mx-auto text-center text-3xl">Contact</h1>
        <div class="mt-16 grid grid-cols-1 md:grid-cols-2">
            <div>
                <h2 class="mb-16 text-center text-2xl">
                    We can't wait to hear about your next project!
                </h2>
                <a
                    class="text-website-primary mx-auto block text-center underline"
                    href="mailto:carly@wildgracevideo.com"
                    >carly@wildgracevideo.com</a
                >
                <SocialMediaIcons
                    icon-fill="rgb(var(--color-website-primary))"
                    class="mx-auto mt-8 -mb-8"
                    :icon-size="80"
                    :show-email="false"
                />
            </div>
            <div class="px-2">
                <h2
                    class="text-website-off-black relative top-28 text-center text-4xl"
                    :class="{
                        hidden: showForm,
                        block: !showForm,
                        'fade-in': !showForm,
                    }"
                >
                    Thank you!
                </h2>
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
                        title-text-class="text-website-off-black"
                        hint="First Name"
                        :input-class="inputClass"
                    />
                    <RequiredInput
                        id="lastname"
                        v-model="lastName"
                        title="Last Name"
                        :is-required="isRequired"
                        title-text-class="text-website-off-black"
                        hint="Last Name"
                        :input-class="inputClass"
                    />
                    <RequiredInput
                        id="businessname"
                        v-model="businessName"
                        title="Business Name"
                        :is-required="isRequired"
                        title-text-class="text-website-off-black"
                        hint="Business Name"
                        :input-class="inputClass"
                    />
                    <RequiredInput
                        id="email"
                        v-model="email"
                        title="Email"
                        type="email"
                        :is-required="isRequired"
                        title-text-class="text-website-off-black"
                        hint="example@gmail.com"
                        :input-class="inputClass"
                    />
                    <RequiredInput
                        id="phone"
                        v-model="phone"
                        title="Phone"
                        :is-required="isRequired"
                        title-text-class="text-website-off-black"
                        data-mask="(###) ###-####"
                        hint="(888) 888 8888"
                        :error-message="phoneErrorMessage"
                        :input-class="inputClass"
                    />
                    <RequiredInput
                        id="businesswebsite"
                        v-model="businessWebsite"
                        title="Business Website"
                        :is-required="false"
                        title-text-class="text-website-off-black"
                        :show-required="false"
                        :input-class="inputClass"
                    />
                    <RequiredTextArea
                        id="currentBusinessChallenge"
                        v-model="currentBusinessChallenge"
                        :rows="3"
                        title="Current Business Challenge"
                        :is-required="isRequired"
                        title-text-class="text-website-off-black"
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
                        title-text-class="text-website-off-black"
                        :choices="HEAR_CHOICE"
                        :input-class="inputClass"
                    />
                    <RequiredSelect
                        v-model="monthlyTipSignup"
                        title="I want to sign up to receive monthly tips on how to create video content that will increase sales! "
                        container-class="mb-2 md:col-span-2 col-span-1"
                        :is-required="false"
                        title-text-class="text-website-off-black"
                        :choices="MONTHLY_TIP_SIGNUP"
                        :show-required="false"
                    />
                    <p
                        class="text-website-off-black col-span-1 text-center text-xs md:col-span-2"
                    >
                        This site is protected by reCAPTCHA and the Google
                        <a
                            href="https://policies.google.com/privacy"
                            class="underline"
                            >Privacy Policy</a
                        >
                        and
                        <a
                            href="https://policies.google.com/terms"
                            class="underline"
                            >Terms of Service</a
                        >
                        apply.
                    </p>
                    <div class="col-span-1 mx-auto mb-2 md:col-span-2">
                        <button
                            action="submit"
                            class="subheading-font border-website-primary bg-website-primary text-website-off-white flex h-8 w-fit items-center rounded-xl border-2 px-4 text-center"
                            :class="{
                                'hover:bg-website-off-white': !sendingForm,
                                'hover:text-website-primary': !sendingForm,
                                'opacity-50': sendingForm,
                                'cursor-default': sendingForm,
                            }"
                        >
                            GET STARTED
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
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

    const inputClass = 'bg-website-background border-2 border-website-primary';

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
    const businessWebsite = ref('');
    const currentBusinessChallenge = ref('');
    const email = ref('');
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
            currentBusinessChallenge.value &&
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
                    currentBusinessChallenge: `${currentBusinessChallenge.value}`,
                    hearChoice: `${hearChoice.value}`,
                    monthlyTipSignup: monthlyTipSignup.value.length > 0,
                    businessWebsite: `${businessWebsite.value}`,
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
