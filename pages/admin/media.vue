<template>
    <div>
        <h1 class="ml-8 my-8 text-2xl">Media Library</h1>
        <UTable :columns="columns" :rows="files" :loading="!files" class="min-h-96">
            <template #name-data="{ row }">
                <button 
                    v-if="row.isFolder" 
                    class="cursor-pointer text-website-accent hover:underline"
                    @click="() => handleNameClick(row)"
                >
                    {{ row.name }}
                </button>
            </template>
            <template #icon-data="{ row }">
                <UButton 
                    v-if="row.isFolder"
                    color="gray" 
                    variant="ghost" 
                    icon="i-folder-24-outline w-6 h-6"
                    @click="() => copyToClipboard(row)" 
                />
                <UButton
                    v-else
                    color="gray"
                    variant="ghost"
                    class="i-document-24-outline"
                />
            </template>

            <template #action-data="{ row }">
                <UButton 
                    color="gray" 
                    variant="ghost" 
                    icon="i-clipboard-24-outline w-6 h-6"
                    @click="() => copyToClipboard(row)" 
                />
            </template>
        </UTable>
    </div>
</template>

<script lang="ts" setup>
const files = ref<S3Objcet[]>([]);
const columns = [
    { key: 'icon' },
    { key: 'name', label: 'Name' },
    { key: 'type', label: 'Type' },
    { key: 'lastModified', label: 'Last Modified' },
    { key: 'size', label: 'Size' },
    { key: 'action' },
];

definePageMeta({ middleware: 'auth', layout: 'admin' });
useHead({
    title: 'WGV Admin | Media',
});

const currentFolder = [];

const runtimeConfig = useRuntimeConfig();

const fetchFiles = async (prefix = '') => {
    try {
        if (prefix) {
            const { data } = await useFetch(`/api/admin/media?prefix=${prefix}`);
            files.value = data.value as S3Object[];
        } else {
            const { data } = await useFetch(`/api/admin/media`);
            files.value = data.value as S3Object[];
        }

    } catch (error) {
        console.error('Error fetching files:', error);
    }
};

const handleNameClick = (row) => {
    if (row.isFolder) {
        handleFolderClick(row.name);
    } else {
        previewFile(row.name);
    }
};

const handleFolderClick = (folderName) => {
    currentFolder.push(folderName);
    fetchFiles(folderName);
};

const previewFile = async (file) => {
    try {
        const content =
            runtimeConfig.public.cloudfrontUrl +
            '/' +
            folderNames.join(',') +
            encodeUri(file.name);
        await navigateTo(content);
    } catch (error) {
        console.error('Error previewing file:', error);
    }
};

const copyToClipboard = async (file) => {
    try {
        const content =
            runtimeConfig.public.cloudfrontUrl +
            '/' +
            folderNames.join(',') +
            encodeUri(file.name);
        navigator.clipboard.writeText(content);
        console.log('File content copied to clipboard:', content);
    } catch (error) {
        console.error('Error copying file content to clipboard:', error);
    }
};

await fetchFiles();
</script>
