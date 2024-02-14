import type { ParsedContent } from '@nuxt/content/dist/runtime/types';
// eslint-disable-next-line import/no-unresolved
import { SitemapUrl } from 'nuxt-simple-sitemap/dist/runtime/types';
import { asSitemapUrl, defineSitemapEventHandler } from '#imports';
// eslint-disable-next-line import/no-unresolved
import { serverQueryContent } from '#content/server';

export default defineSitemapEventHandler(async (e) => {
    const contentList = (await serverQueryContent(e).find()) as ParsedContent[];
    return contentList
        .filter((c) => c._dir === 'product' || c._dir === 'home')
        .map((c) => {
            if (c._dir === 'product') {
                const sitemapUrl: SitemapUrl = {
                    loc: `/${c._dir}s/${c.path}`,
                    lastmod: c.publishDate,
                    images: [
                        {
                            loc: c.productImage,
                            title: c.productName,
                            caption: c.description,
                        },
                    ],
                };
                return asSitemapUrl(sitemapUrl);
            } else if (c._dir === 'home') {
                // @ts-expect-error No types for nuxt-content
                const highlightVideos = c.videoHighlight.videos.map((it) => {
                    return {
                        title: it.seoTitle,
                        thumbnail_loc: it.thumbnailImage,
                        description: it.seoDescription,
                        content_loc: it.video,
                        player_loc: `/`,
                        requires_subscription: false,
                        live: false,
                        publication_date: it.publicationDate,
                    };
                }) as unknown[];
                const testimonialImages: unknown[] = [];
                const testimonialVideos: unknown[] = [];
                // @ts-expect-error No types for nuxt-content
                c.testimonials.files.forEach((it) => {
                    if (it.file.endsWith('mp4')) {
                        testimonialVideos.push({
                            title: it.seoTitle,
                            thumbnail_loc: it.thumbnailImage,
                            description: it.seoDescription,
                            content_loc: it.file,
                            player_loc: `/`,
                            requires_subscription: false,
                            live: false,
                            publication_date: it.publicationDate,
                        });
                    } else {
                        testimonialImages.push({
                            loc: it.file,
                            title: it.seoTitle,
                            caption: it.seoDescription,
                        });
                    }
                });
                const sitemapUrl: SitemapUrl = {
                    loc: `/`,
                    lastmod: '2024-02-12T19:20:30+07:00',
                    images: [
                        {
                            loc: c.aboutMe.image,
                            title: c.aboutMe.imageName,
                            caption: c.aboutMe.altText,
                        },
                        ...testimonialImages,
                    ],
                    videos: [
                        {
                            title: 'Wild Grace Videography Reel',
                            thumbnail_loc: '/logo2.png',
                            description:
                                'Video reel showcasing the work of Wild Grace Videography, a Denver, Colorado-based video production company.',
                            content_loc:
                                'https://d22668h9qdy3zj.cloudfront.net/wgv-reel.webm',
                            player_loc: '/',
                            duration: 92,
                            requires_subscription: false,
                            live: false,
                            publication_date: '2023-09-26T19:20:30+07:00',
                        },
                        ...highlightVideos,
                        ...testimonialVideos,
                    ],
                };
                return asSitemapUrl(sitemapUrl);
            }
        });
});
