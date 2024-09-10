const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event) => {
    const accessToken = getCookie(event, 'github_access_token');
    const githubUserResponse = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const githubUser = await githubUserResponse.json();
    githubUser.token = accessToken;
    githubUser.backendName = runtimeConfig.gitProvider;
    githubUser.email = null;
    githubUser.name = null;
    githubUser.notification_email = null;
    return githubUser;
});
