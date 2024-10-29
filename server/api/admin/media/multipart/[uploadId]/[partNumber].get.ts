import { UploadPartCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getS3Client } from '~/server/utils/s3Client';

const EXPIRES_IN = 900; // 15 minutes

const runtimeConfig = useRuntimeConfig();

function validatePartNumber(partNumber: number) {
    // eslint-disable-next-line no-param-reassign
    partNumber = Number(partNumber);
    return (
        Number.isInteger(partNumber) && partNumber >= 1 && partNumber <= 10_000
    );
}

export default defineEventHandler(
    async (event): Promise<{ url: string; expires: number }> => {
        const uploadId = event.context.params!.uploadId!;
        const partNumberString = event.context.params!.partNumber!;
        const key = getQuery(event).key?.toString();

        const partNumber = parseInt(partNumberString);

        if (partNumber == Number.NaN || !validatePartNumber(partNumber)) {
            throw createError({
                statusCode: 400,
                statusMessage:
                    's3: the part number must be an integer between 1 and 10000.',
            });
        }
        if (typeof key !== 'string') {
            throw createError({
                statusCode: 400,
                statusMessage:
                    's3: the object key must be passed as a query parameter. For example: "?key=abc.jpg"',
            });
        }

        const response = await getSignedUrl(
            getS3Client(),
            new UploadPartCommand({
                Bucket: runtimeConfig.s3MediaBucket,
                Key: key,
                UploadId: uploadId,
                PartNumber: partNumber,
                Body: '',
            }),
            { expiresIn: EXPIRES_IN }
        );
        setResponseHeaders(event, {
            'Access-Control-Allow-Origin': runtimeConfig.public.siteUrl,
        });
        return {
            url: response,
            expires: EXPIRES_IN,
        };
    }
);
