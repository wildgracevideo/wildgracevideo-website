<template>
    <article>
        <div class="relative">
            <div
                class="absolute inset-0 z-10 h-dvh bg-website-secondary bg-opacity-20"
            ></div>
            <FileOrVideo
                parent-class="pointer-events-none relative z-0 cursor-default mx-auto h-dvh w-dvh brightness-50"
                class="h-full w-full object-cover object-center"
                :file="overviewFile"
                sizes="2xl:2000px xl:1536px lg:1280px md:1024px sm:768px 640px"
                :with-sound-control="false"
            />
            <Markdown
                :markdown-string="`${overview}`"
                component-class="strong:font-semibold w-[75%] mx-auto text-center absolute top-1/2 left-1/2 -translate-x-1/2 z-20 text-3xl heading-font text-website-off-white"
            />
        </div>

        <!-- Large screens view -->
        <div
            class="hidden flex-row bg-website-primary pb-12 text-website-off-white lg:flex"
        >
            <div class="relative min-h-dvh flex-1">
                <FileOrVideo
                    parent-class="pointer-events-none z-0 cursor-default absolute opacity-20 max-h-[90dvh] max-w-[90dvh] h-[90%] w-[90%] aspect-square top-[10%] left-1/2 -translate-x-1/2"
                    class="object-fit h-full w-full object-center"
                    :file="titleBackgroundImage"
                    sizes="2xl:800px xl:615px lg:512px 410px"
                    :with-sound-control="false"
                />
                <div class="mt-24 w-full text-center">
                    <p class="accent-font mb-12 text-3xl">Introducing</p>
                    <Markdown
                        :markdown-string="`## ${title}`"
                        component-class="no-default-format strong:font-semibold mx-auto text-center mt-24 z-20 text-6xl heading-font tracking-widest leading-normal"
                    />
                </div>
            </div>
            <div
                class="flex-0 z-20 -mb-36 -mt-56 block w-0.25 bg-website-accent"
            ></div>
            <div
                class="relative flex flex-1 flex-col justify-center gap-16 py-8"
            >
                <Markdown
                    :markdown-string="`${description}`"
                    component-class="strong:font-semibold mx-auto text-center text-4xl subheading-font max-w-[75%]"
                />
                <DefaultButton
                    :title="actionCta"
                    class="mx-auto"
                    to="/get-started"
                    :light="true"
                />
            </div>
        </div>

        <!-- Small screens view -->
        <div
            class="relative flex flex-col gap-16 bg-website-primary pb-12 text-website-off-white lg:hidden lg:gap-0"
        >
            <FileOrVideo
                parent-class="pointer-events-none z-0 cursor-default absolute opacity-20 max-h-[60dvh] max-w-[60dvh] h-[60%] w-[60%] aspect-square top-[10%] left-1/2 -translate-x-1/2"
                class="object-fit h-full w-full object-center"
                :file="titleBackgroundImage"
                sizes="2xl:800px xl:615px lg:512px 410px"
                :with-sound-control="false"
            />
            <div class="mt-12 w-full flex-1 text-center">
                <p class="accent-font mb-12 text-xl">Introducing</p>
                <Markdown
                    :markdown-string="`## ${title}`"
                    component-class="no-default-format strong:font-semibold mx-auto text-center z-20 text-3xl heading-font tracking-widest leading-normal"
                />
            </div>
            <div class="flex flex-col justify-center gap-16 py-8">
                <Markdown
                    :markdown-string="`${description}`"
                    component-class="strong:font-semibold mx-auto text-center text-xl subheading-font max-w-[75%]"
                />
                <DefaultButton
                    :title="actionCta"
                    class="mx-auto"
                    to="/get-started"
                    :light="true"
                />
            </div>
        </div>

        <div
            class="bg-contain flex flex-col bg-black/30 bg-center bg-no-repeat text-website-off-white bg-blend-darken"
            :style="{
                backgroundImage: `url('${stepsBackgroundImage.file}')`,
            }"
        >
            <Markdown
                :markdown-string="`### ${stepsTitle}`"
                component-class="no-default-format strong:font-semibold lg:mt-32 lg:mb-16 mb-8 mt-8 lg:ml-16 ml-4 text-left lg:text-4xl text-2xl subheading-font"
            />

            <ServicesAdventureContentPartnershipStep
                v-for="(step, i) in steps"
                :key="step.title"
                :title="`#### ${step.title}`"
                :description="step.description"
                :index="i"
            />
            <DefaultButton
                :title="actionCta"
                class="mx-auto mb-24"
                to="/get-started"
                :light="true"
            />
        </div>

        <div class="bg-website-tertiary text-website-off-white">
            <FileOrVideo
                parent-class="pointer-events-none relative z-10 cursor-default ml-12 relative h-28 w-24 -top-12"
                class="h-full w-full object-contain object-center"
                :file="accentImage"
                sizes="200px"
                :with-sound-control="false"
            />
            <div
                class="mx-24 flex flex-row flex-wrap items-center justify-center gap-8 pb-0 pt-24 lg:pb-12"
            >
                <template v-for="x in 4" :key="`${x}-quarter-block`">
                    <div class="w-48">
                        <div
                            class="subheading-font flex h-48 items-center justify-center bg-website-primary text-6xl"
                        >
                            <p>Q{{ x }}</p>
                        </div>
                        <p class="mt-4 text-center">
                            content filmed + delivered
                        </p>
                    </div>
                    <!-- Add a plus sign after each item except the last -->
                    <span v-if="x < 4" class="mx-4 text-6xl">+</span>
                    <span
                        v-else
                        class="invisible mx-4 block text-6xl lg:visible lg:hidden"
                        >+</span
                    >
                </template>
            </div>
            <p class="text-center text-6xl">=</p>
            <p
                class="mx-4 py-12 text-center text-2xl lg:mx-auto lg:py-24 lg:text-5xl"
            >
                1 YEAR OF CONSISTENT CONTENT
            </p>
        </div>
    </article>
</template>

<script lang="ts" setup>
    import type { FileInfo } from './FileOrVideo.vue';

    defineProps<{
        overviewFile: FileInfo;
        overview: string;
        titleBackgroundImage: FileInfo;
        title: string;
        description: string;
        actionCta: string;
        stepsBackgroundImage: FileInfo;
        stepsTitle: string;
        steps: { title: string; description: string }[];
        accentImage: FileInfo;
    }>();
</script>
