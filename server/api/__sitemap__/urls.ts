import type { ParsedContent } from '@nuxt/content/dist/runtime/types';
// eslint-disable-next-line import/no-unresolved
import { SitemapUrl } from 'nuxt-simple-sitemap/dist/runtime/types';
import { asSitemapUrl, defineSitemapEventHandler } from '#imports';
// eslint-disable-next-line import/no-unresolved
import { serverQueryContent } from '#content/server';

function parseImageOrVideo(file: {
    file: string;
    seoDescription: string;
    seoTitle: string;
    thumbnailImage?: string;
    publicationDate?: string;
}) {
    let data;
    let isImage = true;
    if (file.file.endsWith('mp4')) {
        data = {
            title: file.seoTitle,
            thumbnail_loc: file.thumbnailImage,
            description: file.seoDescription,
            content_loc: file.file,
            player_loc: `/`,
            requires_subscription: false,
            live: false,
            publication_date: file.publicationDate,
        };
        isImage = false;
    } else {
        data = {
            loc: file.file,
            title: file.seoTitle,
            caption: file.seoDescription,
        };
    }
    return { isImage, data };
}

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
                const additionalImages: unknown[] = [];
                const additionalVideos: unknown[] = [];
                // @ts-expect-error No types for nuxt-content
                c.testimonials.files.forEach((it) => {
                    const imageOrVideoResult = parseImageOrVideo(it);
                    if (imageOrVideoResult.isImage) {
                        additionalImages.push(imageOrVideoResult.data);
                    } else {
                        additionalVideos.push(imageOrVideoResult.data);
                    }
                });
                const imageOrVideoResult = parseImageOrVideo(c.aboutMe.file);
                if (imageOrVideoResult.isImage) {
                    additionalImages.push(imageOrVideoResult.data);
                } else {
                    additionalVideos.push(imageOrVideoResult.data);
                }
                const sitemapUrl: SitemapUrl = {
                    loc: `/`,
                    lastmod: '2024-02-28T19:20:30+07:00',
                    images: additionalImages,
                    videos: [
                        {
                            title: c.reelVideo.seoTitle,
                            thumbnail_loc: c.reelVideo.thumbnailImage,
                            description: c.reelVideo.seoDescription,
                            content_loc:
                                'https://content.wildgracevideo.com/wgv-reel-2024-h264.mp4',
                            player_loc: '/',
                            duration: 83,
                            requires_subscription: false,
                            live: false,
                            publication_date: '2023-02-28T19:20:30+07:00',
                        },
                        ...highlightVideos,
                        ...additionalVideos,
                    ],
                };
                return asSitemapUrl(sitemapUrl);
            }
        });
});
