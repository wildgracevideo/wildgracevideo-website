import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getS3Client } from '~/server/utils/s3Client';

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event): Promise<void> => {
    const queryParameters = getQuery(event);
    const key = queryParameters.key?.toString();
    if (!key) {
        throw createError({ status: 400 });
    }
    const deleteCommandParameters = {
        Bucket: runtimeConfig.s3MediaBucket,
        Key: key,
    };
    try {
        const response = await getS3Client().send(
            new DeleteObjectCommand(deleteCommandParameters)
        );
        console.log('Delete object response', response);
    } catch (e) {
        console.error('Failed to delete file.', e);
        throw createError({ status: 500 });
    }
});
