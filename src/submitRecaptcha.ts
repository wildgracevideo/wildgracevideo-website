const RECAPTCHA_SITE_KEY = '6LcqgVMoAAAAABLWZCEs3MtuslhHwadUEiMlRCFV';

export const submitRecaptcha = (action: string, callback: (token: string) => Promise<void>) => {
  grecaptcha.ready(function () {
    grecaptcha
      .execute(RECAPTCHA_SITE_KEY, { action })
      .then(function (token) {
        callback(token);
      });
  });
};