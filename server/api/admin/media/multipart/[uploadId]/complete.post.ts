import { CompleteMultipartUploadCommand, Part } from '@aws-sdk/client-s3';
import { getS3Client } from '~/server/utils/s3Client';

const runtimeConfig = useRuntimeConfig();

function isValidPart(part: Part) {
    return (
        part &&
        typeof part === 'object' &&
        Number(part.PartNumber) &&
        typeof part.ETag === 'string'
    );
}

export default defineEventHandler(
    async (event): Promise<{ location: string }> => {
        const uploadId = event.context.params!.uploadId!;
        const key = getQuery(event).key?.toString();

        const requestBody = await readBody<{
            parts: Part[];
        }>(event);

        const parts = requestBody.parts;

        if (typeof key !== 'string') {
            throw createError({
                statusCode: 400,
                statusMessage:
                    's3: the object key must be passed as a query parameter. For example: "?key=abc.jpg"',
            });
        }

        if (!Array.isArray(parts) || !parts.every(isValidPart)) {
            throw createError({
                statusCode: 400,
                statusMessage:
                    's3: `parts` must be an array of {ETag, PartNumber} objects.',
            });
        }

        const client = getS3Client();
        const response = await client.send(
            new CompleteMultipartUploadCommand({
                Bucket: runtimeConfig.s3MediaBucket,
                Key: key,
                UploadId: uploadId,
                MultipartUpload: {
                    Parts: parts,
                },
            })
        );
        setResponseHeaders(event, {
            'Access-Control-Allow-Origin': runtimeConfig.public.siteUrl,
        });
        return {
            location: response.Location!,
        };
    }
);
