export function handleVideoControls(
    videoElement: HTMLVideoElement | undefined
) {
    // Safari won't play videos on low-power mode
    if (videoElement) {
        videoElement
            .play()
            .then(() => {})
            .catch((error) => {
                if (error.name === 'NotAllowedError') {
                    videoElement.setAttribute('controls', 'controls');
                    videoElement.classList.remove('pointer-events-none');
                }
            });
    } else {
        console.error('Video element is not defined.');
    }
}
