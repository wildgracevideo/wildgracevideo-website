<template>
    <OgMeta
        title="WGV Admin | CMS"
        description="Wild Grace Videography Admin CMS dashboard."
    />
    <div id="nc-root" class="h-dvh w-full"></div>
</template>

<script setup>
    definePageMeta({ middleware: 'auth', layout: 'admin' });
    useHead({
        link: [
            {
                href: '/admin/cms/config.yml',
                type: 'text/yaml',
                rel: 'cms-config-url',
            },
        ],
    });
    onMounted(async () => {
        if (!window.localStorage.getItem('decap-cms-user')) {
            const cmsAdminUser = await $fetch(`/api/admin/user/cms`);
            window.localStorage.setItem(
                'decap-cms-user',
                JSON.stringify(cmsAdminUser)
            );
        }
        const decapCMSScript = document.createElement('script');
        decapCMSScript.setAttribute(
            'src',
            'https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js'
        );
        document.head.appendChild(decapCMSScript);
    });
</script>
