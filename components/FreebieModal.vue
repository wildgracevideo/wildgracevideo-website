<template>
    <Modal
        :show="showModal"
        :title="modalTitle"
        @close="() => $emit('dismiss')"
    >
        <form class="mt-20" @submit.prevent="submitFreebieForm">
            <div class="grid grid-cols-3 gap-y-4">
                <label for="firstName" class="text-left text-2xl"
                    >First Name:
                </label>
                <input
                    id="firstName"
                    v-model="firstName"
                    class="col-span-2 rounded-sm border border-website-tertiary bg-website-background"
                    type="text"
                    name="firstName"
                    required
                />
                <label for="lastName" class="text-left text-2xl"
                    >Last Name:
                </label>
                <input
                    id="lastName"
                    v-model="lastName"
                    class="col-span-2 rounded-sm border border-website-tertiary bg-website-background"
                    type="text"
                    name="lastName"
                    required
                />
                <label for="email" class="text-left text-2xl">Email: </label>
                <input
                    id="email"
                    v-model="email"
                    class="col-span-2 rounded-sm border border-website-tertiary bg-website-background"
                    type="email"
                    name="email"
                    required
                />
            </div>

            <hr class="my-8 h-px border-0 bg-website-tertiary" />
            <DefaultButton action="submit" class="ml-auto" title="Submit" />
        </form>
    </Modal>
</template>

<script setup lang="ts">
    export interface FreebieModel {
        freebieName: string;
        fileName: string;
        fileURL: string;
    }

    const props = defineProps<{
        showModal: boolean;
        modalTitle: string;
        modelValue: FreebieModel;
    }>();

    const emit = defineEmits(['update:modelValue', 'dismiss']);

    const selectedFreebie: ComputedRef<FreebieModel> = computed({
        get() {
            return props.modelValue;
        },
        set(value) {
            emit('update:modelValue', value);
        },
    });

    const email = ref('');
    const firstName = ref('');
    const lastName = ref('');

    const submitFreebieForm = async () => {
        console.log({
            email: email.value,
            freebieName: selectedFreebie.value.fileName,
        });

        await $fetch(`/api/forms/freebie`, {
            method: 'POST',
            body: {
                email: email.value,
                firstName: firstName.value,
                lastName: lastName.value,
                freebieName: selectedFreebie.value.freebieName,
            },
        });
        emit('dismiss');
        const file = selectedFreebie.value.fileURL;
        const fileName = selectedFreebie.value.fileName;
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
    };
</script>
