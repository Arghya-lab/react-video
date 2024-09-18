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
import ReactVideo from "@arghya-lab/react-video";
import "@arghya-lab/react-video/dist/style.css";

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

- **`width`** (`number | string`): Width of video container.

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

## Custom Styling

To customize the styles, you can modify the following CSS variables in your project.\
Default variables values:

```scss
:root {
  --rv-progress-track-color: rgba(255, 255, 255, 0.6);
  --rv-progress-track-fill-color: red;
  --rv-progress-loaded-color: rgba(255, 255, 255, 0.5);
  --rv-progress-thumb-border-color: red;

  --rv-mobile-control-button-color: rgba(255, 255, 255, 0.9);
  --rv-volume-slider-color: rgba(255, 255, 255, 0.85);
  --rv-volume-slider-fill-color: red;
  --rv-loader-stroke-color: rgba(255, 255, 255, 0.9);
  --rv-setting-color: rgba(255, 255, 255, 0.9);
  --rv-setting-background: rgba(0, 0, 0, 0.7);
  --rv-setting-background-hover: rgba(255, 255, 255, 0.2);

  --rv-caption-background: rgba(0, 0, 0, 0.5);
  --rv-caption-color: rgba(255, 255, 255);

  --rv-chapters-container-background: rgba(0, 0, 0, 0.85);
  --rv-chapter-time-background: rgba(255, 255, 255, 0.2);
  --rv-chapter-time-color: rgba(255, 255, 255);
  --rv-chapter-button-color: rgba(255, 255, 255, 0.85);

  --rv-skip-button-color: white;
  --rv-skip-button-border-color: white;
  --rv-skip-button-background-color: rgba(255, 255, 255, 0.25);
  --rv-skip-button-background-color-hover: rgba(255, 255, 255, 0.2);

  --rv-tooltip-background: rgba(0, 0, 0, 0.75);

  --rv-global-font-size: 0.75rem;

  --rv-slider-border-radius: 0px;
  --rv-progress-height: 3.2px;
  --rv-progress-height-hover: 5.6px;
  --rv-progress-chapter-bar-height: 2.4px;
  --rv-progress-bottom-margin: 0px;
  --rv-progress-x-margin: 8px;
  --rv-progress-x-margin-fullscreen-425: 16px;
  --rv-progress-x-margin-fullscreen-600: 24px;
  --rv-progress-x-margin-fullscreen-1000: 24.96px;
  --rv-progress-x-margin-fullscreen-1200: 32px;
  --rv-progress-x-margin-fullscreen-1400: 40px;
  --rv-progress-thumb-height: 14px;
  --rv-progress-thumb-border-size: 2px;

  --rv-control-padding-x: 8px;
  --rv-control-padding-y: 12px;
  --rv-control-padding-fullscreen-425-x: 16px;
  --rv-control-padding-fullscreen-425-y: 12px;
  --rv-control-padding-fullscreen-600-x: 20px;
  --rv-control-padding-fullscreen-600-y: 16px;
  --rv-control-padding-fullscreen-1000-x: 24.96px;
  --rv-control-padding-fullscreen-1000-y: 18px;
  --rv-control-padding-fullscreen-1200-x: 32px;
  --rv-control-padding-fullscreen-1200-y: 20px;
  --rv-control-padding-fullscreen-1400-x: 40px;
  --rv-control-padding-fullscreen-1400-y: 22.4px;
  --rv-control-button-gap: 14px;
  --rv-control-button-gap-fullscreen-600: 12px;
  --rv-control-button-gap-fullscreen-1000: 16px;
  --rv-control-button-height: 30px;
  --rv-control-button-width: 30px;

  --rv-volume-container-height: 2.4px;
  --rv-volume-container-width-expand: 64px;
  --rv-volume-slider-height: 3.84px;
  --rv-volume-thumb-height: 11.52px;

  --rv-loader-width: 57.6px;

  --rv-mobile-control-button-size: 56px;
  --rv-mobile-control-button-size-fullscreen-425: 56px;
  --rv-mobile-control-button-size-fullscreen-600: 60px;
  --rv-mobile-control-button-size-fullscreen-1000: 64px;
  --rv-mobile-control-button-size-fullscreen-1200: 68px;
  --rv-mobile-control-button-size-fullscreen-1400: 72px;

  --rv-setting-margin: 16px;
  --rv-setting-width: 256px;
  --rv-setting-max-height: 320px;
  --rv-setting-border-radius: 12px;
  --rv-setting-padding: 8px 0;
  --rv-setting-item-height: 40px;
  --rv-setting-item-icon-padding: 0 10px;

  --rv-setting-item-label-padding: 0 15px 0 0;
  --rv-setting-item-label-font-weight: 400;
  --rv-setting-item-label-font-size: 1em;
  --rv-setting-item-label-count-font-size: 0.86em;

  --rv-setting-item-active-padding: 0 38px 0 15px;
  --rv-setting-item-active-background-size: 32px 32px;
  --rv-setting-item-active-background-position: right 9px center;
  --rv-setting-item-active-font-weight: 300;
  --rv-setting-item-active-font-size: 0.92em;

  --rv-setting-option-header-font-weight: 500;
  --rv-setting-option-header-font-size: 1.25em;
  --rv-setting-option-header-height: 48px;
  --rv-setting-option-header-padding-left: 48px;
  --rv-setting-option-header-bottom-border: 2px solid black;
  --rv-setting-option-header-background-position: left 9px center;
  --rv-setting-setting-option-choice-padding-left: 32px;

  --rv-caption-padding: 4px 12px;
  --rv-caption-font-size: 1rem;
  --rv-caption-font-size-fullscreen: clamp(1rem, 2vw, 1.5rem);

  --rv-chapters-container-padding: 32px;
  --rv-chapters-container-padding-left: 20%;
  --rv-chapter-button-font-size: 1.5rem;
  --rv-chapter-button-padding: 6px 12px;
  --rv-chapter-button-border-radius: 6px;
  --rv-chapter-gap: 20px;
  --rv-chapter-time-gap: 6px;
  --rv-chapter-time-padding: 2px;
  --rv-chapter-time-border-radius: 4px;

  --rv-skip-button-font-size: 1rem;
  --rv-skip-button-padding: 6px 10px;
  --rv-skip-button-side-margin: 16px;
  --rv-skip-button-bottom-margin: 20px;
  --rv-skip-button-border-width: 2px;
  --rv-skip-button-border-border-radius: 6px;

  --rv-tooltip-top-position: -48px;
  --rv-tooltip-top-position-fullscreen: -54px;
  --rv-tooltip-padding: 5px 8px;
  --rv-tooltip-padding-fullscreen: 6px 10px;
  --rv-tooltip-font-size: 0.85rem;
  --rv-tooltip-font-size-fullscreen: 0.95rem;
  --rv-tooltip-border-radius: 4px;

  --rv-info-text-container-margin: 20px;
  --rv-info-text-container-margin-fullscreen: 24px;
  --rv-info-text-title-padding-bottom: 8px;
  --rv-info-text-title-padding-bottom-fullscreen: 12px;
  --rv-info-text-title-font-size: clamp(1rem, 2vw, 1.375rem);
  --rv-info-text-title-font-size-fullscreen: clamp(1.5rem, 2.5vw, 1.75rem);
  --rv-info-text-summery-font-size: clamp(0.75rem, 1.5vw, 1rem);
  --rv-info-text-summery-font-size-fullscreen: clamp(0.94rem, 1.75vw, 1.125rem);
}
```

#### Progress Bar

`--rv-progress-track-color`: Color of the progress bar track.\
`--rv-progress-track-fill-color`: Color of the filled portion of the progress bar.\
`--rv-progress-loaded-color`: Color indicating the loaded portion of the video.\
`--rv-progress-thumb-border-color`: Border color of the progress thumb.

#### Mobile Controls

`--rv-mobile-control-button-color`: Color of mobile control buttons.\
`--rv-volume-slider-color`: Color of the volume slider track.\
`--rv-volume-slider-fill-color`: Color of the filled portion of the volume slider.\
`--rv-loader-stroke-color`: Stroke color of the loading animation.

#### Settings Panel

`--rv-setting-color`: Color of the text in the settings panel.\
`--rv-setting-background`: Background color of the settings panel.\
`--rv-setting-background-hover`: Background color of the settings panel on hover.

#### Captions

`--rv-caption-background`: Background color for captions.\
`--rv-caption-color`: Color of the caption text.

#### Chapters and Skip Buttons

`--rv-chapters-container-background`: Background color of the chapters container.\
`--rv-chapter-time-background`: Background color for chapter time.\
`--rv-chapter-time-color`: Text color for chapter time.\
`--rv-chapter-button-color`: Color of chapter buttons.\
`--rv-skip-button-color`: Color of the skip button text.\
`--rv-skip-button-border-color`: Border color of the skip button.\
`--rv-skip-button-background-color`: Background color of the skip button.

`--rvskip-button-background-color-hover`: Background color of the skip button on hover.

#### Tooltip and Miscellaneous

`--rv-tooltip-background`: Background color of tooltips.\
`--rv-global-font-size`: Global font size for the video player.

#### Controls and Layout

`--rv-slider-border-radius`: Border radius for sliders.\
`--rv-progress-height`: Height of the progress bar.\
`--rv-progress-height-hover`: Height of the progress bar when hovered.\
`--rv-control-padding`: Padding for controls.\
`--rv-control-button-gap`: Gap between control buttons.\
`--rv-control-button-height`: Height of control buttons.\
`--rv-control-button-width`: Width of control buttons.

#### You can import scss files and modify default css. Like

`import "@arghya-lab/react-video/scss/main.scss`

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
