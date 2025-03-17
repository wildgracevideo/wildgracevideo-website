<template>
    <template v-if="true">
        <NuxtLink
            class="px-auto flex h-12 w-fit cursor-pointer items-center rounded-xl border-2 px-4 text-center"
            :class="`${colorClasses} ${$attrs.class as string}`"
            :to="to"
        >
            <p class="mx-auto">{{ title }}</p>
        </NuxtLink>
    </template>
</template>

<script setup lang="ts">
    interface Props {
        to: string;
        title: string;
        light?: boolean | undefined;
    }
    const props = withDefaults(defineProps<Props>(), {
        light: false,
    });

    let colorClasses =
        'text-website-off-white border-website-primary bg-website-primary hover:text-website-primary hover:bg-website-off-white';
    if (props.light) {
        colorClasses =
            'text-website-primary border-website-off-white bg-website-off-white hover:text-website-off-white hover:bg-website-primary';
    }
</script>
