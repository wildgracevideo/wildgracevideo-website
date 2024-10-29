import { AbortMultipartUploadCommand } from '@aws-sdk/client-s3';
import { getS3Client } from '~/server/utils/s3Client';

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event): Promise<object> => {
    const uploadId = event.context.params!.uploadId!;
    const key = getQuery(event).key?.toString();

    if (typeof key !== 'string') {
        throw createError({
            statusCode: 400,
            statusMessage:
                's3: the object key must be passed as a query parameter. For example: "?key=abc.jpg"',
        });
    }

    const client = getS3Client();
    await client.send(
        new AbortMultipartUploadCommand({
            Bucket: runtimeConfig.s3MediaBucket,
            Key: key,
            UploadId: uploadId,
        })
    );
    setResponseHeaders(event, {
        'Access-Control-Allow-Origin': runtimeConfig.public.siteUrl,
    });
    return {};
});
