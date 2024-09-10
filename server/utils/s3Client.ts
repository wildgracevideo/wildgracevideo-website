import { S3Client } from '@aws-sdk/client-s3';

let s3Client: S3Client;

export function getS3Client() {
    const runtimeConfig = useRuntimeConfig();
    s3Client ??= new S3Client({
        region: runtimeConfig.awsRegion,
        credentials: {
            accessKeyId: runtimeConfig.awsAccessKeyId,
            secretAccessKey: runtimeConfig.awsSecret,
        },
    });
    return s3Client;
}
