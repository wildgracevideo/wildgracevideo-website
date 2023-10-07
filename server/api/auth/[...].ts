import { NuxtAuthHandler } from "#auth";
import { TokenSet } from "next-auth";

const { COGNITO_ISSUER, COGNITO_CLIENT_ID, COGNITO_CLIENT_SECRET, COGNITO_DOMAIN } =
  process.env;

const runtimeConfig = useRuntimeConfig();

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  providers: [
    {
      id: `cognito_google`,
      name: 'Google',
      type: "oauth",
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
      wellKnown: `${COGNITO_ISSUER}/.well-known/openid-configuration`,

      // Authorization endpoint configuration
      authorization: {
        url: `${COGNITO_DOMAIN}/oauth2/authorize`,
        params: {
          response_type: "code",
          client_id: COGNITO_CLIENT_ID,
          identity_provider: "Google",
          redirect_uri: `${runtimeConfig.public.siteUrl}/api/auth/callback/cognito_google`,
        },
      },

      // Token endpoint configuration
      token: {
        url: `${COGNITO_DOMAIN}/oauth2/token`,
        params: {
          grant_type: "authorization_code",
          client_id: COGNITO_CLIENT_ID,
          client_secret: COGNITO_CLIENT_SECRET,
          redirect_uri: `${runtimeConfig.public.siteUrl}/api/auth/callback/cognito_google`,
        },
      },

      // userInfo endpoint configuration
      userinfo: {
        url: `${COGNITO_DOMAIN}/oauth2/userInfo`,
      },

      // Profile to return after successcul auth.
      // You can do some transformation on your profile object here.
      profile: function (profile) {
        return {
          id: profile.sub,
          ...profile,
        };
      },
    },
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Return true to allow sign in and false to block sign in.
      return true;
    },
    async redirect(params) {
      // Return the url to redirect to after successful sign in.
      return params.url;
    },
    async jwt({ token, account, profile, user }) {
      if (account) {
        // This is an initial login, set JWT tokens.
        return {
          ...token,
          accessToken: account.access_token,
          idToken: account.id_token,
          refreshToken: account.refresh_token,
          expiresAt: account.expires_at,
          tokenType: 'Bearer'
        }
      }
      if (Date.now() < (token.expiresAt as number)) {
        // Access/Id token are still valid, return them as is.
        return token;
      }
      // Access/Id tokens have expired, retrieve new tokens using the 
      // refresh token
      try {
        const response = await fetch(`${COGNITO_DOMAIN}/oauth2/token`, {
          headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            client_id: COGNITO_CLIENT_ID as string,
            client_secret: COGNITO_CLIENT_SECRET as string,
            grant_type: "refresh_token",
            refresh_token: token.refreshToken as string
          }),
          method: "POST"
        });
    
        const tokens: TokenSet = await response.json();
    
        if (!response.ok) {
          throw tokens;
        }
    
        return {
          ...token,
          accessToken: tokens.access_token,
          idToken: tokens.id_token,
          expiresAt: Date.now() + (Number(tokens.expires_in) * 1000)
        }
      } catch (error) {
        // Could not refresh tokens, return error
        console.error("Error refreshing access and id tokens: ", error);
        return { ...token, error: "RefreshTokensError" as const }
      }
    },
  }
});
