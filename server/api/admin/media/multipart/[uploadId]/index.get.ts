import { ListPartsCommand, Part } from '@aws-sdk/client-s3';
import { getS3Client } from '~~/server/utils/s3Client';

const runtimeConfig = useRuntimeConfig();

export default defineEventHandler(async (event): Promise<{ parts: Part[] }> => {
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
    const parts: Part[] = [];
    async function listPartsPage(startsAt: string | undefined = undefined) {
        const response = await client.send(
            new ListPartsCommand({
                Bucket: runtimeConfig.s3MediaBucket,
                Key: key!,
                UploadId: uploadId,
                PartNumberMarker: startsAt,
            })
        );
        if (response.Parts) {
            parts.push(...response.Parts);
        }

        // continue to get list of all uploaded parts until the IsTruncated flag is false
        if (response.IsTruncated) {
            listPartsPage(response.NextPartNumberMarker);
        } else {
            return;
        }
    }
    await listPartsPage();
    return { parts };
});
