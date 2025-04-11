<template>
    <div>
        <h1 class="my-8 ml-8 text-2xl">Media Library</h1>
        <div
            class="border-website-tertiary my-8 flex w-full flex-row justify-between pl-8 text-lg"
        >
            <div>
                <button
                    v-if="currentFolder.length > 0"
                    class="cursor-hover text-website-primary mr-2 inline underline"
                    @click="() => goUpDirectory()"
                >
                    Back
                </button>
                <h2 class="inline">{{ currentFolder.join('/') || '/' }}</h2>
            </div>
            <div
                v-if="
                    currentFolder.length > 0 &&
                    (currentFolder[0] === 'images' ||
                        currentFolder[0] === 'videos' ||
                        currentFolder[0] === 'svgs' ||
                        currentFolder[0] === 'freebies')
                "
            >
                <UButton
                    color="warning"
                    size="lg"
                    variant="solid"
                    label="Create Folder"
                    class="mr-8"
                    @click="() => (showCreateFolder = true)"
                />
                <UButton
                    color="success"
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
                    class="text-website-off-black cursor-pointer underline"
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
        <UModal v-model:open="showCreateFolder">
            <template #content>
                <UCard>
                    <template #header> Folder name </template>
                    <UFormField
                        class="mx-8"
                        label="Folder Name"
                        :error="folderNameError"
                    >
                        <UInput
                            v-model="createFolderName"
                            color="neutral"
                            variant="outline"
                            placeholder="Folder name"
                        />
                    </UFormField>
                    <template #footer>
                        <div class="flex flex-row justify-end">
                            <UButton
                                label="Cancel"
                                color="error"
                                class="ml-auto"
                                @click="showCreateFolder = false"
                            />
                            <UButton
                                class="mx-4"
                                label="Create"
                                color="success"
                                @click="createFolderAction"
                            />
                        </div>
                    </template>
                </UCard>
            </template>
        </UModal>

        <UModal v-model:open="showDeleteConfirmation">
            <template #content>
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
                            color="error"
                            class="mx-4"
                            @click="showDeleteConfirmation = false"
                        />
                        <UButton
                            label="Yes"
                            color="success"
                            @click="deleteAction"
                        />
                    </span>
                </UCard>
            </template>
        </UModal>

        <UModal v-model:open="showShakaModal">
            <template #content>
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
            </template>
        </UModal>
    </div>
</template>

<script lang="ts" setup>
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
    let folder: string[] = [];
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

    const folderNameError: Ref<string | boolean> = ref(false);

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
                    fileNameWithoutPrefix.replaceAll(' ', '+') +
                    '/' +
                    fileNameWithoutPrefix +
                    '.mpd'
                );
            }
        }
        return content + '/' + fileName;
    }

    const previewFile = async (file: string) => {
        try {
            await navigateTo(getCloudFrontUrl(file), { external: true });
        } catch (error) {
            console.error('Error previewing file:', error);
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
        const MiB = 0x10_00_00;
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
            shouldUseMultipart: (file) => file.size > 100 * MiB,
            async createMultipartUpload(file, signal) {
                signal?.throwIfAborted();

                const metadata = {};

                Object.keys(file.meta || {}).forEach((key) => {
                    if (file.meta[key] != null) {
                        metadata[key] = file.meta[key].toString();
                    }
                });

                try {
                    return await $fetch('/api/admin/media/multipart', {
                        method: 'POST',
                        headers: {
                            accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: {
                            filename: file.name,
                            prefix: folder.join('/'),
                            type: file.type,
                            metadata,
                        },
                        signal,
                    });
                } catch (e: unknown) {
                    console.error('Failed to created multipart upload', e);
                    throw new Error('Failed to created multipart upload', {
                        cause: e,
                    });
                }
            },
            async abortMultipartUpload(file, { key, uploadId, signal }) {
                const filename = encodeURIComponent(key);
                const uploadIdEnc = encodeURIComponent(uploadId);
                try {
                    return (response = await $fetch(
                        `/api/admin/media/multipart/${uploadIdEnc}?key=${filename}`,
                        {
                            method: 'DELETE',
                            signal,
                        }
                    ));
                } catch (e: unknown) {
                    console.error('Failed to abort multipart upload', e);
                    throw new Error('Failed to abort multipart upload', {
                        cause: e,
                    });
                }
            },
            async signPart(file, options) {
                const { uploadId, key, partNumber, signal } = options;

                signal?.throwIfAborted();

                if (uploadId == null || key == null || partNumber == null) {
                    throw new Error(
                        'Cannot sign without a key, an uploadId, and a partNumber'
                    );
                }

                const filename = encodeURIComponent(key);
                try {
                    return await $fetch(
                        `/api/admin/media/multipart/${uploadId}/${partNumber}?key=${filename}`,
                        { signal }
                    );
                } catch (e: unknown) {
                    console.error('Failed to signPart', e);
                    throw new Error('Failed to signPart', {
                        cause: e,
                    });
                }
            },
            async listParts(file, { key, uploadId }, signal) {
                signal?.throwIfAborted();

                const filename = encodeURIComponent(key);
                try {
                    return await $fetch(
                        `/api/admin/media/multipart/${uploadId}?key=${filename}`,
                        { signal }
                    );
                } catch (e: unknown) {
                    console.error('Failed to listParts', e);
                    throw new Error('Failed to listParts', {
                        cause: e,
                    });
                }
            },
            async completeMultipartUpload(
                file,
                { key, uploadId, parts },
                signal
            ) {
                signal?.throwIfAborted();

                const filename = encodeURIComponent(key);
                const uploadIdEnc = encodeURIComponent(uploadId);
                try {
                    return await $fetch(
                        `/api/admin/media/multipart/${uploadIdEnc}/complete?key=${filename}`,
                        {
                            method: 'POST',
                            headers: {
                                accept: 'application/json',
                            },
                            body: { parts },
                            signal,
                        }
                    );
                } catch (e: unknown) {
                    console.error('Failed to complete multipart upload', e);
                    throw new Error('Failed to complete multipart upload', {
                        cause: e,
                    });
                }
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
        } else if (
            currentFolder.value &&
            currentFolder.value.length > 0 &&
            currentFolder.value[0] === 'videos'
        ) {
            uppy.setOptions({
                restrictions: { allowedFileTypes: ['video/*'] },
            });
        } else if (
            currentFolder.value &&
            currentFolder.value.length > 0 &&
            currentFolder.value[0] === 'svgs'
        ) {
            uppy.setOptions({
                restrictions: { allowedFileTypes: ['.svg'] },
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
        if (!createFolderName.value) {
            folderNameError.value =
                'Folder name cannot contain a / nor be empty.';
        } else {
            const prefix = currentFolder.value.join('/') + '/';
            try {
                await $fetch(
                    `/api/admin/media/create-folder?key=${prefix}${createFolderName.value}`,
                    {
                        method: 'post',
                    }
                );
                toast.add({
                    title: `Successfully created the folder ${createFolderName.value}.`,
                    color: 'green',
                    icon: 'i-heroicons-check-badge',
                });
                showCreateFolder.value = false;
                await fetchFiles();
            } catch (e: unknown) {
                toast.add({
                    title: `Failed to create the folder ${createFolderName.value}.`,
                    color: 'red',
                    icon: 'i-heroicons-information-circle',
                });
                console.error(e);
                if (e.hasOwnProperty('data')) {
                    const errorBody = e.data;
                    if (errorBody?.statusMessage) {
                        folderNameError.value = errorBody!.statusMessage;
                    }
                }
            }
        }
    };

    const videoElement = ref<HTMLVideoElement>();

    let copyToClipboard = (_: string) => {};
    onMounted(async () => {
        if (window.shaka) {
            await loadShaka();
        } else {
            document.addEventListener('shaka-loaded', async () => {
                await loadShaka();
            });
        }

        async function loadShaka() {
            let estimatedBandwidth = 5000000; // This will default to the high resolution stream
            if (window.innerWidth < 1024) {
                estimatedBandwidth = 350000; // This will set the low resolution for small screens
            }
            watchEffect(async () => {
                if (videoElement.value) {
                    const player = new window.shaka.Player();
                    player.attach(videoElement.value);
                    const preloadManager = await player.preload(
                        selectedVideoFileName.value
                    );
                    player.configure({
                        streaming: {
                            bufferingGoal: 2,
                            rebufferingGoal: 1,
                            bufferBehind: 0,
                            lowLatencyMode: true,
                        },
                        abr: {
                            enabled: true,
                            defaultBandwidthEstimate: estimatedBandwidth,
                        },
                    });
                    player.configure('manifest.dash.ignoreMinBufferTime', true);
                    await player.load(preloadManager);
                }
            });
        }

        try {
            await fetchFiles();
        } catch (e: unknown) {
            console.error(e);
        }
        loading.value = false;
        createUppy();

        copyToClipboard = async (file: string) => {
            if (
                typeof window !== 'undefined' &&
                window &&
                window.navigator?.clipboard
            ) {
                try {
                    await window.navigator?.clipboard?.writeText(
                        getCloudFrontUrl(file)
                    );
                    toast.add({
                        title: `Successfully copied file url.`,
                        color: 'green',
                        icon: 'i-heroicons-check-badge',
                    });
                } catch (error) {
                    console.error(
                        'Error copying file content to clipboard:',
                        error
                    );
                }
            }
        };
    });
</script>
