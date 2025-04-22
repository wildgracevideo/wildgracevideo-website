<template>
    <article>
        <div class="relative">
            <div
                class="bg-website-off-black/70 absolute inset-0 z-10 h-dvh"
            ></div>
            <FileOrVideo
                parent-class="pointer-events-none relative z-0 cursor-default h-dvh w-dvw brightness-50"
                class="h-full w-full object-cover object-center"
                :file="config.overviewFile"
                sizes="2xl:2000px xl:1536px lg:1280px md:1024px sm:768px 640px"
                :with-sound-control="false"
            />
            <Markdown
                :markdown-string="`${config.overview}`"
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
                    :file="config.titleBackgroundImage"
                    sizes="2xl:800px xl:615px lg:512px 410px"
                    :with-sound-control="false"
                />
                <div class="relative z-20 mt-24 w-full text-center">
                    <p class="accent-font mb-12 text-3xl">Introducing</p>
                    <Markdown
                        :markdown-string="`## ${config.title}`"
                        component-class="no-default-format strong:font-semibold mx-auto text-center mt-24 z-20 text-6xl heading-font tracking-widest leading-normal"
                    />
                </div>
            </div>
            <div
                class="bg-website-accent z-30 -mt-56 -mb-36 block w-0.25 grow-0"
            ></div>
            <div
                class="relative flex flex-1 flex-col justify-center gap-16 py-8"
            >
                <Markdown
                    :markdown-string="`${config.description}`"
                    component-class="strong:font-semibold mx-auto text-center text-4xl subheading-font max-w-[75%]"
                />
                <DefaultButton
                    :title="config.actionCta"
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
                :file="config.titleBackgroundImage"
                sizes="2xl:800px xl:615px lg:512px 410px"
                :with-sound-control="false"
            />
            <div class="relative z-20 mt-12 w-full flex-1 text-center">
                <p class="accent-font mb-12 text-xl">Introducing</p>
                <Markdown
                    :markdown-string="`## ${config.title}`"
                    component-class="no-default-format strong:font-semibold mx-auto text-center z-20 text-3xl heading-font tracking-widest leading-normal"
                />
            </div>
            <div class="flex flex-col justify-center gap-16 py-8">
                <Markdown
                    :markdown-string="`${config.description}`"
                    component-class="strong:font-semibold mx-auto text-center text-xl subheading-font max-w-[75%]"
                />
                <DefaultButton
                    :title="config.actionCta"
                    class="mx-auto"
                    to="/get-started"
                    :light="true"
                />
            </div>
        </div>

        <div
            class="text-website-off-white flex flex-col bg-black/60 bg-cover bg-fixed bg-center bg-no-repeat bg-blend-darken lg:bg-auto"
            :style="{
                backgroundImage: `url('${config.stepsBackgroundImage.file}?format=webp&size=2000')`,
            }"
        >
            <Markdown
                :markdown-string="`### ${config.stepsTitle}`"
                component-class="no-default-format strong:font-semibold lg:mt-32 lg:mb-16 mb-8 mt-8 lg:ml-16 ml-4 text-left lg:text-4xl text-2xl subheading-font"
            />

            <ServicesAdventureContentPartnershipStep
                v-for="step in config.steps"
                :key="step.title"
                :title="`#### ${step.title}`"
                :description="step.description"
                :value="step.value"
                :items="step.items"
            />
            <div
                class="bg-website-primary text-website-off-white mx-12 p-8 lg:mx-24 lg:p-16"
            >
                <Markdown
                    :markdown-string="config.details.whatYouGetTitle"
                    component-class="lg:text-3xl text-xl no-default-format mb-4 mx-auto text-center subheading-font"
                />
                <Markdown
                    :markdown-string="config.details.whatYouGetDescription"
                    component-class="lg:text-xl text-lg no-default-format mb-4 mx-auto text-center"
                />
                <div class="w-60% bg-website-accent mx-auto mb-4 h-0.25" />
                <Markdown
                    :markdown-string="config.details.whatYouPayTitle"
                    component-class="lg:text-3xl text-xl no-default-format mb-4 mx-auto text-center subheading-font"
                />
                <Markdown
                    :markdown-string="config.details.whatYouPayDescription"
                    component-class="lg:text-lg text-base no-default-format mb-8 mx-auto text-center"
                />
                <Markdown
                    :markdown-string="config.details.footer"
                    component-class="no-default-format mx-auto text-center"
                />
            </div>
            <DefaultButton
                :title="config.details.callToAction"
                class="mx-auto mt-12 mb-24"
                to="/get-started"
                :light="true"
            />
        </div>

        <div class="bg-website-tertiary text-website-off-white">
            <FileOrVideo
                parent-class="pointer-events-none relative z-10 cursor-default ml-12 relative h-28 w-24 -top-12 opacity-60"
                class="h-full w-full object-contain object-center"
                :file="config.stepsAccentImage"
                sizes="200px"
                :with-sound-control="false"
            />
            <div
                class="mx-24 flex flex-row flex-wrap items-center justify-center gap-8 pt-24 pb-0 lg:pb-12"
            >
                <div
                    class="subheading-font bg-website-primary flex h-48 w-56 items-center justify-center p-4 text-center text-3xl lg:text-5xl"
                >
                    <p>EACH QUARTER</p>
                </div>
                <p class="subheading-font text-center text-xl lg:text-3xl">
                    X 4 = 1 YEAR OF CONSISTENT CONTENT
                </p>
            </div>
            <p class="mx-auto mt-8 pb-16 text-center lg:mt-16 lg:pb-32">
                Content delivered and the process repeats quarterly for
                year-round impact.
            </p>
        </div>
    </article>
</template>

<script lang="ts" setup>
    defineProps<{ config: CmsServicesAdventureContentPartnership }>();
</script>
