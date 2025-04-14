<template>
    <component
        :is="component"
        ref="backgroundImageComponent"
        :class="$attrs.class as string"
        class="background-image"
    >
        <slot />
    </component>
</template>

<script setup lang="ts">
    function setBackgroundImageVariables(element: HTMLElement) {
        element.style.setProperty(
            '--background-image',
            `url(${props.backgroundImage})`
        );
        element.style.setProperty(
            '--background-image-vertical',
            `url(${props.backgroundImageVertical})`
        );
    }

    const backgroundImageComponent = ref<HTMLElement>();
    onMounted(() => {
        function handleIntersection(entries: IntersectionObserverEntry[]) {
            entries.map((entry: IntersectionObserverEntry) => {
                if (entry.isIntersecting) {
                    setBackgroundImageVariables(entry.target as HTMLElement);
                    observer.unobserve(entry.target);
                }
            });
        }

        const observer = new IntersectionObserver(handleIntersection, {
            rootMargin: '200px',
        });
        observer.observe(backgroundImageComponent.value!);
    });

    const props = defineProps<{
        component: string;
        backgroundImage: string;
        backgroundImageVertical: string;
    }>();
</script>

<style scoped>
    .background-image {
        background-image: var(--background-image-vertical);
        background-attachment: fixed;
        background-size: 100%;
        min-height: 56rem;
        height: 100%;
    }

    @media (min-width: 1024px) {
        .background-image {
            background-image: var(--background-image);
        }
    }
</style>
