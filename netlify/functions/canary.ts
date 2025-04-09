import fetch from 'node-fetch';

export default async function (req: Request): Promise<void> {
    const { next_run } = await req.json();
    console.log('Received event! Next invocation at:', next_run);

    const pages = [
        `${process.env.URL}/`,
        `${process.env.URL}/services`,
        `${process.env.URL}/portfolio`,
        `${process.env.URL}/about`,
        `${process.env.URL}/shop`,
        `${process.env.URL}/get-started`,
    ];
    await Promise.all(
        pages.map(async (page) => {
            try {
                await fetch(page);
            } catch (e: unknown) {
                console.error('Failed to fetch page', e);
            }
        })
    );
}
