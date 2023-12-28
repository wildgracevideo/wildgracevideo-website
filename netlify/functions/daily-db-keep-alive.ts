import fetch from 'node-fetch';

export default async function (req: Request): Promise<void> {
    const { next_run } = await req.json();
    console.log('Received event! Next invocation at:', next_run);

    try {
        await fetch(`${process.env.URL}/api/db/keep-alive`, {
            headers: { Authorization: process.env.API_KEY! },
            method: 'POST',
        });
    } catch (e: unknown) {
        console.error('Failed to keep DB alive', e);
    }
}
