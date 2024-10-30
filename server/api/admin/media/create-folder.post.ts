import { HeadObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getS3Client } from '~/server/utils/s3Client';

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event): Promise<void> => {
    const queryParameters = getQuery(event);
    const key = queryParameters.key?.toString();
    if (!key) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Folder name is missing',
        });
    }
    const keyParts = key.split('/');
    let folderName: string;
    if (key.endsWith('/')) {
        folderName = keyParts[keyParts.length - 2];
    } else {
        folderName = keyParts[keyParts.length - 1];
    }
    if (!/^[0-9a-zA-Z\-_]+$/.test(folderName)) {
        throw createError({
            statusCode: 400,
            statusMessage:
                'Invalid folder name can only use alphanumberic characters, hyphens or underscores',
        });
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
            throw createError({ statusCode: 400 });
        }
    } catch (e) {
        console.error('Failed to create folder.', e);
        throw createError({ statusCode: 500 });
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
    } catch (error: unknown) {
        if (error.name === 'NotFound') {
            return false;
        } else {
            throw error;
        }
    }
}
