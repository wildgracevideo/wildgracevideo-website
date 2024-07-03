export function handleVideoControls(
    videoElement: HTMLVideoElement | undefined
) {
    // Safari won't play videos on low-power mode
    if (videoElement) {
        videoElement
            .play()
            .then(() => {})
            .catch(() => {
                window.document
                    .querySelectorAll('video')
                    .forEach((it: HTMLVideoElement) => {
                        it.setAttribute('controls', 'controls');
                        it.classList.remove('pointer-events-none');
                    });
            });
    } else {
        console.error('Video element is not defined.');
    }
}
