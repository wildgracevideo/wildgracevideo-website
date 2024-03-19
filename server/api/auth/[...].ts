import { Adapter, DefaultSession, TokenSet } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { and, eq } from 'drizzle-orm';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '~/lib/db';
import { accounts } from '~/drizzle/schema';
// eslint-disable-next-line import/no-unresolved
import { NuxtAuthHandler } from '#auth';

const runtimeConfig = useRuntimeConfig();

const PROVIDER = 'google';

export default NuxtAuthHandler({
    secret: runtimeConfig.nextAuthSecret,
    adapter: DrizzleAdapter(db) as Adapter,
    providers: [
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
            const [account] = await db
                .select()
                .from(accounts)
                .where(
                    and(
                        eq(accounts.userId, user.id),
                        eq(accounts.provider, PROVIDER)
                    )
                )
                .all();
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

                    await db
                        .update(accounts)
                        .set({
                            access_token: tokens.access_token,
                            expires_at: tokens.expires_at,
                            refresh_token:
                                tokens.refresh_token ?? account.refresh_token,
                        })
                        .where(
                            and(
                                eq(accounts.provider, PROVIDER),
                                eq(
                                    accounts.providerAccountId,
                                    account.providerAccountId
                                )
                            )
                        );
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

declare module 'next-auth' {
    interface Session extends DefaultSession {
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
