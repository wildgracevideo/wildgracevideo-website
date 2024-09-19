<template>
    <div
        class="flex flex-row justify-between bg-website-accent pb-48 pt-48 align-middle"
    >
        <button aria-label="Go to previous client testimonial">
            <ArrowLeftIcon
                v-if="testimonials.length > 1"
                class="flex-0 ml-4 h-10 w-10 cursor-pointer"
                @click="decrementTestimonialIndex"
            />
        </button>
        <div
            class="relative h-48 w-2/3 text-center"
            :class="{ 'mx-auto': testimonials.length === 1 }"
        >
            <div
                v-for="(clientTestimonial, i) in testimonials"
                :key="clientTestimonial.author"
                :data-active="i === activeTestimonialIndex ? true : null"
                class="transition-opacity absolute mx-auto flex h-full w-full flex-col justify-center text-center opacity-0 duration-700 ease-in-out data-[active]:opacity-100"
            >
                <Markdown
                    :markdown-string="`&#8220;${clientTestimonial.text}&#8221;`"
                    component-class="text-lg"
                />
                <p class="text-center">
                    <span class="inline"> - </span>
                    <Markdown
                        :markdown-string="`${clientTestimonial.author}`"
                        component-class="inline [&_>p]:inline text-lg"
                    />
                </p>
            </div>
        </div>
        <button
            v-if="testimonials.length > 1"
            aria-label="Go to next client testimonial"
        >
            <ArrowRightIcon
                class="flex-0 mr-4 h-10 w-10 cursor-pointer"
                @click="incrementTestimonialIndex"
            />
        </button>
    </div>
</template>

<script setup lang="ts">
    import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/outline';

    export type Testimonail = {
        author: string;
        text: string;
    };

    const props = defineProps<{
        testimonials: Testimonial[];
    }>();

    const activeTestimonialIndex = ref(0);
    const intervalID = ref(null);

    function increment() {
        activeTestimonialIndex.value =
            (activeTestimonialIndex.value + 1) % props.testimonials.length;
    }

    function incrementTestimonialIndex() {
        if (intervalID.value) {
            clearInterval(intervalID.value);
        }
        increment();
        intervalID.value = setInterval(increment, 5000);
    }

    function decrementTestimonialIndex() {
        if (intervalID.value) {
            clearInterval(intervalID.value);
        }
        activeTestimonialIndex.value =
            (activeTestimonialIndex.value - 1 + props.testimonials.length) %
            props.testimonials.length;
        intervalID.value = setInterval(increment, 5000);
    }

    onMounted(() => {
        if (props.testimonials.length > 1) {
            intervalID.value = setInterval(increment, 5000);
        }
    });
</script>
