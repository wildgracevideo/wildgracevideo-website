<template>
  <button
    class="h-14 w-60 text-xl block rounded-xl border-2 px-auto"
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
  additonalClasses: "",
});

let colorClasses =
  "text-website-off-white border-website-green bg-website-green hover:text-website-green hover:bg-website-off-white";
if (props.inverse === true) {
  colorClasses =
    "text-website-green border-website-off-white bg-website-off-white hover:text-website-off-white hover:bg-website-green";
}

const classes = colorClasses + " " + props.additonalClasses;
</script>
