export default defineNuxtRouteMiddleware(async (to) => {
    const runtimeConfig = useRuntimeConfig();
    const user = useUser();
    let data;
    try {
        data = await useRequestFetch()('/api/admin/user');
    } catch (e) {
        console.log('Failed to get admin user.', e);
    }
    if (data) {
        user.value = data;
    } else {
        const siteUrl = runtimeConfig.public.siteUrl;
        if (to.path === '/admin/login') {
            return navigateTo(
                '/admin/login?redirect=' + encodeURI(siteUrl + '/admin')
            );
        } else {
            return navigateTo(
                '/admin/login?redirect=' + encodeURI(siteUrl + to.path)
            );
        }
    }
});
