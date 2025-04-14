import { ContentCollectionItem } from '@nuxt/content';
import {
    Changefreq,
    ImageEntry,
    SitemapUrl,
    type SitemapUrlInput,
    VideoEntry,
} from '#sitemap/types';
import { defineSitemapEventHandler } from '#imports';

const runtimeConfig = useRuntimeConfig();

interface SitemapConfig {
    lastmod: string;
    changefreq: Changefreq;
    include: boolean;
}

function isImage(
    sitemapFile: ImageEntry | VideoEntry
): sitemapFile is ImageEntry {
    return (sitemapFile as ImageEntry).loc !== undefined;
}

function parseImageOrVideo(file: {
    file: string;
    seoDescription: string;
    seoTitle: string;
    thumbnailImage?: string;
    publicationDate?: string;
}): ImageEntry | VideoEntry | null {
    let data;
    if (file.file.endsWith('mp4') || file.file.endsWith('mpd')) {
        const thumbnailLoc = getThumbnailLoc(file.thumbnailImage);
        if (!thumbnailLoc) {
            return null;
        }
        data = {
            title: file.seoTitle,
            thumbnail_loc: thumbnailLoc,
            description: file.seoDescription,
            content_loc: file.file,
            requires_subscription: false,
            live: false,
            publication_date: file.publicationDate,
        };
    } else {
        data = {
            loc: file.file,
            title: file.seoTitle,
            caption: file.seoDescription,
        };
    }
    return data;
}

export default defineSitemapEventHandler(async (e) => {
    const content = await queryCollection(e, 'content').all();
    const sitemapUrls: SitemapUrl[] = content
        .filter((it) => !!it.meta.sitemap)
        .filter((it) => (it.meta.sitemap as SitemapConfig)?.include)
        .map((it) => {
            const stemParts = it.stem.split('/');
            let loc = `/${it.stem}`;
            if (stemParts.length == 2 && stemParts[0] === stemParts[1]) {
                if (stemParts[0] === 'home') {
                    loc = '/';
                } else {
                    loc = `/${stemParts[0]}`;
                }
            }
            const sitemap = it.meta.sitemap as SitemapConfig;
            const lastModDate = new Date(sitemap.lastmod);
            const additionalImages: ImageEntry[] = [];
            const additionalVideos: VideoEntry[] = [];
            const videosAndImages = findImagesAndVideos(it);
            videosAndImages
                .map(parseImageOrVideo)
                .filter((it) => it != null)
                .forEach((imageOrVideo) => {
                    if (isImage(imageOrVideo)) {
                        additionalImages.push(imageOrVideo);
                    } else {
                        additionalVideos.push(imageOrVideo);
                    }
                });
            return {
                loc: `${runtimeConfig.public.siteUrl}${loc}`,
                lastmod: `${lastModDate.getUTCFullYear()}-${lastModDate.getUTCMonth()}-${lastModDate.getUTCDate()}`,
                changefreq: sitemap.changefreq,
                images: additionalImages,
                videos: additionalVideos,
            };
        });
    sitemapUrls.push({
        loc: `${runtimeConfig.public.siteUrl}/shop`,
        lastmod: '2024-02-28T22:13:00.000Z',
        changefreq: 'monthly',
    });
    return sitemapUrls satisfies SitemapUrlInput[];
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

function findImagesAndVideos(data: ContentCollectionItem): FileDescription[] {
    const results: FileDescription[] = [];

    function recursiveSearch(obj: unknown) {
        if (typeof obj === 'object' && obj !== null) {
            // Check if the object has all the required fields
            if (
                'seoTitle' in obj &&
                'seoDescription' in obj &&
                'publicationDate' in obj &&
                ('file' in obj || 'video' in obj || 'image' in obj)
            ) {
                let thumbnailImage: string | undefined = undefined;
                if ('thumbnailImage' in obj) {
                    thumbnailImage = obj.thumbnailImage as string;
                }
                const result: FileDescription = {
                    seoTitle: obj.seoTitle as string,
                    seoDescription: obj.seoDescription as string,
                    publicationDate: obj.publicationDate as string,
                    // @ts-expect-error Checking type above
                    file: (obj.file || obj.video || obj.image)! as string,
                    thumbnailImage,
                };
                results.push(result);
            }

            // Recursively search each key-value pair
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    // @ts-expect-error Iterating over properties
                    recursiveSearch(obj[key] as unknown);
                }
            }
        } else if (Array.isArray(obj)) {
            obj.forEach((item) => recursiveSearch(item));
        }
    }

    recursiveSearch(data.meta);
    return results;
}
