<template>
    <div>
        <h1 class="my-8 ml-8 text-2xl">Media Library</h1>
        <h2 class="my-8 ml-8 text-lg">
            <button
                v-if="currentFolder.length > 0"
                class="cursor-hover mr-2 text-website-primary underline"
                @click="() => goUpDirectory()"
            >
                Back</button
            >{{ currentFolder.join('/') || '/' }}
        </h2>
        <UTable
            :columns="columns"
            :rows="files || []"
            :loading="loading"
            class="min-h-96"
        >
            <template #lastModified-data="{ row }">
                <span>
                    {{ transformDateTime(row.lastModified) }}
                </span>
            </template>

            <template #name-data="{ row }">
                <button
                    class="cursor-pointer text-website-primary underline"
                    @click="() => handleNameClick(row)"
                >
                    {{ row.name.replace(currentFolder.join('/'), '') }}
                </button>
            </template>

            <template #action-data="{ row }">
                <ClipboardIcon
                    v-if="!row.isFolder"
                    class="h-6 w-6 cursor-pointer"
                    fill="gray"
                    @click="() => copyToClipboard(row.name)"
                />
            </template>
        </UTable>
    </div>
</template>

<script lang="ts" setup>
    import { ClipboardIcon } from '@heroicons/vue/24/outline';

    const columns = [
        { key: 'name', label: 'Name' },
        { key: 'lastModified', label: 'Last Modified' },
        { key: 'size', label: 'Size' },
        { key: 'action' },
    ];

    definePageMeta({ middleware: 'auth', layout: 'admin' });
    useHead({
        title: 'WGV Admin | Media',
    });

    const route = useRoute();
    const queryFolder = route.query.folder;
    let folder = [];
    if (queryFolder && queryFolder !== '/') {
        folder = queryFolder.split('/');
    }
    const currentFolder = ref(folder);

    const runtimeConfig = useRuntimeConfig();

    const loading = ref(true);

    const files = ref([]);

    const { push } = useRouter();

    const fetchFiles = async () => {
        try {
            files.value = [];
            loading.value = true;
            const prefix = currentFolder.value.join('/');
            const data = await $fetch(
                `/api/admin/media?prefix=${prefix || '/'}`
            );

            files.value = data.filter(
                (it) => it.name !== currentFolder.value.join('/')
            );
        } catch (error) {
            console.error('Error fetching files:', error);
        }
        loading.value = false;
    };

    function transformDateTime(dateString: string) {
        try {
            const localDate = new Date(dateString);
            return new Intl.DateTimeFormat(undefined, {
                timeStyle: 'short',
                dateStyle: 'medium',
            }).format(localDate);
        } catch (e: unknown) {
            return dateString;
        }
    }

    async function goUpDirectory() {
        if (currentFolder.value.length > 0) {
            currentFolder.value.pop();
            push({
                query: {
                    folder: currentFolder.value.join('/'),
                },
            });

            await fetchFiles();
        }
    }

    const handleNameClick = (row) => {
        if (row.isFolder) {
            handleFolderClick(row.name);
        } else {
            previewFile(row.name);
        }
    };

    const handleFolderClick = async (folderName: string) => {
        const lastFolderName = folderName.replace(/\/$/g, '').split('/').pop();
        currentFolder.value.push(lastFolderName);
        push({
            query: {
                folder: currentFolder.value.join('/'),
            },
        });
        await fetchFiles();
    };

    function getCloudFrontUrl(fileName: string) {
        let content = runtimeConfig.public.cloudfrontUrl;
        if (currentFolder.value.length > 0) {
            content += '/' + currentFolder.value.join('/');
        }
        return content + '/' + encodeURIComponent(fileName);
    }

    const previewFile = async (file: string) => {
        try {
            await navigateTo(getCloudFrontUrl(file), { external: true });
        } catch (error) {
            console.error('Error previewing file:', error);
        }
    };

    const copyToClipboard = async (file: string) => {
        try {
            navigator.clipboard.writeText(getCloudFrontUrl(file));
            console.log('File content copied to clipboard:', content);
        } catch (error) {
            console.error('Error copying file content to clipboard:', error);
        }
    };

    onMounted(async () => {
        try {
            await fetchFiles();
        } catch (e: unknown) {
            console.error(e);
        }
        loading.value = false;
    });
</script>
