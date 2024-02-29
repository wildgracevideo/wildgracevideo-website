<template>
    <OgMeta :title="pageTitle" :description="description" :icon="ogIcon" />
    <SchemaOrgWebPage type="ItemPage" :name="pageTitle" />
    <SchemaOrgProduct
        :name="productTitle"
        :offers="
            packages.map((it: Record<string, object>) => {
                return {
                    price: it.price || undefined,
                    priceCurrency: 'USD',
                    availability: 'InStock',
                    name: it.title,
                };
            })
        "
        :description="description"
    />
    <h2 class="mx-auto mb-6 mt-10 w-fit text-center text-2xl">
        {{ productTitle }}
    </h2>
    <Markdown
        component-class="mx-8 max-w-4xl text-center lg:mx-auto centered-ul"
        :markdown-string="`${productDescription}`"
    />
    <Markdown
        component-class="mx-auto my-8 w-fit"
        :markdown-string="`${productSubtext}`"
    />
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
    <section v-if="addons && addons.length" class="rounded-3xl">
        <div
            class="border-y-16 border-custom-green mx-4 grid grid-cols-1 gap-4 rounded-3xl border-l-8 border-r-8 sm:mx-16 lg:mx-4 lg:grid-cols-3 xl:mx-16"
        >
            <div>
                <h3
                    class="font-family-playfair-display mx-auto mb-2 mt-4 w-fit text-center text-4xl font-semibold"
                >
                    <span class="font-family-moontime">The</span> Add-Ons
                </h3>
                <PackageBubble :config="addons[0]" />
            </div>
            <!-- eslint-disable-next-line vue/valid-v-for -->
            <PackageBubble v-for="addon in addons.slice(1)" :config="addon" />
        </div>
    </section>
    <p class="my-8 text-center">{{ disclaimer }}</p>
</template>

<script setup lang="ts">
    import type { ParsedContent } from '@nuxt/content/dist/runtime/types';

    const props = defineProps<{
        service: ParsedContent;
    }>();

    const pageTitle = props.service.title!;
    const description = props.service.description!;
    const productTitle = props.service.productTitle!;
    const productDescription = props.service.productDescription!;
    const ogIcon = props.service.ogImage!;
    const disclaimer = props.service.disclaimer!;
    const productSubtext = props.service.productSubtext!;

    const bubbleColors = [
        'rgba(248, 240, 227, 0.7)',
        'rgba(110, 132, 103, 0.54)',
    ];
    const packages = props.service.packages.map(
        (it: Record<string, object | Array<Record<string, object>>>) => {
            const components = it.components as Array<Record<string, object>>;
            return {
                title: it.title!,
                price: it.price,
                elements: components.map(
                    (c: Record<string, object>, index: number) => {
                        return {
                            title: c.title,
                            descriptionMarkdown: c.description,
                            detailsMarkdown: c.contents,
                            bgColor:
                                components.length > 1
                                    ? bubbleColors[index]
                                    : 'transparent',
                        };
                    }
                ),
            };
        }
    );

    const addons =
        props.service.addOns?.flatMap(
            (
                it: Record<
                    string,
                    number | Array<string | Record<string, string>>
                >
            ) => {
                const bgColor = bubbleColors[(it.id as number) - 1];
                const components = it.components as Array<
                    Record<string, string>
                >;
                return components.map((c: Record<string, string>) => {
                    return {
                        bgColor,
                        detailsMarkdown: c.contents,
                    };
                });
            }
        ) ?? [];
</script>
