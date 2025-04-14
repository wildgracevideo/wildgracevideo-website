import { defineCollection, defineContentConfig } from '@nuxt/content';

export default defineContentConfig({
    collections: {
        content: defineCollection({
            // Load every file inside the `content` directory
            source: '**/*.md',
            // Specify the type of content in this collection
            type: 'data',
        }),
    },
});
