import { CreateMultipartUploadCommand } from '@aws-sdk/client-s3';
import { getS3Client } from '~/server/utils/s3Client';

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(
    async (event): Promise<{ key: string; uploadId: string }> => {
        const requestBody = await readBody<{
            type: string;
            metadata: Record<string, string>;
            filename: string;
            prefix: string | undefined;
        }>(event);

        if (typeof requestBody.filename !== 'string') {
            throw createError({
                statusCode: 400,
                statusMessage: 's3: content filename must be a string',
            });
        }

        if (!/^[0-9a-zA-Z\-_.]+$/.test(requestBody.filename)) {
            throw createError({
                statusCode: 400,
                statusMessage:
                    'Invalid file name can only use alphanumberic characters, hyphens, or underscores.',
            });
        }

        let key = requestBody.filename;
        if (requestBody.prefix) {
            key = `${requestBody.prefix}/${requestBody.filename}`;
        }
        const createMultipartUploadCommand = new CreateMultipartUploadCommand({
            Bucket: runtimeConfig.s3MediaBucket,
            Key: key,
            ContentType: requestBody.type,
            Metadata: requestBody.metadata,
        });
        const response = await getS3Client().send(createMultipartUploadCommand);
        setResponseHeaders(event, {
            'Access-Control-Allow-Origin': runtimeConfig.public.siteUrl,
        });
        return {
            key: response.Key!,
            uploadId: response.UploadId!,
        };
    }
);
