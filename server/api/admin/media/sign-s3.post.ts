import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const runtimeConfig = useRuntimeConfig();

const EXPIRES_IN = 900; // Define how long until a S3 signature expires.

export default defineEventHandler(
    async (event): Promise<{ url: string; method: 'PUT' | 'POST' | 'GET' }> => {
        const requestBody = await readBody<{
            contentType: string;
            filename: string;
        }>(event);

        const putCommand = new PutObjectCommand({
            Bucket: runtimeConfig.s3MediaBucket,
            Key: requestBody.filename,
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

let s3Client: S3Client;

function getS3Client() {
    s3Client ??= new S3Client({
        region: runtimeConfig.awsRegion,
        credentials: {
            accessKeyId: runtimeConfig.awsAccessKeyId,
            secretAccessKey: runtimeConfig.awsSecret,
        },
    });
    return s3Client;
}
