export default defineEventHandler((event) => {
    const query = getQuery(event);
    const url = query.url?.toString();
    if (url) {
        const headers = {
            'Access-Control-Allow-Origin': '*',
        };
        setResponseHeaders(event, headers);
        return $fetch(url);
    } else {
        throw createError({
            statusMessage: 'Missing required url parameter',
            statusCode: 400,
        });
    }
});
