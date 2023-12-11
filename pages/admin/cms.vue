<template>
    <OgMeta
        title="WGV Admin | CMS"
        description="Wild Grace Videography Admin CMS dashboard."
    />
</template>

<script setup>
    definePageMeta({ middleware: 'auth', layout: 'admin-cms' });
    onMounted(() => {
        const decapCMSScript = document.createElement('script');
        decapCMSScript.setAttribute(
            'src',
            'https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js'
        );
        document.head.appendChild(decapCMSScript);
    });
</script>
