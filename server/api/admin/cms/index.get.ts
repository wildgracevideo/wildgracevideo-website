const runtimeConfig = useRuntimeConfig();

export default defineEventHandler((_event): string => {
    return `Hello<br>
    <a href="/api/admin/cms/auth" target="_self">
      Log in with ${runtimeConfig.gitProvider}
    </a>`;
});
