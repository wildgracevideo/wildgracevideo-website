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
            <div>
                <UButton
                    color="amber"
                    size="lg"
                    variant="solid"
                    label="Create Folder"
                    class="mr-8"
                    @click="() => (showCreateFolder = true)"
                />
                <UButton
                    color="green"
                    size="lg"
                    variant="solid"
                    label="Upload"
                    class="mr-8"
                    @click="() => launchUppyModal()"
                />
            </div>
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
                <div class="flex flex-row justify-end">
                    <ClipboardIcon
                        v-if="!row.isFolder"
                        class="mr-4 h-6 w-6 cursor-pointer"
                        fill="gray"
                        @click="() => copyToClipboard(row.name)"
                    />
                    <TrashIcon
                        class="mx-4 inline h-6 w-6 cursor-pointer"
                        @click="
                            () => {
                                selectedObject = row;
                                showDeleteConfirmation = true;
                            }
                        "
                    />
                </div>
            </template>
        </UTable>
        <UModal v-model="showCreateFolder">
            <UCard>
                <template #header> Folder name </template>
                <UFormGroup
                    class="mx-8"
                    label="Folder Name"
                    :error="folderNameError"
                >
                    <UInput
                        v-model="createFolderName"
                        color="black"
                        variant="outline"
                        placeholder="Folder name"
                    />
                </UFormGroup>
                <template #footer>
                    <div class="flex flex-row justify-end">
                        <UButton
                            label="Cancel"
                            color="red"
                            class="ml-auto"
                            @click="showCreateFolder = false"
                        />
                        <UButton
                            class="mx-4"
                            label="Create"
                            color="green"
                            @click="createFolderAction"
                        />
                    </div>
                </template>
            </UCard>
        </UModal>

        <UModal v-model="showDeleteConfirmation">
            <UCard>
                <template #header>
                    Are you sure you want to delete
                    <b> {{ selectedObject.name }} </b>?
                    {{
                        selectedObject.isFolder
                            ? ' \n(Folder must be empty to delete)'
                            : ''
                    }}
                </template>
                <span class="float-right my-4">
                    <UButton
                        label="No"
                        color="red"
                        class="mx-4"
                        @click="showDeleteConfirmation = false"
                    />
                    <UButton label="Yes" color="green" @click="deleteAction" />
                </span>
            </UCard>
        </UModal>

        <UModal v-model="showShakaModal">
            <UCard>
                <template #header> Video preview </template>
                <video
                    ref="videoElement"
                    controls
                    muted
                    disablePictureInPicture
                    playsinline
                    autoplay
                    data-shaka-player
                ></video>
            </UCard>
        </UModal>
    </div>
</template>

<script lang="ts" setup>
    import shaka from 'shaka-player';
    import { ClipboardIcon, TrashIcon } from '@heroicons/vue/24/outline';
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

    const showDeleteConfirmation = ref(false);
    const showCreateFolder = ref(false);

    const selectedObject = ref({});

    const files = ref([]);

    const createFolderName = ref('');

    const folderNameError = ref(false);

    const showShakaModal = ref(false);

    const selectedVideoFileName = ref('');

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
            console.log(currentFolder.value);
            if (currentFolder.value && currentFolder.value[0] === 'videos') {
                selectedVideoFileName.value = getCloudFrontUrl(row.name);
                showShakaModal.value = true;
            } else {
                previewFile(row.name);
            }
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
        if (currentFolder.value.length > 0) {
            content += '/' + currentFolder.value.join('/');
            if (currentFolder.value[0] === 'videos') {
                const fileNameWithoutPrefix = fileName.replace(/\.[^/.]+$/, '');
                return (
                    content +
                    '/' +
                    encodeURI(fileNameWithoutPrefix) +
                    '/' +
                    encodeURI(fileNameWithoutPrefix) +
                    '.mpd'
                );
            }
        }
        return content + '/' + encodeURI(fileName);
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

    function launchUppyModal() {
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

    const toast = useToast();

    const deleteAction = async () => {
        try {
            let key;
            if (currentFolder.value && currentFolder.value.length > 0) {
                key =
                    currentFolder.value.join('/') +
                    '/' +
                    selectedObject.value.name;
            } else {
                key = selectedObject.value.name;
            }
            await $fetch(`/api/admin/media?key=${key}`, {
                method: 'delete',
            });
            toast.add({
                title: `Successfully deleted ${selectedObject.value.name}.`,
                color: 'green',
                icon: 'i-heroicons-check-badge',
            });
            await fetchFiles();
        } catch (e) {
            if (selectedObject.value.isFolder) {
                toast.add({
                    title: `Failed to delete the folder, ${selectedObject.value.name}, folders must be empty to delete.`,
                    color: 'red',
                    icon: 'i-heroicons-information-circle',
                });
            } else {
                toast.add({
                    title: `Failed to delete the file, ${selectedObject.value.name}.`,
                    color: 'red',
                    icon: 'i-heroicons-information-circle',
                });
            }
            console.error(e);
        } finally {
            showDeleteConfirmation.value = false;
        }
    };

    const createFolderAction = async () => {
        if (!createFolderName.value || createFolderName.value.contains('/')) {
            folderNameError.value =
                'Folder name cannot contain a / nor be empty.';
        }
        try {
            await $fetch(
                `/api/admin/media/create-folder?key=${createFolderName.value}`,
                {
                    method: 'post',
                }
            );
            toast.add({
                title: `Successfully created the folder ${createFolderName.value}.`,
                color: 'green',
                icon: 'i-heroicons-check-badge',
            });
            showDeleteConfirmation.value = false;
            await fetchFiles();
        } catch (e) {
            toast.add({
                title: `Failed to create the folder ${createFolderName.value}.`,
                color: 'red',
                icon: 'i-heroicons-information-circle',
            });
            console.error(e);
        }
    };

    const videoElement = ref<HTMLVideoElement>();

    watchEffect(async () => {
        if (videoElement.value) {
            const player = new shaka.Player(videoElement.value);
            await player.load(selectedVideoFileName.value);
        }
    });

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
