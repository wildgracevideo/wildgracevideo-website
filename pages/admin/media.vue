<template>
    <div>
        <h1 class="my-8 ml-8 text-2xl">Media Library</h1>
        <div class="my-8 flex w-full flex-row justify-between pl-8 text-lg">
            <div>
                <button
                    v-if="currentFolder.length > 0"
                    class="cursor-hover mr-2 inline text-website-primary underline"
                    @click="() => goUpDirectory()"
                >
                    Back
                </button>
                <h2 class="inline">{{ currentFolder.join('/') || '/' }}</h2>
            </div>
            <UButton
                color="green"
                size="lg"
                variant="solid"
                label="Upload"
                class="mr-8"
                @click="() => launchModal()"
            />
        </div>
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
                    {{ row.name }}
                </button>
            </template>

            <template #size-data="{ row }">
                <span>
                    {{ formatBytes(row.size) }}
                </span>
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
    import { Uppy } from '@uppy/core';
    import Dashboard from '@uppy/dashboard';
    import AwsS3 from '@uppy/aws-s3';

    import '@uppy/core/dist/style.min.css';
    import '@uppy/dashboard/dist/style.min.css';

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
            const prefix = currentFolder.value.join('/') + '/';
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
        const lastFolderName = folderName.replace(/\/$/, '').split('/').pop();
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
        console.log(currentFolder.value);
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

    function formatBytes(bytes, decimals = 2) {
        if (!+bytes) {
            return '-';
        }

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${
            sizes[i]
        }`;
    }

    let uppy;
    function createUppy() {
        uppy = new Uppy({}).use(Dashboard).use(AwsS3, {
            async getUploadParameters(file) {
                const signS3Response = await $fetch(
                    `/api/admin/media/sign-s3`,
                    {
                        method: 'POST',
                        body: {
                            prefix: folder.join('/'),
                            filename: file.name,
                            contentType: file.type,
                        },
                    }
                );
                return {
                    method: signS3Response.method,
                    url: signS3Response.url,
                    fields: signS3Response.fields, // For presigned PUT uploads, this should be left empty.
                    headers: {
                        'Content-Type': file.type,
                    },
                };
            },
        });

        uppy.on('complete', (result) => {
            console.log(
                'Upload complete! We’ve uploaded these files:',
                result.successful
            );
        });

        uppy.on('upload-success', (file, _data) => {
            console.log(
                'Upload success! We’ve uploaded this file:',
                file.meta['name']
            );
        });

        uppy.on('dashboard:modal-closed', async () => {
            await fetchFiles();
        });
    }

    function launchModal() {
        if (
            currentFolder.value &&
            currentFolder.value.length > 0 &&
            currentFolder.value[0] === 'images'
        ) {
            uppy.setOptions({
                restrictions: { allowedFileTypes: ['image/*'] },
            });
        } else {
            uppy.setOptions({
                restrictions: { allowedFileTypes: ['video/*', '.pdf', '.txt'] },
            });
        }
        const dashboard = uppy.getPlugin('Dashboard');
        dashboard.openModal();
    }

    onMounted(async () => {
        try {
            await fetchFiles();
        } catch (e: unknown) {
            console.error(e);
        }
        loading.value = false;
        createUppy();
    });
</script>
