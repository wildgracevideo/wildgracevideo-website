import { TokenSet } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '~/lib/prisma';
// eslint-disable-next-line import/no-unresolved
import { NuxtAuthHandler } from '#auth';

const runtimeConfig = useRuntimeConfig();

const PROVIDER = 'google';

export default NuxtAuthHandler({
    secret: runtimeConfig.nextAuthSecret,
    adapter: PrismaAdapter(prisma),
    providers: [
        // @ts-expect-error Needs default value, bad types in next-auth
        GoogleProvider.default({
            clientId: runtimeConfig.googleClientId!,
            clientSecret: runtimeConfig.googleClientSecret!,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            const [account] = await prisma.account.findMany({
                where: { userId: user.id, provider: PROVIDER },
            });
            if (
                (account.expires_at == null ||
                    account.expires_at * 1000 < Date.now()) &&
                account.refresh_token
            ) {
                // If the access token has expired, try to refresh it
                try {
                    // https://accounts.google.com/.well-known/openid-configuration
                    // We need the `token_endpoint`.
                    const response = await fetch(
                        'https://oauth2.googleapis.com/token',
                        {
                            headers: {
                                'Content-Type':
                                    'application/x-www-form-urlencoded',
                            },
                            body: new URLSearchParams({
                                client_id: runtimeConfig.googleClientId,
                                client_secret: runtimeConfig.googleClientSecret,
                                grant_type: 'refresh_token',
                                refresh_token: account.refresh_token,
                            }),
                            method: 'POST',
                        }
                    );

                    const tokens: TokenSet = await response.json();
                    if (!response.ok) {
                        throw tokens;
                    }

                    await prisma.account.update({
                        data: {
                            access_token: tokens.access_token,
                            expires_at: tokens.expires_at,
                            refresh_token:
                                tokens.refresh_token ?? account.refresh_token,
                        },
                        where: {
                            provider_providerAccountId: {
                                provider: PROVIDER,
                                providerAccountId: account.providerAccountId,
                            },
                        },
                    });
                } catch (error) {
                    console.error('Error refreshing access token', error);
                    // The error property will be used client-side to handle the refresh token error
                    session.error = 'RefreshAccessTokenError';
                }
            }
            return session;
        },
    },
});

declare module '@auth/core/types' {
    interface Session {
        error?: 'RefreshAccessTokenError';
    }
}

declare module '@auth/core/jwt' {
    interface JWT {
        access_token: string;
        expires_at: number;
        refresh_token: string;
        error?: 'RefreshAccessTokenError';
    }
}
