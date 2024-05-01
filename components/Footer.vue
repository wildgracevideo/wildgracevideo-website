<template>
    <footer class="mt-8 pb-8">
        <p class="mb-6 text-center text-xl">CARLY KREIGER</p>
        <address class="mx-4 text-center text-xs italic">
            203.906.3837 | carly@wildgracevideo.com | Denver, CO
        </address>
        <div class="mx-auto mt-4 w-fit text-xs">
            <NuxtLink class="mr-4" to="/privacy-policy"
                >Privacy Policy</NuxtLink
            >
            <NuxtLink to="/terms">Terms of Use</NuxtLink>
        </div>
        <SocialMediaIcons
            icon-fill="rgb(var(--color-website-accent))"
            class="-mb-8"
            :icon-size="80"
        />
    </footer>
</template>
