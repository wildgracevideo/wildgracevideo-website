import { ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getS3Client } from '~/server/utils/s3Client';

const runtimeConfig = useRuntimeConfig();

export interface S3Object {
    name: string;
    lastModified: string;
    size: string;
    isFolder: boolean;
}

export default defineEventHandler(async (event): Promise<S3Object[]> => {
    const requestQueryParams = getQuery(event);
    const prefix = requestQueryParams.prefix?.toString() ?? '';
    const params: {
        Bucket: string;
        Prefix: string;
        Delimiter?: string;
        MaxSize?: number;
    } = {
        Bucket: runtimeConfig.s3MediaBucket,
        Prefix: prefix,
        MaxSize: 1000,
    };
    if (!prefix || prefix === '/') {
        params.Prefix = '';
        params.Delimiter = '/';
    }

    try {
        const response = await getS3Client().send(
            new ListObjectsV2Command(params)
        );
        if (response.Contents) {
            const folders: S3Object[] = ((response.CommonPrefixes?.map(
                (item) => {
                    return {
                        name: item.Prefix,
                        lastModified: '-',
                        size: '-',
                        isFolder: true,
                    };
                }
            ) as unknown) || []) as S3Object[];
            const originalResponseContents = response.Contents.map((item) => {
                const isFolder = item.Key!.endsWith('/') || !item.Size;
                return {
                    name: item.Key!,
                    lastModified: isFolder ? '-' : item.LastModified || '-',
                    size: isFolder ? '-' : item.Size?.toString() || '-',
                    isFolder,
                };
            }) as S3Object[];
            const responseContents = originalResponseContents.filter((item) => {
                const elements = item.name
                    .trim()
                    .replace(prefix.replace(/\/$/, ''), '')
                    .split('/');
                return (
                    item.name !== prefix &&
                    (elements.length <= 1 ||
                        (elements.length === 2 &&
                            (item.name.trim().endsWith('/') ||
                                elements[0] === '')))
                );
            });
            for (const originalContent of originalResponseContents) {
                const elements = originalContent.name
                    .trim()
                    .replace(prefix, '')
                    .split('/');
                if (elements.length > 1) {
                    const folderName = elements[0] + '/';
                    let hasFolder = false;
                    for (const item of responseContents) {
                        if (folderName === item.name) {
                            hasFolder = true;
                        }
                    }
                    if (!hasFolder) {
                        responseContents.push({
                            name: folderName,
                            lastModified: '-',
                            size: '-',
                            isFolder: true,
                        });
                    }
                }
            }
            const responseFolders = responseContents.filter(
                (item) => item.isFolder
            );
            const responseFiles = responseContents.filter(
                (item) => !item.isFolder
            );

            folders.sort((a, b) => a.name.localeCompare(b.name));
            responseFolders.sort((a, b) => a.name.localeCompare(b.name));
            responseFiles.sort((a, b) => a.name.localeCompare(b.name));

            const finalResponse = folders.concat(
                responseFolders.concat(responseFiles)
            );
            for (const finalResponseElement of finalResponse) {
                finalResponseElement.name = finalResponseElement.name
                    .replace(prefix, '')
                    .replace(/^\//, '');
            }
            return finalResponse;
        }
        return [];
    } catch (error) {
        console.error('Error listing files:', error);
        throw createError({
            message: 'Unhandled Server Exception',
            statusCode: 500,
        });
    }
});
