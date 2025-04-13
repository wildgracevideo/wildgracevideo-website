<template>
    <article>
        <div class="relative">
            <div
                class="bg-website-off-black/70 absolute inset-0 z-10 h-dvh"
            ></div>
            <FileOrVideo
                parent-class="pointer-events-none relative z-0 cursor-default h-dvh w-dvw brightness-50"
                class="h-full w-full object-cover object-center"
                :file="overviewFile"
                sizes="2xl:2000px xl:1536px lg:1280px md:1024px sm:768px 640px"
                :with-sound-control="false"
            />
            <Markdown
                :markdown-string="`${overview}`"
                component-class="strong:font-semibold w-3/4 mx-auto text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 lg:text-5xl text-2xl leading-normal tracking-wider heading-font text-website-off-white"
            />
        </div>

        <!-- Large screens view -->
        <div
            class="bg-website-primary text-website-off-white hidden flex-row pb-12 lg:flex"
        >
            <div class="relative min-h-dvh flex-1">
                <FileOrVideo
                    parent-class="pointer-events-none z-0 cursor-default absolute opacity-20 max-h-[90dvh] max-w-[90dvh] h-[90%] w-[90%] aspect-square top-[10%] left-1/2 -translate-x-1/2"
                    class="object-fit h-full w-full object-center"
                    :file="titleBackgroundImage"
                    sizes="2xl:800px xl:615px lg:512px 410px"
                    :with-sound-control="false"
                />
                <div class="relative z-20 mt-24 w-full text-center">
                    <p class="accent-font mb-12 text-3xl">Introducing</p>
                    <Markdown
                        :markdown-string="`## ${title}`"
                        component-class="no-default-format strong:font-semibold mx-auto text-center mt-24 z-20 text-6xl heading-font tracking-widest leading-normal"
                    />
                </div>
            </div>
            <div
                class="bg-website-accent z-20 -mt-56 -mb-36 block w-0.25 flex-0"
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
            class="bg-website-primary text-website-off-white relative flex flex-col gap-16 pb-12 lg:hidden lg:gap-0"
        >
            <FileOrVideo
                parent-class="pointer-events-none z-0 cursor-default absolute opacity-20 max-h-[60dvh] max-w-[60dvh] h-[60%] w-[60%] aspect-square top-[10%] left-1/2 -translate-x-1/2"
                class="object-fit h-full w-full object-center"
                :file="titleBackgroundImage"
                sizes="2xl:800px xl:615px lg:512px 410px"
                :with-sound-control="false"
            />
            <div class="relative z-20 mt-12 w-full flex-1 text-center">
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
            class="text-website-off-white flex flex-col bg-black/60 bg-contain bg-cover bg-fixed bg-center bg-no-repeat bg-blend-darken lg:bg-auto"
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
                parent-class="pointer-events-none relative z-10 cursor-default ml-12 relative h-28 w-24 -top-12 opacity-60"
                class="h-full w-full object-contain object-center"
                :file="accentImage"
                sizes="200px"
                :with-sound-control="false"
            />
            <div
                class="mx-24 flex flex-row flex-wrap items-center justify-center gap-8 pt-24 pb-0 lg:pb-12"
            >
                <template v-for="x in 4" :key="`${x}-quarter-block`">
                    <div class="w-48">
                        <div
                            class="subheading-font bg-website-primary flex h-48 items-center justify-center text-6xl"
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
            <p class="subheading-font text-center text-6xl">=</p>
            <p
                class="subheading-font mx-4 py-12 text-center text-2xl lg:mx-auto lg:py-24 lg:text-5xl"
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
