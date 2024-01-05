<template>
    <button
        class="px-auto block h-14 w-60 rounded-xl border-2 text-xl"
        :class="classes"
        @click="action"
    >
        {{ title }}
    </button>
</template>

<script setup lang="ts">
    interface Props {
        action: () => Promise<void>;
        title: string;
        inverse?: boolean;
        additonalClasses: string;
    }
    const props = withDefaults(defineProps<Props>(), {
        inverse: false,
        additonalClasses: '',
    });

    let colorClasses =
        'text-website-off-white border-website-primary bg-website-primary hover:text-website-primary hover:bg-website-off-white';
    if (props.inverse === true) {
        colorClasses =
            'text-website-primary border-website-off-white bg-website-off-white hover:text-website-off-white hover:bg-website-primary';
    }

    const classes = colorClasses + ' ' + props.additonalClasses;
</script>
