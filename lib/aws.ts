const runtimeConfig = useRuntimeConfig();

export const awsConfig = {
    credentials: {
        accessKeyId: runtimeConfig.awsAccessKeyId,
        secretAccessKey: runtimeConfig.awsSecret,
    },
    region: runtimeConfig.awsRegion,
};
