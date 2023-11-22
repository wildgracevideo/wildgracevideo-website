const recaptchaSiteKey = '6LcqgVMoAAAAABLWZCEs3MtuslhHwadUEiMlRCFV';

export const submitRecaptcha = (action: string, callback: (token: string) => Promise<void>) => {
  grecaptcha.ready(function () {
    grecaptcha
      .execute(recaptchaSiteKey, { action })
      .then(function (token) {
        callback(token);
      });
  });
};
