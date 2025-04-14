import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getS3Client } from '~~/server/utils/s3Client';

const runtimeConfig = useRuntimeConfig();

const EXPIRES_IN = 900; // 15 minutes

export default defineEventHandler(
    async (event): Promise<{ url: string; method: 'PUT' | 'POST' | 'GET' }> => {
        const requestBody = await readBody<{
            contentType: string;
            filename: string;
            prefix: string;
        }>(event);

        if (!/^[0-9a-zA-Z\-_.]+$/.test(requestBody.filename)) {
            throw createError({
                statusCode: 400,
                statusMessage:
                    'Invalid file name can only use alphanumberic characters, hyphens or underscores.',
            });
        }
        let key = requestBody.filename;
        if (requestBody.prefix) {
            key = `${requestBody.prefix}/${requestBody.filename}`;
        }
        const putCommand = new PutObjectCommand({
            Bucket: runtimeConfig.s3MediaBucket,
            Key: key,
            ContentType: requestBody.contentType,
        });
        const url = await getSignedUrl(getS3Client(), putCommand, {
            expiresIn: EXPIRES_IN,
        });
        return {
            url,
            method: 'PUT',
        };
    }
);
