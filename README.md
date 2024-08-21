# React Video

A react-video is a feature-rich and optimized React video player component library with TypeScript support.

## Features

- **Custom Controls**: Tailor the player controls to fit your design needs.
- **Multi-Format Support**: Plays HLS, DASH, and FLV video files seamlessly.
- **Mobile Device Friendly**: Optimized controls for a smooth mobile experience.
- **Multi-quality Streaming**: Support for multiple streaming qualities with different qualities.
- **Playback Speed Control**: Adjust playback speed with ease.
- **Caption Support**: Display captions and subtitles for a better viewing experience.
- **Keyboard Gestures**: Navigate and control playback using keyboard gestures.
- **Chapter Highlights**: View and skip through chapters highlighted in the progress bar.

## Upcoming Features

- **Different aspect ratio full screen**: Different aspect ratio of full screen mode.

## Installation

To install the library, use npm:

```bash
npm install @arghya-lab/react-video
```

## Usage

Here's a basic example of how to use the video player component:

```tsx
import React from "react";
import { ReactVideo } from "@arghya-lab/react-video";
import "@arghya-lab/react-video/dist/styles.css";

const App = () => (
  <div>
    <ReactVideo
      src="path/to/your/video.mp4"
      // other props
    />
  </div>
);

export default App;
```

## VideoPlayer Component Props

```ts
source?: string | { quality: string | number; src: string }[] | null;
defaultQuality?: string | number;
autoPlay?: boolean;
controls?: boolean | "html5";
loop?: boolean;
captions?: { srclang: string; src: string; default?: boolean; }[];
videoSkipSec?: number;
chapters?: {
  name: string;
  startTime: number;
  endTime: number;
  color?: string;
  skipAble?: boolean;
}[];
showSkipableChapter?: boolean;
loadingPoster?: string;
infoText?: { title: string; summery?: string };
fullscreenOnlyInfoText?: boolean;
className?: string;
height?: number | string;
width?: number | string;
style?: CSSProperties;
onReady?: () => void;
onStart?: () => void;
onPlay?: () => void;
onPause?: () => void;
onBuffer?: () => void;
onBufferEnd?: () => void;
onSeek?: () => void;
onDuration?: (duration: number) => void;
onProgress?: ({
    currentTime,
    buffered,
  }: {
    currentTime: number;
    buffered: TimeRanges;
  }) => void;
onEnablePIP?: () => void;
onDisablePIP?: () => void;
onError?: () => void;
onEnded?: () => void;
onPlaybackRateChange?: (playbackSpeed: number) => void;
onQualityChange?: (sourceItem: {
    quality: string | number;
    src: string;
  }) => void;
```

- **`source`** (`string | { quality: string | number; src: string }[] | null`): The source URL(s) of the video. It can be a string for a single source, an array of sources with optional quality settings, or `null`.

- **`defaultQuality`** (`string | number | undefined`): The default quality level to use when multiple sources are provided. If not specified, the first source in the list will be used.

- **`autoPlay`** (`boolean | undefined`): Whether the video should start playing automatically when loaded.

- **`controls: `** (`boolean | "html5" | undefined`): Whether controls will be shown or not. html5 mean default html video control true mean custom control.

- **`captions: `** (`{ srclang: string; src: string; default?: boolean;}[] | undefined`): Captions for video support srt, vtt caption.

- **`loop: `** (`boolean | undefined`): Weather video will be on loop or not.

- **`videoSkipSec`** (`number`): How much sec should skip forward or skip back.

- **`chapters`** (`{ name: string; startTime: number; endTime: number; color?: string; skipAble?: boolean; }[] | undefined`): Chapters of the video. color property is for chapter highlighting in progressbar, skipable property is indicate that particular chapter is skipable or not.

- **`showSkipableChapter`** (`boolean | undefined`): It show skipable chapter in progress bar with color that indicate that this part is skipable.

- **`loadingPoster`** (`string | undefined`): Image src for bg poster while loading the video.

- **`infoText`** (`{ title: string; summery: string } | { title: string; } | undefined`): Text in the top of video(provide info about playing video).

- **`fullscreenOnlyInfoText`** (`boolean | undefined`): It limit the info text to show only in full screen mode.

- **`className`** (`string`): Class for video container.

- **`height`** (`number | string`): Height of video container.

- **`width`** (`number | string`): Height of video container.

- **`style`** : Style of video container.

- **`onReady`** (`fn() | undefined`): Callback function that is invoked when the video player is ready.

- **`onStart`** (`fn() | undefined`): Callback function that is invoked when playback starts.

- **`onPlay`** (`fn() | undefined`): Callback function that is invoked when playback resumes.

- **`onPause`** (`fn() | undefined`): Callback function that is invoked when playback is paused.

- **`onBuffer`** (`fn() | undefined`): Callback function that is invoked when the video starts buffering.

- **`onBufferEnd`** (`fn() | undefined`): Callback function that is invoked when buffering ends.

- **`onSeek`** (`fn() | undefined`): Callback function that is invoked when the user seeks to a different time in the video.

- **`onDuration`** (`fn() | undefined`): Callback function that is invoked when the video duration is available or changes.

- **`onProgress`** (`fn() | undefined`): Callback function that is invoked periodically with the current playback progress.

- **`onEnablePIP`** (`fn() | undefined`): Callback function that is invoked when Picture-in-Picture mode is enabled.

- **`onDisablePIP`** (`fn() | undefined`): Callback function that is invoked when Picture-in-Picture mode is disabled.

- **`onError`** (`fn() | undefined`): Callback function that is invoked when an error occurs during playback.

- **`onEnded`** (`fn() | undefined`): Callback function that is invoked when playback ends.

- **`onPlaybackRateChange`** (`fn() | undefined`): Callback function that is invoked when playback ends.

- **`onQualityChange`** (`fn() | undefined`): Callback function that is invoked when playback ends.

- **`ref`** (`RefObject<HTMLVideoElement>`): Ref for the html video element which react-video using under the hood.

## Keyboard Shortcuts

| Key                    | Action                                  |
| ---------------------- | --------------------------------------- |
| `Space`                | Play/Pause (unless focused on a button) |
| `K`, `k`               | Play/Pause                              |
| `ArrowRight`, `L`, `l` | Skip Forward                            |
| `ArrowLeft`, `J`, `j`  | Skip Backward                           |
| `F`, `f`               | Toggle Fullscreen                       |
| `P`, `p`               | Toggle Picture-in-Picture (PiP)         |
| `M`, `m`               | Toggle Mute                             |
| `Escape`               | Exit Fullscreen                         |
| `ArrowUp`              | Increase Volume                         |
| `ArrowDown`            | Decrease Volume                         |
| `0`                    | Seek to 0% (start) of video             |
| `1`                    | Seek to 10% of video                    |
| `2`                    | Seek to 20% of video                    |
| `3`                    | Seek to 30% of video                    |
| `4`                    | Seek to 40% of video                    |
| `5`                    | Seek to 50% of video                    |
| `6`                    | Seek to 60% of video                    |
| `7`                    | Seek to 70% of video                    |
| `8`                    | Seek to 80% of video                    |
| `9`                    | Seek to 90% of video                    |

## Development

To contribute or develop the library further, follow these steps:

Clone the repository:

```bash
git clone https://github.com/Arghya-lab/react-video
```

Install dependencies:

```bash
cd react-video
npm install
```

Start the development server:

```bash
npm run storybook
```

## Contributing

We welcome contributions to enhance the library. Please open an issue or submit a pull request on GitHub.

## Bug Report

If you find any bug plz report on https://github.com/Arghya-lab/react-video/issues

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or support, please contact https://github.com/Arghya-lab.
