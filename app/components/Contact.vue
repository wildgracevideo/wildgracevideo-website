<template>
    <Notification
        v-for="notification in notifications"
        :key="`${notification.message}-${notification.type}`"
        :type="notification.type"
        :message="notification.message"
    />
    <RecaptchaLoader />
    <div
        class="bg-website-off-black [&_input]:placeholder-website-secondary relative z-50 py-16"
    >
        <div
            class="mb-24 flex w-full flex-row items-center"
            :class="{ hidden: !showForm }"
        >
            <h2
                class="heading-font text-website-off-white px-8 text-center text-4xl font-semibold"
                :class="{ hidden: !showForm }"
            >
                CONTACT
            </h2>
            <div class="bg-website-off-white h-[1px] grow" />
        </div>
        <h2
            class="text-website-off-white relative top-28 text-center text-3xl"
            :class="{
                hidden: showForm,
                block: !showForm,
                'fade-in': !showForm,
            }"
        >
            Thank you!
        </h2>
        <form
            id="contact-form"
            class="mx-8 mt-12 grid max-w-3xl grid-cols-1 gap-x-4 gap-y-8 md:mx-auto md:grid-cols-2"
            :class="{ invisible: !showForm, 'fade-out': !showForm }"
            @submit.prevent="send"
        >
            <RequiredInput
                id="firstname"
                v-model="firstName"
                title="First Name"
                :is-required="isRequired"
                title-text-class="text-website-off-white text-sm"
                hint="First Name"
                container-class="fade-out contact-scroll-observable"
            />
            <RequiredInput
                id="lastname"
                v-model="lastName"
                title="Last Name"
                :is-required="isRequired"
                title-text-class="text-website-off-white text-sm"
                hint="Last Name"
                container-class="fade-out contact-scroll-observable"
            />
            <RequiredInput
                id="email"
                v-model="email"
                title="Email"
                type="email"
                :is-required="isRequired"
                title-text-class="text-website-off-white"
                hint="example@gmail.com"
                container-class="md:col-span-2 col-span-1 text-sm fade-out contact-scroll-observable"
            />
            <RequiredTextArea
                id="message"
                v-model="message"
                :rows="3"
                title="Message"
                :is-required="isRequired"
                title-text-class="text-website-off-white text-sm"
                container-class="md:col-span-2 col-span-1 text-sm fade-out contact-scroll-observable"
            />
            <p
                class="fade-out contact-scroll-observable text-website-off-white col-span-1 text-center text-xs md:col-span-2"
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
            <div class="col-span-1 flex justify-center md:col-span-2">
                <button
                    type="submit"
                    class="contact-scroll-observable subheading-font border-website-off-white bg-website-off-white text-website-primary mb-12 flex h-8 w-fit cursor-pointer items-center rounded-xl border-2 px-4 text-center"
                    :class="{
                        'opacity-50': sendingForm,
                        'hover:text-website-off-white': !sendingForm,
                        'hover:bg-website-primary': !sendingForm,
                        'cursor-default': sendingForm,
                        'fade-out': !sendingForm && !formError,
                    }"
                >
                    SEND
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { RecaptchaType } from '~~/shared/types/form-requests';
    import { type ContactSubmitRequest } from '~~/shared/types/form-requests';
    import { NotificationType } from '~~/shared/types/component-types';
    import RequiredInput from './form/RequiredInput.vue';
    import RequiredTextArea from './form/RequiredTextArea.vue';
    import type { NotificationConfig } from './Notification.vue';

    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const message = ref('');

    const showForm = ref(true);
    const sendingForm = ref(false);

    const isRequired = ref(false);

    const formError = ref(false);

    const { $submitRecaptcha } = useNuxtApp();

    const notifications: Ref<NotificationConfig[]> = ref([]);
    const removeFirstNotification = () => {
        if (notifications.value.length > 0) {
            notifications.value.shift();
        }
    };

    const send = () => {
        if (sendingForm.value) {
            return;
        }
        isRequired.value = true;

        if (firstName.value && lastName.value && email.value && message.value) {
            sendingForm.value = true;
            $submitRecaptcha(RecaptchaType.Contact, async (token) => {
                const contactSubmitRequest: ContactSubmitRequest = {
                    token,
                    firstname: `${firstName.value}`,
                    lastname: `${lastName.value}`,
                    message: `${message.value}`,
                    email: `${email.value}`,
                };
                try {
                    await $fetch(`/api/forms/contact`, {
                        method: 'POST',
                        body: contactSubmitRequest,
                    });
                    firstName.value = '';
                    lastName.value = '';
                    email.value = '';
                    message.value = '';
                    showForm.value = false;
                    sendingForm.value = false;
                } catch (e) {
                    console.error(e);
                    sendingForm.value = false;
                    showForm.value = true;
                    formError.value = true;
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

    onMounted(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (
                    entry.isIntersecting &&
                    entry.target.classList.contains('fade-out')
                ) {
                    entry.target.classList.remove('fade-out');
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        });

        const animatableElements = document.querySelectorAll(
            '.contact-scroll-observable'
        );
        animatableElements.forEach((element) => observer.observe(element));
    });
</script>
