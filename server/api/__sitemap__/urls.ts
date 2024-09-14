import type { ParsedContent } from '@nuxt/content/dist/runtime/types';
// eslint-disable-next-line import/no-unresolved
import { SitemapUrl } from 'nuxt-simple-sitemap/dist/runtime/types';
import { asSitemapUrl, defineSitemapEventHandler } from '#imports';
// eslint-disable-next-line import/no-unresolved
import { serverQueryContent } from '#content/server';

const runtimeConfig = useRuntimeConfig();

function parseImageOrVideo(file: {
    file: string;
    seoDescription: string;
    seoTitle: string;
    thumbnailImage?: string;
    publicationDate?: string;
}) {
    let data;
    let isImage = true;
    if (file.file.endsWith('mp4') || file.file.endsWith('mpd')) {
        const thumbnailLoc = getThumbnailLoc(file.thumbnailImage);
        data = {
            title: file.seoTitle,
            thumbnail_loc: thumbnailLoc,
            description: file.seoDescription,
            content_loc: file.file,
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
    const filteredList = contentList
        .filter(
            (c) =>
                c._dir === 'product' ||
                c._dir === 'home' ||
                c._dir === 'service'
        )
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
                // TODO: Use this format for everything
                if (c.sitemap.include) {
                    const additionalImages: unknown[] = [];
                    const additionalVideos: unknown[] = [];
                    const videosAndImages = findImagesAndVideos(c);
                    videosAndImages.forEach((imageOrVideo) => {
                        const imageOrVideoResult =
                            parseImageOrVideo(imageOrVideo);
                        if (imageOrVideoResult.isImage) {
                            additionalImages.push(imageOrVideoResult.data);
                        } else {
                            additionalVideos.push(imageOrVideoResult.data);
                        }
                    });
                    const lastModDate = new Date(c.lastmod);
                    const sitemapUrl: SitemapUrl = {
                        loc: c.sitemap.loc,
                        lastmod: `${lastModDate.getUTCFullYear()}-${lastModDate.getUTCMonth()}-${lastModDate.getUTCDate()}`,
                        changefreq: c.sitemap.changefreq,
                        images: additionalImages,
                        videos: additionalVideos,
                    };
                    return asSitemapUrl(sitemapUrl);
                }
            } else if (c._dir === 'service') {
                const sitemapUrl: SitemapUrl = {
                    loc: `/${c._dir}s/${c.path}`,
                };
                return asSitemapUrl(sitemapUrl);
            }
        });
    filteredList.push(
        {
            loc: `/behind-the-scenes`,
        },
        {
            loc: `/shop`,
        },
        {
            loc: '/portfolio',
        }
    );
    return filteredList;
});

function getThumbnailLoc(
    thumbnailImage: string | undefined
): string | undefined {
    let thumbnailLoc = thumbnailImage;
    if (thumbnailLoc && !thumbnailLoc!.startsWith('http')) {
        thumbnailLoc = runtimeConfig.public.siteUrl + thumbnailImage!;
    }
    return thumbnailLoc;
}

interface FileDescription {
    seoDescription: string;
    seoTitle: string;
    publicationDate: string;
    file: string;
    thumbnailImage: string | undefined;
}

function findImagesAndVideos(data: object) {
    const results: FileDescription[] = [];

    function recursiveSearch(
        obj: Partial<FileDescription> & {
            video: string | undefined;
            image: string | undefined;
        }
    ) {
        if (typeof obj === 'object' && obj !== null) {
            // Check if the object has all the required fields
            if (
                'seoTitle' in obj &&
                'seoDescription' in obj &&
                'publicationDate' in obj &&
                ('file' in obj || 'video' in obj || 'image' in obj)
            ) {
                const result = {
                    seoTitle: obj.seoTitle as string,
                    seoDescription: obj.seoDescription as string,
                    publicationDate: obj.publicationDate as string,
                    file: (obj.file || obj.video || obj.image)!,
                    thumbnailImage: obj.thumbnailImage,
                };
                results.push(result);
            }

            // Recursively search each key-value pair
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    recursiveSearch(obj[key]);
                }
            }
        } else if (Array.isArray(obj)) {
            // Recursively search in each array element
            obj.forEach((item) => recursiveSearch(item));
        }
    }

    recursiveSearch(data);
    return results;
}
