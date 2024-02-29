## Streaming Overview

There are 3 representations of the reel video.

-   {reel-name}-h264.mp4 (This is the full video in standard mp4 format used for SEO)
-   {reel-name}-hls/
-   Contains initialization mp4 file
-   Contains m4s video mp4 video segments
-   Contains mpd mainfest file describing how all the parts fit together
-   {reel-name}-mpeg-dash/
-   Contains ts video segments
-   Contains m3u8 manifest file describing how all the parts fit together

### Creating mpeg-dash representation

Run the following command to generate the mpeg-dash assets:

-   4000: segments are about 4s long
-   Rename the folder to {reel-name}-mpeg-dash
-   Make sure the duration is equal to {# of segments \* timescale}

```bash
MP4Box -frag 4000 -dash 4000 -segment-name segment\_file ./wgv-reel-2024-h264.mp4
```

### Creating hls representation

Run the following command to generate the hls assets in a folder called wgv-reel-2024-hls:

-   -t: Target number of seconds

```bash
mediafilesegmenter -f wgv-reel-2024-hls  -t 4 ./wgv-reel-2024-h264.mp4 -iframe-index-file none -index-file wgv-reel-2024.m3u8
```
