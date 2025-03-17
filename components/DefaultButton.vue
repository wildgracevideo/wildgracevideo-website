<template>
    <button
        v-if="typeof action === 'string'"
        :type="action"
        :class="`${mainClasses} ${colorClasses} ${$attrs.class as string}`"
    >
        {{ title.toUpperCase() }}
    </button>
    <button
        v-else
        :class="`${mainClasses} ${colorClasses} ${$attrs.class as string}`"
        @click="action"
    >
        {{ title.toUpperCase() }}
    </button>
</template>

<script setup lang="ts">
    interface Props {
        action: (() => Promise<void>) | ('reset' | 'submit' | 'button');
        title: string;
        light?: boolean | undefined;
    }
    const props = withDefaults(defineProps<Props>(), {
        light: false,
    });

    const mainClasses =
        'flex h-8 w-fit items-center rounded-xl border-2 px-4 text-center text subheading-font';

    let colorClasses =
        'text-website-off-white border-website-primary bg-website-primary hover:text-website-primary hover:bg-website-off-white';
    if (props.light) {
        colorClasses =
            'text-website-primary border-website-off-white bg-website-off-white hover:text-website-off-white hover:bg-website-primary';
    }
</script>
