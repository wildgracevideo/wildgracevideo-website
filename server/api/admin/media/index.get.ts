import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';

const runtimeConfig = useRuntimeConfig();
const s3Client = new S3Client({
    region: runtimeConfig.awsRegion,
    credentials: {
        accessKeyId: runtimeConfig.awsAccessKeyId,
        secretAccessKey: runtimeConfig.awsSecret,
    },
});

export interface S3Object {
    name: string;
    lastModified: Date;
    size: string;
    isFolder: boolean;
}

export default defineEventHandler(async (event): Promise<S3Object[]> => {
    const requestQueryParams = getQuery(event);
    const prefix = requestQueryParams.prefix?.toString() ?? '';
    const params: { Bucket: string; Prefix: string; Delimiter?: string } = {
        Bucket: runtimeConfig.s3MediaBucket,
        Prefix: prefix,
    };
    if (!prefix || prefix === '/') {
        params.Prefix = '';
        params.Delimiter = '/';
    }

    try {
        const response = await s3Client.send(new ListObjectsV2Command(params));
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
            let responseContents = response.Contents.map((item) => ({
                name: item.Key!,
                lastModified: item.LastModified || '-',
                size: item.Size?.toString() || '-',
                isFolder: item.Key!.endsWith('/'),
            })) as S3Object[];
            responseContents = responseContents.filter((item) => {
                const elements = item.name.replace(prefix, '').split('/');
                return (
                    item.name !== prefix + '/' &&
                    (elements.length <= 2 ||
                        (elements.length === 3 &&
                            elements[elements.length - 1] === ''))
                );
            });
            responseContents.forEach(
                (it) => (it.name = it.name.replace(prefix + '/', ''))
            );
            const responseFolders = responseContents.filter(
                (item) => item.isFolder
            );
            const responseFiles = responseContents.filter(
                (item) => !item.isFolder
            );

            // Sort folders and files by name
            folders.sort((a, b) => a.name.localeCompare(b.name));
            responseFolders.sort((a, b) => a.name.localeCompare(b.name));
            responseFiles.sort((a, b) => a.name.localeCompare(b.name));

            return folders.concat(responseFolders.concat(responseFiles));
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
