import { eq } from 'drizzle-orm';
import { generateIdFromEntropySize } from 'lucia';
import * as url from 'url';
import { luciaUserTable } from '~/drizzle/schema';
import { db } from '~/lib/db';

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const code = query.code?.toString() ?? null;
    const encodedState = query.state?.toString() ?? null;
    if (!encodedState) {
        throw createError({
            status: 400,
        });
    }

    const storedState = getCookie(event, 'github_oauth_state') ?? null;
    const stateObject = JSON.parse(
        Buffer.from(encodedState, 'base64').toString('ascii')
    );
    const state = stateObject.state;
    const redirect = decodeURI(stateObject.redirect);
    const redirectUrl = url.parse(redirect, true);
    if (
        !code ||
        !state ||
        !storedState ||
        state !== storedState ||
        !redirectUrl.hostname
    ) {
        throw createError({
            status: 400,
        });
    }

    const allowedRedirectHosts =
        runtimeConfig.allowedAuthRedirectHosts as string[];
    if (
        !allowedRedirectHosts.some((it) =>
            new RegExp(it).test(redirectUrl.hostname!)
        )
    ) {
        throw createError({
            status: 400,
        });
    }

    const accessToken = await getAccessToken(code);
    setCookie(event, 'github_access_token', accessToken, {
        path: '/',
        secure: runtimeConfig.secureCookies,
        httpOnly: true,
        maxAge: 28800, // 8 hours
        sameSite: 'lax',
    });
    try {
        const githubUserResponse = await fetch('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const githubUser: GitHubUser = await githubUserResponse.json();

        if (!runtimeConfig.allowedGithubUsers.includes(githubUser.login)) {
            throw createError({ status: 403 });
        }

        const githubUserId = parseInt(githubUser.id, 10).toString();
        const existingUser = await db.query.luciaUserTable.findFirst({
            where: eq(luciaUserTable.githubId, githubUserId),
        });

        if (existingUser) {
            const session = await lucia.createSession(existingUser.id, {});
            appendHeader(
                event,
                'Set-Cookie',
                lucia.createSessionCookie(session.id).serialize()
            );
            return sendRedirect(event, redirect);
        }

        const userId = generateIdFromEntropySize(10);
        await db.insert(luciaUserTable).values({
            id: userId,
            githubId: githubUserId,
            username: githubUser.login,
        });

        const session = await lucia.createSession(userId, {});
        appendHeader(
            event,
            'Set-Cookie',
            lucia.createSessionCookie(session.id).serialize()
        );
        return sendRedirect(event, redirect);
    } catch (e) {
        console.error('Auth callback failed.', e);
        throw createError({
            status: 500,
        });
    }
});

async function getAccessToken(code: string): Promise<string> {
    try {
        const queryParams = new URLSearchParams({
            code,
            client_id: runtimeConfig.gitProviderClientId,
            client_secret: runtimeConfig.gitProviderClientSecret,
            redirect_uri: `${runtimeConfig.public.siteUrl}/api/login/github/callback`,
        });
        const tokenUri = `${runtimeConfig.gitProviderTokenHost}${
            runtimeConfig.gitProviderTokenPath
        }?${queryParams.toString()}`;
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const tokenResponse = await fetch(tokenUri, {
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
        return token.access_token;
    } catch (e) {
        console.error('Failed to get an access token.', e);
        throw createError({
            status: 400,
        });
    }
}

interface GitHubUser {
    id: string;
    login: string;
}
