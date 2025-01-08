<template>
    <OgMeta
        title="Wild Grace Videography | Shop"
        description="Check out new video idea products from Wild Grace Videography, that will help you Share Your Journey, Build Trust, and Watch Your Audience Grow in 30 Days."
    />
    <div
        class="bg-img mb-16 flex w-full flex-col items-center justify-center gap-8"
    >
        <h1
            class="font-family-optimus max-w-md text-center text-4xl tracking-wide text-white"
        >
            welcome to the place where you get all of the content creation
            resources right at your fingertips.
        </h1>
        <ChevronDownIcon
            class="h-16 w-16 cursor-pointer text-white"
            @click="scrollDown"
        />
    </div>
    <h2 ref="heading" class="mb-8 text-center text-4xl">BROWSE ALL</h2>
    <div class="mx-8 mb-8 grid grid-cols-1 gap-8 text-center lg:grid-cols-2">
        <div v-for="shopItem in shopItems" :key="shopItem.productName">
            <NuxtLink
                v-if="shopItem.path"
                :to="`/products/${shopItem.path}`"
                :aria-label="shopItem.title"
                class="shadow-floating bg-cover relative mx-auto mb-8 block max-h-96 w-fit overflow-hidden rounded-xl bg-no-repeat"
            >
                <NuxtImg
                    :src="shopItem.productImage"
                    class="aspect-square max-h-96"
                    :alt="shopItem.imageDescription"
                    sizes="384px"
                />
                <div
                    class="absolute bottom-0 left-0 right-0 top-0 overflow-hidden opacity-0"
                />
            </NuxtLink>
            <div
                v-else
                role="button"
                tabindex="0"
                @keydown="() => loadFreebieModal(shopItem)"
                @click="() => loadFreebieModal(shopItem)"
            >
                <FileOrVideo
                    :file="shopItem.fileInfo"
                    sizes="384px"
                    parent-class="aspect-square shadow-floating relative mx-auto mb-8 block max-h-96 w-fit overflow-hidden rounded-xl"
                    class="cursor-pointer"
                    :is-lazy="false"
                    :with-sound-control="false"
                />
            </div>
            <h3 class="mx-auto mb-4 h-14 max-w-sm text-lg">
                {{ shopItem.productName }}
            </h3>
            <p class="mx-auto mb-4 max-w-sm text-sm">
                {{ shopItem.shortDescription }}
            </p>
            <p v-if="shopItem.priceDollars" class="mx-auto max-w-sm">
                <span
                    v-if="shopItem.originalPriceDollars"
                    class="line-through decoration-2"
                    >${{ shopItem.originalPriceDollars }}</span
                >
                ${{ shopItem.priceDollars }}
            </p>
            <p v-else class="mx-auto max-w-sm">FREE</p>
        </div>
        <Modal
            :show="showFreebieModal"
            :title="modalTitle"
            @close="() => (showFreebieModal = false)"
        >
            <form class="mt-20" @submit.prevent="submitFreebieForm">
                <div class="grid grid-cols-3 gap-y-4">
                    <label
                        for="firstName"
                        class="text-left text-2xl text-website-primary"
                        >First Name:
                    </label>
                    <input
                        id="firstName"
                        v-model="firstName"
                        class="col-span-2 rounded border border-website-primary"
                        type="text"
                        name="firstName"
                        required
                    />
                    <label
                        for="lastName"
                        class="text-left text-2xl text-website-primary"
                        >Last Name:
                    </label>
                    <input
                        id="lastName"
                        v-model="lastName"
                        class="col-span-2 rounded border border-website-primary"
                        type="text"
                        name="lastName"
                        required
                    />
                    <label
                        for="email"
                        class="text-left text-2xl text-website-primary"
                        >Email:
                    </label>
                    <input
                        id="email"
                        v-model="email"
                        class="col-span-2 rounded border border-website-primary"
                        type="email"
                        name="email"
                        required
                    />
                </div>

                <hr class="my-8 h-px border-0 bg-gray-300" />
                <button
                    type="submit"
                    class="ml-auto block rounded border-2 border-website-off-black bg-website-primary px-6 py-2 text-website-off-white hover:bg-website-off-white hover:text-website-off-black"
                >
                    Submit
                </button>
            </form>
        </Modal>
    </div>
</template>

<script setup lang="ts">
    import { ChevronDownIcon } from '@heroicons/vue/20/solid';

    const heading: Ref<HTMLElement | null> = ref(null);

    const scrollDown = () => {
        heading.value?.scrollIntoView({ behavior: 'smooth' });
    };

    const { data } = await useAsyncData('products', () =>
        queryContent('/product').find()
    );

    const { data: freebieData } = await useAsyncData('freebies', () =>
        queryContent('/freebie').find()
    );

    const showFreebieModal = ref(false);

    const email = ref('');

    const firstName = ref('');

    const lastName = ref('');

    const modalTitle = ref('');

    const selectedFreebie = reactive({});

    const loadFreebieModal = (shopItem) => {
        modalTitle.value = `Get your ${shopItem.productName}`;
        showFreebieModal.value = true;
        selectedFreebie.value = {
            freebieName: shopItem.productName,
            fileName: shopItem.fileName,
            fileURL: shopItem.fileURL,
        };
    };

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
        showFreebieModal.value = false;
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

    const shopItems =
        data
            .value!.concat(freebieData.value!)
            .sort(
                (a, b) =>
                    new Date(b.publishedDate).getTime() -
                    new Date(a.publishedDate).getTime()
            ) || [];
</script>

<style scoped>
    .bg-img {
        background-image: url('https://content.wildgracevideo.com/images/Website-Products/shop-cover.webp');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        height: 500px;
    }

    @media (min-width: 1024px) {
        .shadow-floating:hover {
            box-shadow: 8px 24px 48px 12px rgba(0, 0, 0, 0.2);
        }
    }
</style>
