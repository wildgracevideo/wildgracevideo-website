<template>
    <OgMeta :title="pageTitle" :description="description" :icon="ogIcon" />
    <SchemaOrgWebPage type="ItemPage" :name="pageTitle" />
    <SchemaOrgProduct
        :name="productTitle"
        :offers="
            packages.map((it) => {
                return {
                    price: it.price,
                    priceCurrency: 'USD',
                    availability: 'InStock',
                    name: it.title,
                };
            })
        "
        :description="description"
    />
    <h1 class="mx-auto w-fit text-4xl">
        <span
            class="font-family-cardo mx-2 block text-center lg:mx-auto xl:inline-block"
            >Wild Grace Videography</span
        ><span
            class="font-family-bright-sunshine mx-auto block text-center text-6xl lg:mx-4 xl:inline-block"
            >X</span
        ><span
            class="font-family-brittany grow-transition relative mx-2 block text-center lg:mx-auto xl:inline-block"
            >Samantha Melissa Marketing</span
        >
    </h1>
    <h2 class="mx-auto mb-6 mt-10 w-fit text-center text-2xl">
        {{ productTitle }}
    </h2>
    <p class="mx-8 max-w-4xl text-center lg:mx-auto">{{ heading }}</p>
    <p class="mx-4 mb-4 mt-4 text-center text-xl">
        Learn more about Samantha Melissa Marketing
        <a
            class="text-website-green underline"
            href="https://samanthamelissamarketing.com/"
            aria-label="Visit Samantha Melissa Marketing Website"
            >here</a
        >.
    </p>
    <p class="mx-auto mb-8 w-fit">3-Month Retainer</p>
    <section
        class="mx-4 mb-20 grid grid-cols-1 gap-20 sm:mx-16 lg:mx-4 lg:grid-cols-3 xl:mx-16"
    >
        <PackageItem
            v-for="(item, index) in packages"
            :key="item.title"
            :config="item"
            :enlarge="index == 1"
        />
    </section>
    <section class="rounded-3xl">
        <div
            class="border-y-16 border-custom-green mx-4 grid grid-cols-1 gap-4 rounded-3xl border-l-8 border-r-8 sm:mx-16 lg:mx-4 lg:grid-cols-3 xl:mx-16"
        >
            <div>
                <h3
                    class="font-family-spectral mx-auto mb-2 mt-4 w-fit text-center text-4xl font-bold"
                >
                    <span class="font-family-moontime">The</span> Add-Ons
                </h3>
                <PackageBubble :config="addons[0]" />
            </div>
            <PackageBubble :config="addons[1]" />
            <PackageBubble :config="addons[2]" />
        </div>
    </section>
    <p class="my-8 text-center">
        Social Media Packages are customizable based on your needs. Price range
        varies depending on scope of work.
    </p>
</template>

<script setup lang="ts">
    import { type Config } from '~/components/PackageItem.vue';

    const productTitle = 'Social Media Marketing + Video + Photo';

    const pageTitle =
        'Wild Grace Videography | Social Media Management Packages';

    const description =
        "Revamp your Colorado business' online presence with Samantha Melissa Marketing & Wild Grace Videography. Tailored packages for engaging social media!";

    const heading =
        'Wild Grace Videography and Samantha Melissa Marketing are partnering together to provide Colorado businesses with a full-service social media makeover. Elevate your online presence with our tailored packages designed to transform your social media platforms into engaging hubs for your audience.';

    const ogIcon = 'social-media-og.webp';

    const greenColor = 'rgba(110, 132, 103, 0.54)';
    const beigeColor = 'rgba(248, 240, 227, 0.7)';
    const addons = [
        {
            bgColor: beigeColor,
            details: [
                'Account setup assistance',
                'Additional Instagram/Facebook accounts',
            ],
        },
        {
            bgColor: beigeColor,
            details: [
                'Additional posts',
                'Daily monitoring and engagement',
                '1 Blog + social media blog post',
                'Additional marketing asset design',
                'Newsletter assistance',
            ],
        },
        {
            bgColor: greenColor,
            details: [
                'Additional photos',
                'Additional short form videos',
                'Long form videos',
                'Animated captions',
                'Talent acquisition',
                'Studio rental',
            ],
        },
    ];

    const packages: Config[] = [
        {
            title: 'The Beyond Basics',
            price: 1000,
            elements: [
                {
                    bgColor: beigeColor,
                    title: 'Social Media Management',
                    details: [
                        '1-Hour consultation',
                        'Audit of your social media accounts',
                        'Individual strategy tailored to your goals',
                        'Content idea calender',
                    ],
                },
                {
                    bgColor: greenColor,
                    title: 'Content Creation',
                    details: [
                        'Half-day (4 hours) on-site photo shoot',
                        '30 edited branding photos',
                        'One round of revisions',
                    ],
                },
            ],
        },
        {
            title: 'The Batch Bundle',
            price: 3000,
            elements: [
                {
                    bgColor: beigeColor,
                    title: 'Social Media Management',
                    details: [
                        '1-2 Instagram and Facebook social media feed & story posts per week',
                        'Social media graphic design',
                        'Caption writing',
                        'Content scheduling',
                        'Hashtag optimization',
                        'Quarterly performance tracking',
                        'Strategy suggestions',
                        '1-Hour consultation',
                    ],
                },
                {
                    bgColor: greenColor,
                    title: 'Content Creation',
                    details: [
                        'Half-day (4 hours) on-site video & photo shoot',
                        '30 edited branding photos',
                        '(8) 15-30 sec social media videos (2 videos/week)',
                        'Engaging captions',
                        'One round of revisions',
                    ],
                },
            ],
        },
        {
            title: 'The Bold Breakthrough',
            price: 5000,
            elements: [
                {
                    bgColor: beigeColor,
                    title: 'Social Media Management',
                    details: [
                        '3-4 Instagram and Facebook social media feed & story posts per week',
                        'Social media graphic design',
                        'Caption writing',
                        'Content scheduling',
                        'Hashtag optimization',
                        'Quarterly performance tracking',
                        'Strategy suggestions',
                        '1-Hour consultation',
                    ],
                },
                {
                    bgColor: greenColor,
                    title: 'Content Creation',
                    details: [
                        'Full-day (8 hours) on-site video & photo shoot',
                        '30 edited branding photos',
                        '(16) 15-30 sec social media videos (4 videos/week)',
                        'Engaging captions',
                        'One round of revisions',
                    ],
                },
            ],
        },
    ];
</script>
