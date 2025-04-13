const runtimeConfig = useRuntimeConfig();

export const awsConfig = {
    credentials: {
        accessKeyId: runtimeConfig.awsAccessKeyId,
        secretAccessKey: runtimeConfig.awsSecret,
    },
    region: runtimeConfig.awsRegion,
};

export interface S3Object {
    name: string;
    lastModified: string;
    size: string;
    isFolder: boolean;
}
