<template></template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
onMounted(() => {
  let fired = false;
  window.addEventListener(
    "scroll",
    function () {
      let scroll = window.scrollY;
      if (scroll > 0 && fired === false) {
        console.log("scrolled");
        const recaptchaScript = document.createElement("script");
        recaptchaScript.src = `https://www.google.com/recaptcha/api.js?render=${runtimeConfig.public.recaptchaSiteKey}`;
        recaptchaScript.defer = true;
        document.body.appendChild(recaptchaScript);
        fired = true;
      }
    },
    true
  );
});
</script>
