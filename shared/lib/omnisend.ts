import api from 'api';

const runtimeConfig = useRuntimeConfig();

const omnisendApi = api('@omnisend/v3#9e9zcmulnbuexom');
omnisendApi.auth(runtimeConfig.omnisendApiKey);
export const omnisend = omnisendApi;
