# React Video

A react-video is a feature-rich and optimized React video player component library with TypeScript support.

## Features

- **Custom Controls**: Tailor the player controls to fit your design needs.
- **Multi-Format Support**: Plays HLS, DASH, and FLV video files seamlessly.
- **Mobile Device Friendly**: Optimized controls for a smooth mobile experience.

## Upcoming Features

- **Multi-Link Streaming**: Support for multiple streaming links with different qualities.
- **Caption Support**: Display captions and subtitles for a better viewing experience.
- **Screenshot Support**: Capture screenshots directly from the progress bar.
- **Keyboard Gestures**: Navigate and control playback using keyboard gestures.
- **Playback Speed Control**: Adjust playback speed with ease.
- **Chapter Highlights**: View and skip through chapters highlighted in the progress bar.

## Installation

To install the library, use npm or yarn:

```bash
npm install react-video
```

## Usage

Here's a basic example of how to use the video player component:

```tsx
import React from "react";
import { ReactVideo } from "react-video";

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

Certainly! Here's how you might document the VideoPlayer component props in Markdown format:

markdown

## VideoPlayer Component Props

```ts
source: string | { quality?: string | number; src: string }[] | null;
defaultQuality?: string | number;
autoPlay?: boolean;
handlePlayPaused?: () => void;
onReady?: () => void;
onStart?: () => void;
onPlay?: () => void;
onPause?: () => void;
onBuffer?: () => void;
onBufferEnd?: () => void;
onSeek?: () => void;
onDuration?: (duration: null | number) => void;
onProgress?: (duration: number) => void;
onEnablePIP?: () => void;
onDisablePIP?: () => void;
onError?: () => void;
onEnded?: () => void;
```

- **`source`** (`string | { src: string }[] { quality: string | number; src: string }[] | null`): The source URL(s) of the video. It can be a string for a single source, an array of sources with optional quality settings, or `null`.

- **`defaultQuality`** (`string | number | undefined`): The default quality level to use when multiple sources are provided. If not specified, the first source in the list will be used.

- **`autoPlay`** (`boolean | undefined`): Whether the video should start playing automatically when loaded.

- **`handlePlayPaused`** (`fn() | undefined`): Callback function that is invoked when the play/pause button is interacted with.

- **`onReady`** (`fn() | undefined`): Callback function that is invoked when the video player is ready.

- **`onStart`** (`fn() | undefined`): Callback function that is invoked when playback starts.

- **`onPlay`** (`fn() | undefined`): Callback function that is invoked when playback resumes.

- **`onPause`** (`fn() | undefined`): Callback function that is invoked when playback is paused.

- **`onBuffer`** (`fn() | undefined`): Callback function that is invoked when the video starts buffering.

- **`onBufferEnd`** (`fn() | undefined`): Callback function that is invoked when buffering ends.

- **`onSeek`** (`fn() | undefined`): Callback function that is invoked when the user seeks to a different time in the video.

- **`onDuration`** (`fn() | undefined`)
  onDuration ((duration: null | number) => void): Callback function that is invoked when the video duration is available or changes.

- **`onProgress`** (`fn() | undefined`): Callback function that is invoked periodically with the current playback duration.

- **`onEnablePIP`** (`fn() | undefined`): Callback function that is invoked when Picture-in-Picture mode is enabled.

- **`onDisablePIP`** (`fn() | undefined`): Callback function that is invoked when Picture-in-Picture mode is disabled.

- **`onError`** (`fn() | undefined`): Callback function that is invoked when an error occurs during playback.

- **`onEnded`** (`fn() | undefined`): Callback function that is invoked when playback ends.

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

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or support, please contact https://github.com/Arghya-lab.
