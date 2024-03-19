<template>
    <TransitionRoot as="template" :show="showModal">
        <Dialog as="div" class="relative z-10" @close="showModal = false">
            <TransitionChild
                as="template"
                enter="ease-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in duration-200"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div
                    class="transition-opacity fixed inset-0 bg-gray-500 bg-opacity-75"
                />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div
                    class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
                >
                    <TransitionChild
                        as="template"
                        enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <DialogPanel
                            class="transition-all relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg"
                        >
                            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div class="sm:flex sm:items-start">
                                    <div
                                        class="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left"
                                    >
                                        <DialogTitle
                                            as="h3"
                                            class="mb-8 text-xl font-semibold leading-6 text-gray-900"
                                            >Send email</DialogTitle
                                        >
                                        <form class="mt-2 w-full">
                                            <FormRequiredInput
                                                id="toEmail"
                                                v-model="toEmailModel"
                                                title="To Email"
                                                :is-required="true"
                                                title-text-class="text-gray-500 text-xs"
                                                input-class="text-sm w-full mb-4"
                                                hint="To Email"
                                            />
                                            <FormRequiredInput
                                                id="name"
                                                v-model="nameModel"
                                                title="Name"
                                                :is-required="true"
                                                title-text-class="text-gray-500 text-xs"
                                                input-class="text-sm w-full"
                                                hint="Name"
                                            />
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
                            >
                                <button
                                    type="button"
                                    class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                                    :disabled="sendingMessage"
                                    @click="send"
                                >
                                    Send
                                </button>
                                <button
                                    ref="cancelButtonRef"
                                    type="button"
                                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    @click="showModal = false"
                                >
                                    Cancel
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
    import {
        Dialog,
        DialogPanel,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
    } from '@headlessui/vue';
    import type { InferInsertModel } from 'drizzle-orm';
    import type { messageReplies } from '~/drizzle/schema';

    const props = defineProps<{
        modelValue: boolean;
        toEmail: string;
        name: string;
        messageId: number;
        sendHandler: (
            messageReplyRequest: InferInsertModel<typeof messageReplies>
        ) => Promise<void>;
    }>();

    const emit = defineEmits(['update:modelValue']);

    const showModal = computed({
        get() {
            return props.modelValue;
        },
        set(value) {
            emit('update:modelValue', value);
        },
    });

    const toEmailModel = ref(props.toEmail);
    const nameModel = ref(props.name);

    const sendingMessage = ref(false);

    const send = async () => {
        const messageReplyRequest: InferInsertModel<typeof messageReplies> = {
            name: nameModel.value,
            toEmail: toEmailModel.value,
            messageId: props.messageId,
        };
        sendingMessage.value = true;
        await props.sendHandler(messageReplyRequest);
        sendingMessage.value = false;
        showModal.value = false;
    };
</script>
