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
    type: string;
    size: number;
}

export default defineEventHandler(async (event): Promise<S3Object[]> => {
    const requestQueryParams = getQuery(event);
    const prefix = requestQueryParams.prefix?.toString() ?? '';
    const params = {
        Bucket: runtimeConfig.s3MediaBucket,
        Prefix: prefix,
    };

    try {
        const response = await s3Client.send(new ListObjectsV2Command(params));
        if (response.Contents) {
            return response.Contents.map(item => ({
                name: item.Key!,
                lastModified: item.LastModified!,
                type: item.Key!.endsWith('/') ? 'Folder' : 'File',
                size: item.Size!,
            }));
        }
        return [];
    } catch (error) {
        console.error('Error listing files:', error);
        throw createError({ message: 'Unhandled Server Exception', statusCode: 500 });
    }
});
