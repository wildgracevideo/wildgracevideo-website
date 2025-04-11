import { defineCollection, defineContentConfig } from '@nuxt/content';
import { asSitemapCollection } from '@nuxtjs/sitemap/content';

export default defineContentConfig({
    collections: {
        content: defineCollection(
            asSitemapCollection({
                // Load every file inside the `content` directory
                source: '**/*.md',
                // Specify the type of content in this collection
                type: 'page',
            })
        ),
    },
});
