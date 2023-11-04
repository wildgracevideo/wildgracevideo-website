import api from 'api';

const runtimeConfig = useRuntimeConfig();

const omnisend_api = api('@omnisend/v3#9e9zcmulnbuexom');
omnisend_api.auth(runtimeConfig.omnisendApiKey);
export const omnisend = omnisend_api;