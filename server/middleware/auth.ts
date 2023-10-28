import { getServerSession } from '#auth';
import type { Session } from 'next-auth';

export default defineEventHandler(async (event) => {
  if (event.node.req.url?.startsWith("/api/admin")) {
    const session: Session | null = await getServerSession(event);
    if (!session || Date.parse(session.expires) < Date.now()) {
      throw createError({ statusMessage: 'Unauthenticated', statusCode: 401 });
    }
  }
});