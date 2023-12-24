const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(
    async (
        event
    ): Promise<
        | {
              message: string;
              content: string | { token: string; provider: string };
          }
        | string
        | void
    > => {
        const requestQueryParams = getQuery(event);
        const code = requestQueryParams.code?.toString();
        if (!code) {
            console.error('Code query parameter was missing.');
            throw createError({ message: 'Unauthenticated', statusCode: 401 });
        }
        const state = requestQueryParams.state?.toString();
        const stateInCookie = getCookie(
            event,
            `${runtimeConfig.gitProvider}-state-cookie`
        );
        if (!state) {
            console.error('State query parameter was missing.');
            throw createError({ message: 'Unauthenticated', statusCode: 401 });
        } else if (state !== stateInCookie) {
            console.error('State does not match stored state.');
            throw createError({ message: 'Unauthenticated', statusCode: 401 });
        }

        const queryParams = new URLSearchParams({
            code,
            client_id: runtimeConfig.gitProviderClientId,
            client_secret: runtimeConfig.gitProviderClientSecret,
            redirect_uri: `${runtimeConfig.public.siteUrl}/api/admin/cms/callback`,
        });
        const loginUri = `${runtimeConfig.gitProviderTokenHost}${
            runtimeConfig.gitProviderTokenPath
        }?${queryParams.toString()}`;
        try {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const tokenResponse = await fetch(loginUri, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
            });
            const token: {
                access_token: string;
                scope: string;
                token_type: string;
            } = await tokenResponse.json();

            const content = {
                token: token.access_token || 'token_not_found',
                provider: runtimeConfig.gitProvider,
            };
            const htmlScript = generateScript(
                runtimeConfig.gitProvider,
                content
            );
            setHeader(event, 'Content-Type', 'text/html');
            return htmlScript;
        } catch (e: unknown) {
            console.error('Failed to get access token', e);
            return { message: 'error', content: JSON.stringify(e) };
        }
    }
);

function generateScript(
    gitProvider: string,
    content: { provider: string; token: string }
): string {
    return `
<script>
(function() {
  function receiveMessage(e) {
    console.log("receiveMessage %o", e)
    console.log('valid origin: %s', e.origin);
    // send message to main window of the app
    window.opener.postMessage(
      'authorization:${gitProvider}:success:${JSON.stringify(content)}',
      e.origin
    )
  }

  window.addEventListener("message", receiveMessage, false)
  // Start handshake with parent
  console.log("Sending message: %o", "${gitProvider}")
  window.opener.postMessage("authorizing:${gitProvider}", "*")
})();
</script>`;
}
