import { Marked } from 'marked';

export default defineNuxtPlugin(() => {
    const renderer = new Marked();
    renderer.use({
        breaks: true,
    });
    return {
        provide: {
            mdRenderer: renderer,
        },
    };
});
