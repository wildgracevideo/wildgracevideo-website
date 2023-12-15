interface VideoRepresentation {
    baseUrl: string;
    bandwidth: number;
    width: number;
    height: number;
}

export default defineNuxtPlugin((nuxtApp) => {
    const runtimeConfig = useRuntimeConfig();
    const cloudfrontUrl = runtimeConfig.public.cloudfrontUrl;
    return {
        provide: {
            stream: (videoElement: HTMLVideoElement, mpdFilename: string) =>
                nuxtApp.runWithContext(() =>
                    internalStream(videoElement, mpdFilename, cloudfrontUrl)
                ),
        },
    };
});

// TODO: Fragmented stream of mp4
async function internalStream(
    videoElement: HTMLVideoElement,
    mpdFilename: string,
    cloudfrontUrl: string
): Promise<void> {
    const mimeType = 'video/mp4; codecs="avc1.640028""';
    if (window.MediaSource && window.MediaSource.isTypeSupported(mimeType)) {
        const bestVideoRepresentation: VideoRepresentation =
            await getBestVideoRepresentation(mpdFilename, cloudfrontUrl);
        console.log('Selected video representation:', bestVideoRepresentation);
        const mediaSource = new MediaSource();
        videoElement.src = URL.createObjectURL(mediaSource);

        mediaSource.addEventListener('sourceopen', function () {
            const sourceBuffer = mediaSource.addSourceBuffer(mimeType);
            sourceBuffer.addEventListener('updateend', function () {
                if (!sourceBuffer.updating) {
                    mediaSource.endOfStream();
                }
            });

            $fetch<Response>(
                `${cloudfrontUrl}/${bestVideoRepresentation?.baseUrl}`
            )
                .then((response: Response) => response.arrayBuffer())
                .then((segmentData) => {
                    sourceBuffer.appendBuffer(segmentData);
                })
                .catch((error) =>
                    console.error('Error fetching MPEG-DASH segment:', error)
                );
        });

        videoElement.addEventListener('error', function (e) {
            console.error('Video error:', e);
        });
    } else {
        throw new Error(`MPEG-Dash is not supported`);
    }
}

async function getMPDResponse(
    mpdUrl: string
): Promise<{ kbps: number; response: string }> {
    let arrayBuffer: ArrayBuffer;
    const timeStart = Date.now();
    let timeEnd: number;
    try {
        const response: Response = await $fetch(mpdUrl);
        timeEnd = Date.now();
        arrayBuffer = await response.arrayBuffer();
    } catch (error) {
        console.error('Error fetching MPD file:', error);
        throw error;
    }
    const downloadTime = timeEnd - timeStart;
    console.log(
        `took ${downloadTime} millis to download, fileSize ${arrayBuffer.byteLength}`
    );

    const textDecoder = new TextDecoder();
    return {
        kbps: (arrayBuffer.byteLength / downloadTime) * 8,
        response: textDecoder.decode(arrayBuffer),
    };
}

async function getBestVideoRepresentation(
    mpdFilename: string,
    cloudfrontUrl: string
): Promise<VideoRepresentation> {
    try {
        const mpdResponse = await getMPDResponse(
            `${cloudfrontUrl}/${mpdFilename}`
        );
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(mpdResponse.response, 'text/xml');
        const representations = xmlDoc.querySelectorAll('Representation');

        let bestRepresentation: VideoRepresentation | null = null;
        let highestBandwidth = 0;
        let lowestbandwidthRepresentation: VideoRepresentation | null;
        const targetDeviceWidth = window.innerWidth;

        representations.forEach((representation) => {
            const bandwidth = parseInt(
                representation.getAttribute('bandwidth') || '0',
                10
            );
            const width = parseInt(
                representation.getAttribute('width') || '0',
                10
            );
            const height = parseInt(
                representation.getAttribute('height') || '0',
                10
            );
            const baseUrl =
                representation.querySelector('BaseURL')?.textContent || '';

            const videoRepresentation: VideoRepresentation = {
                bandwidth,
                baseUrl,
                width,
                height,
            };

            if (
                !lowestbandwidthRepresentation ||
                lowestbandwidthRepresentation.bandwidth > bandwidth
            ) {
                lowestbandwidthRepresentation = videoRepresentation;
            }

            if (width <= targetDeviceWidth && bandwidth > highestBandwidth) {
                highestBandwidth = bandwidth;
                bestRepresentation = videoRepresentation;
            }
        });
        return bestRepresentation || lowestbandwidthRepresentation!;
    } catch (error) {
        console.error('Error fetching MPD data:', error);
    }
    throw new Error(`MPD, ${mpdFilename} has no representations`);
}
