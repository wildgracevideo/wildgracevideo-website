<template>
    <div
        v-if="openMenu"
        class="z-20 -mt-32 flex h-full w-full flex-col justify-between bg-website-green pt-32 text-4xl text-website-off-white"
    >
        <nav class="flex flex-col gap-8">
            <template v-for="item in items">
                <HeaderMobileMenuExpandableItem
                    v-if="item.children"
                    :key="`${item.name}-expandable-menu-item`"
                    v-model="openMenu"
                    :config="item"
                />
                <NuxtLink
                    v-else
                    :key="`${item.name}-nuxt-link`"
                    class="mx-auto block w-fit"
                    :to="item.href"
                    @click="openMenu = false"
                >
                    {{ item.name }}
                </NuxtLink>
            </template>
            <NuxtLink
                class="px-auto mx-auto flex h-16 w-60 cursor-pointer items-center rounded-xl border-2 border-website-off-white bg-website-off-white text-center text-website-green hover:bg-website-green hover:text-website-off-white"
                to="/get-started"
                @click="openMenu = false"
            >
                <p class="mx-auto">Get Started</p>
            </NuxtLink>
        </nav>
        <SocialMediaIcons
            icon-fill="rgb(var(--color-website-off-white))"
            class="mt-auto"
            :icon-size="80"
        />
    </div>
</template>

<script setup lang="ts">
    import { type HeaderItemConfig } from './TopBar.vue';

    const props = defineProps<{
        modelValue: boolean;
        items: HeaderItemConfig[];
    }>();

    const emit = defineEmits(['update:modelValue']);

    const openMenu = computed({
        get() {
            return props.modelValue;
        },
        set(value) {
            emit('update:modelValue', value);
        },
    });

    onMounted(() => {
        window.addEventListener('resize', (_event) => {
            if (window.innerWidth >= 1024) {
                openMenu.value = false;
            }
        });
    });
</script>
