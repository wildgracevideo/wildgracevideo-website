import type { Session } from 'next-auth';
// eslint-disable-next-line import/no-unresolved
import { getServerSession } from '#auth';

export default defineEventHandler(async (event) => {
    if (
        event.node.req.url?.startsWith('/api/admin') &&
        event.node.req.url !== '/api/admin/cms/callback'
    ) {
        const session: Session | null = await getServerSession(event);
        if (!session || Date.parse(session.expires) < Date.now()) {
            throw createError({
                statusMessage: 'Unauthenticated',
                statusCode: 401,
            });
        }
    }
});
