import type { ParsedContent } from '@nuxt/content/dist/runtime/types';
// eslint-disable-next-line import/no-unresolved
import { SitemapUrl } from 'nuxt-simple-sitemap/dist/runtime/types';
import { asSitemapUrl, defineSitemapEventHandler } from '#imports';
// eslint-disable-next-line import/no-unresolved
import { serverQueryContent } from '#content/server';

export default defineSitemapEventHandler(async (e) => {
    const contentList = (await serverQueryContent(e).find()) as ParsedContent[];
    return contentList
        .filter((c) => c._dir === 'product')
        .map((c) => {
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
        });
});
