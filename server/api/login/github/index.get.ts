import * as crypto from 'crypto';

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
    const redirect = getQuery(event).redirect;

    if (!redirect) {
        throw createError({ status: 400 });
    }

    const state = crypto.randomBytes(32).toString('hex');
    const stateObject = {
        state,
        redirect,
    };

    const encodedState = Buffer.from(JSON.stringify(stateObject)).toString(
        'base64'
    );
    const queryParams = new URLSearchParams({
        client_id: runtimeConfig.gitProviderClientId,
        redirect_uri: `${runtimeConfig.public.siteUrl}/api/login/github/callback`,
        scope: runtimeConfig.gitProviderScopes,
        state: encodedState,
        allow_signup: 'false',
    });
    const loginUri = `${runtimeConfig.gitProviderTokenHost}${
        runtimeConfig.gitProviderAuthorizePath
    }?${queryParams.toString()}`;

    setCookie(event, 'github_oauth_state', state, {
        path: '/',
        secure: runtimeConfig.secureCookies,
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: 'lax',
    });
    return sendRedirect(event, loginUri.toString());
});
