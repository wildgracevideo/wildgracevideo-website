import { RecaptchaType } from "~/types/form-requests";

export default defineNuxtPlugin((_nuxtApp) => {
    const runtimeConfig = useRuntimeConfig();
    return {
        provide: {
            submitRecaptcha: (action: RecaptchaType, callback: (token: string) => Promise<void>) => {
                grecaptcha.ready(function () {
                    grecaptcha
                    .execute(runtimeConfig.public.recaptchaSiteKey, { action })
                    .then(function (token) {
                        callback(token);
                    });
                });
            }
        }
    }
});
