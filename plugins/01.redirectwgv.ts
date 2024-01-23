export default defineNuxtPlugin(async (_nuxtApp) => {
    const oldWebsite = /^https\:\/\/(www\.)?wildgracevideography.com(:443)?/g;
    const requestUrl = useRequestURL().toString();
    if (requestUrl.match(oldWebsite)) {
        const redirectUrl = requestUrl.replace(
            oldWebsite,
            'https://www.wildgracevideo.com'
        );
        await navigateTo(redirectUrl, { external: true });
    }
});
