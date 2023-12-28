import * as crypto from 'crypto';

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event): Promise<void> => {
    const token = crypto.randomBytes(32).toString('hex');
    const queryParams = new URLSearchParams({
        client_id: runtimeConfig.gitProviderClientId,
        redirect_uri: `${runtimeConfig.public.siteUrl}/api/admin/cms/callback`,
        login: runtimeConfig.gitProviderLogin,
        scope: runtimeConfig.gitProviderScopes,
        state: token,
        allow_signup: 'false',
    });
    const loginUri = `${runtimeConfig.gitProviderTokenHost}${
        runtimeConfig.gitProviderAuthorizePath
    }?${queryParams.toString()}`;
    setCookie(event, `${runtimeConfig.gitProvider}-state-cookie`, token, {
        httpOnly: true,
        secure: runtimeConfig.secureCookies,
    });
    return await sendRedirect(event, loginUri);
});
