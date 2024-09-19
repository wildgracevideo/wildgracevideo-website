import { HeadObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getS3Client } from '~/server/utils/s3Client';

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event): Promise<void> => {
    const queryParameters = getQuery(event);
    const key = queryParameters.key?.toString();
    if (!key) {
        throw createError({ status: 400 });
    }
    try {
        const suffixedKey = key.endsWith('/') ? key : key + '/';
        if (!(await existsFolder(runtimeConfig.s3MediaBucket, suffixedKey))) {
            const response = await createFolder(
                runtimeConfig.s3MediaBucket,
                suffixedKey
            );
            console.log('Create folder response', response);
        } else {
            throw createError({ status: 400 });
        }
    } catch (e) {
        console.error('Failed to create folder.', e);
        throw createError({ status: 500 });
    }
});

async function createFolder(bucket: string, key: string) {
    const client = getS3Client();
    const command = new PutObjectCommand({ Bucket: bucket, Key: key });
    return client.send(command);
}

export async function existsFolder(bucket: string, key: string) {
    const client = getS3Client();
    const command = new HeadObjectCommand({ Bucket: bucket, Key: key });

    try {
        await client.send(command);
        return true;
    } catch (error) {
        if (error.name === 'NotFound') {
            return false;
        } else {
            throw error;
        }
    }
}
