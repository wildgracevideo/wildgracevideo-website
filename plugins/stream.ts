interface AdaptationSet {
    representation: VideoRepresentation;
    segment: VideoSegment;
    mimeType: string;
}

interface VideoRepresentation {
    baseUrl: string;
    bandwidth: number;
    width: number;
    height: number;
}

interface VideoSegment {
    initializationFile: string;
    templateFile: string;
    numberOfSegments: number;
    startNumber: number;
    timescale: number;
}

export default defineNuxtPlugin((nuxtApp) => {
    const runtimeConfig = useRuntimeConfig();
    const cloudfrontUrl = runtimeConfig.public.cloudfrontUrl;
    return {
        provide: {
            stream: (
                videoElement: HTMLVideoElement,
                mpdFilename: string,
                cloudfrontFolder: string
            ) =>
                nuxtApp.runWithContext(() =>
                    internalStream(
                        videoElement,
                        mpdFilename,
                        cloudfrontUrl,
                        cloudfrontFolder
                    )
                ),
        },
    };
});

async function internalStream(
    videoElement: HTMLVideoElement,
    mpdFilename: string,
    cloudfrontUrl: string,
    cloudfrontFolder: string
): Promise<void> {
    if (window.MediaSource) {
        const bestVideoRepresentation = await getBestAdaptationSet(
            mpdFilename,
            cloudfrontUrl,
            cloudfrontFolder
        );
        console.log('Selected video representation:', bestVideoRepresentation);
        const mediaSource = new MediaSource();
        videoElement.src = URL.createObjectURL(mediaSource);

        mediaSource.addEventListener(
            'sourceopen',
            async function () {
                console.log('source open');
                const response = await $fetch<Response>(
                    `${cloudfrontUrl}/${cloudfrontFolder}/${bestVideoRepresentation.segment.initializationFile}`
                );
                const initializationSegment = await response.arrayBuffer();
                const sourceBuffer = mediaSource.addSourceBuffer(
                    bestVideoRepresentation.mimeType
                );
                sourceBuffer.appendBuffer(initializationSegment);
                let segmentNumber = bestVideoRepresentation.segment.startNumber;
                sourceBuffer.addEventListener('updateend', async function () {
                    console.log(
                        `updateend, ${segmentNumber}, ${bestVideoRepresentation.segment.numberOfSegments}, ${sourceBuffer.updating}`
                    );
                    if (!sourceBuffer.updating) {
                        if (
                            segmentNumber <=
                            bestVideoRepresentation.segment.numberOfSegments
                        ) {
                            await appendNextSegment(
                                segmentNumber++,
                                bestVideoRepresentation,
                                cloudfrontUrl,
                                cloudfrontFolder,
                                sourceBuffer
                            );
                        } else {
                            console.log('Ending..');
                            mediaSource.endOfStream();
                        }
                    }
                });
            },
            { once: true }
        );

        videoElement.addEventListener('error', function (e) {
            console.error('Video error:', e);
        });
    } else {
        throw new Error(`MPEG-Dash is not supported`);
    }
}

async function appendNextSegment(
    segment: number,
    bestVideoRepresentation: AdaptationSet,
    cloudfrontUrl: string,
    cloudfrontFolder: string,
    sourceBuffer: SourceBuffer
) {
    const segmentFile = bestVideoRepresentation.segment.templateFile.replace(
        /\$\w+\$/g,
        segment.toString()
    );
    await fetchFile(
        `${cloudfrontUrl}/${cloudfrontFolder}/${segmentFile}`,
        sourceBuffer
    );
}

async function fetchFile(
    fileName: string,
    sourceBuffer: SourceBuffer
): Promise<void> {
    try {
        const response = await $fetch<Response>(fileName);
        const arrayBuffer = await response.arrayBuffer();
        sourceBuffer.appendBuffer(arrayBuffer);
    } catch (e: unknown) {
        console.error('Error fetching MPEG-DASH segment:', e);
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

async function getBestAdaptationSet(
    mpdFilename: string,
    cloudfrontUrl: string,
    cloudfrontFolder: string
): Promise<AdaptationSet> {
    try {
        const mpdResponse = await getMPDResponse(
            `${cloudfrontUrl}/${cloudfrontFolder}/${mpdFilename}`
        );
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(mpdResponse.response, 'text/xml');
        const adaptationSets = xmlDoc.querySelectorAll('AdaptationSet');

        let bestRepresentation: AdaptationSet | null = null;
        let highestBandwidth = 0;
        let lowestbandwidthAdaptationSet: AdaptationSet | null = null;
        const targetDeviceWidth = window.innerWidth;

        adaptationSets.forEach((adaptationSetElement) => {
            const representation =
                adaptationSetElement.querySelector('Representation');
            const segmentElement =
                adaptationSetElement.querySelector('SegmentTemplate');
            if (!representation || !segmentElement) {
                return;
            }
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

            const initializationFile =
                segmentElement.getAttribute('initialization') ?? '';
            const timescale = parseInt(
                segmentElement.getAttribute('timescale') ?? '1',
                10
            );
            const duration = parseInt(
                segmentElement.getAttribute('duration') ?? '0',
                10
            );
            const startNumber = parseInt(
                segmentElement.getAttribute('startNumber') ?? '1',
                10
            );
            const media = segmentElement.getAttribute('media') ?? '';

            const numberOfSegments = duration / timescale;

            const videoRepresentation: VideoRepresentation = {
                bandwidth,
                baseUrl,
                width,
                height,
            };

            const segment: VideoSegment = {
                initializationFile,
                numberOfSegments,
                startNumber,
                timescale,
                templateFile: media,
            };

            const simpleMimeType =
                representation.getAttribute('mimeType') || '';
            const codecs = representation.getAttribute('codecs') || '';
            const mimeType = `${simpleMimeType}; codecs="${codecs}""`;

            const adaptationSet = {
                mimeType,
                representation: videoRepresentation,
                segment: segment,
            };

            if (MediaSource.isTypeSupported(mimeType)) {
                if (
                    !lowestbandwidthAdaptationSet ||
                    lowestbandwidthAdaptationSet.representation.bandwidth >
                        bandwidth
                ) {
                    lowestbandwidthAdaptationSet = adaptationSet;
                }

                if (
                    width <= targetDeviceWidth &&
                    bandwidth > highestBandwidth
                ) {
                    highestBandwidth = bandwidth;
                    bestRepresentation = adaptationSet;
                }
            }
        });
        if (lowestbandwidthAdaptationSet === null) {
            throw new Error('No Representation is supported.');
        }
        return bestRepresentation || lowestbandwidthAdaptationSet!;
    } catch (error) {
        console.error('Error fetching MPD data:', error);
    }
    throw new Error(`MPD, ${mpdFilename} has no representations`);
}
