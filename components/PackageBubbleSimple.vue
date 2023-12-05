<template>
    <div class="m-4 rounded-3xl py-4 pl-4 pr-2 text-base">
        <ul class="px-4">
            <li
                v-for="(detail, i) in details"
                :key="`${i}-package-bubble-simple-li`"
                class="list-item list-disc"
            >
                {{ detail }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    defineProps<{
        details: string[];
    }>();
</script>
