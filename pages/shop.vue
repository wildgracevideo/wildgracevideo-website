<template>
    <OgMeta
        title="Wild Grace Videography | Shop"
        description="Check out new video idea products from Wild Grace Videography, that will help you Share Your Journey, Build Trust, and Watch Your Audience Grow in 30 Days."
    />
    <div
        class="bg-img mb-16 flex w-full flex-col items-center justify-center gap-8"
    >
        <h1
            class="subheading-font text-website-off-white max-w-md text-center text-4xl tracking-wide"
        >
            Welcome to the place where you get all of the content creation
            resources right at your fingertips.
        </h1>
        <ChevronDownIcon
            class="text-website-off-white h-16 w-16 cursor-pointer"
            @click="scrollDown"
        />
    </div>
    <h2 ref="heading" class="mb-8 text-center text-4xl">BROWSE ALL</h2>
    <div class="mx-8 mb-8 grid grid-cols-1 gap-8 text-center lg:grid-cols-2">
        <div v-for="shopItem in shopItems" :key="shopItem.productName">
            <NuxtLink
                v-if="isProduct(shopItem)"
                :to="`/products/${shopItem.path}`"
                :aria-label="shopItem.title"
                class="shadow-floating relative mx-auto mb-8 block max-h-96 w-fit overflow-hidden rounded-xl bg-cover bg-no-repeat"
            >
                <NuxtImg
                    :src="shopItem.productImage"
                    class="aspect-square max-h-96"
                    :alt="shopItem.imageDescription"
                    sizes="384px"
                />
                <div
                    class="absolute top-0 right-0 bottom-0 left-0 overflow-hidden opacity-0"
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
            <p
                v-if="isProduct(shopItem) && shopItem.priceDollars"
                class="mx-auto max-w-sm"
            >
                <span
                    v-if="shopItem.originalPriceDollars"
                    class="line-through decoration-2"
                    >${{ shopItem.originalPriceDollars }}</span
                >
                ${{ shopItem.priceDollars }}
            </p>
            <p v-else class="mx-auto max-w-sm">FREE</p>
        </div>
        <FreebieModal
            v-model="selectedFreebie"
            :show-modal="showFreebieModal"
            :modal-title="modalTitle"
            @dismiss="showFreebieModal = false"
        />
    </div>
</template>

<script setup lang="ts">
    import { ChevronDownIcon } from '@heroicons/vue/20/solid';
    import { type FreebieModel } from '~/components/FreebieModal.vue';
    import type { CmsFreebie, CmsProduct } from '~/types/cms';

    const heading: Ref<HTMLElement | null> = ref(null);

    const scrollDown = () => {
        heading.value?.scrollIntoView({ behavior: 'smooth' });
    };

    const { data } = await useAsyncData('products', () =>
        queryCollection('content').where('stem', 'LIKE', 'product/%').all()
    );

    const { data: freebieData } = await useAsyncData('freebies', () =>
        queryCollection('content').where('stem', 'LIKE', 'freebie/%').all()
    );

    const showFreebieModal = ref(false);

    const modalTitle = ref('');

    const selectedFreebie: Ref<FreebieModel> = ref({
        freebieName: '',
        fileName: '',
        fileURL: '',
    });

    const loadFreebieModal = (shopItem: {
        productName: string;
        fileName: string;
        fileURL: string;
    }) => {
        modalTitle.value = `Get your ${shopItem.productName}`;
        showFreebieModal.value = true;
        selectedFreebie.value = {
            freebieName: shopItem.productName,
            fileName: shopItem.fileName,
            fileURL: shopItem.fileURL,
        };
    };

    const products = data!.value!.map(
        (it) => it.meta
    ) as unknown as CmsProduct[];
    const freebies = freebieData!.value!.map(
        (it) => it.meta
    ) as unknown as CmsFreebie[];
    let shopItems: Array<CmsProduct | CmsFreebie> = [];
    shopItems =
        shopItems
            .concat(products)
            .concat(freebies)
            .sort(
                (a, b) =>
                    new Date(b.publishedDate).getTime() -
                    new Date(a.publishedDate).getTime()
            ) || [];

    console.log(freebies);
    function isProduct(item: CmsProduct | CmsFreebie): item is CmsProduct {
        return (item as CmsProduct).productImage !== undefined;
    }
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
