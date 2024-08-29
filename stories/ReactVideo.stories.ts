import type { Meta, StoryObj } from "@storybook/react";
import ReactVideo from "../src";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "ReactVideo",
  component: ReactVideo,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    // layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof ReactVideo>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const NormalVideo: Story = {
  args: {
    source:
      // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    // autoPlay: true,
    videoSkipSec: 20,
  },
};

export const Movie: Story = {
  args: {
    source:
      "https://hls2.vcdnx.com/hls/aHpvUVNTTlNiQ29WWkt3OWJPREgvUT09/xfgdYshjhYhj=!sdsHsyG",
    // autoPlay: true,
  },
};

export const Hls_loadPoster_infoText: Story = {
  args: {
    // source: "https://www088.vipanicdn.net/streamhls/83a227d867325122bc1a93622cf0fb3d/ep.1.1709061920.1080.m3u8",
    source:
      "https://www088.vipanicdn.net/streamhls/83a227d867325122bc1a93622cf0fb3d/ep.1.1709061920.480.m3u8",
    loadingPoster:
      // "https://static.animesuge.to/6b/i/5/5d/5d13c1684a4dcf9795b5254918484c42@1024.jpg",
      "https://ww11.gogoanimes.fi/cover/jujutsu-kaisen-tv-dub.png",
    infoText: {
      title: "Jujutsu Kaisen",
      summery: "Episode: 01",
    },
    // autoPlay: true,
  },
};

export const DashVideo: Story = {
  args: {
    source:
      "https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths/dash.mpd",
    // autoPlay: true,
  },
};

export const CaptionVideo: Story = {
  args: {
    source: "https://files.vidstack.io/sprite-fight/hls/stream.m3u8",
    captions: [
      {
        src: "https://files.vidstack.io/sprite-fight/subs/english.vtt",
        srclang: "en",
      },
    ],
    // autoPlay: true,
  },
};

export const polyQtyHlsWithCh: Story = {
  args: {
    source: [
      {
        src: "https://www088.vipanicdn.net/streamhls/83a227d867325122bc1a93622cf0fb3d/ep.1.1709061920.360.m3u8",
        quality: "360p",
      },
      {
        src: "https://www088.vipanicdn.net/streamhls/83a227d867325122bc1a93622cf0fb3d/ep.1.1709061920.480.m3u8",
        quality: "480p",
      },
      {
        src: "https://www088.vipanicdn.net/streamhls/83a227d867325122bc1a93622cf0fb3d/ep.1.1709061920.720.m3u8",
        quality: "720p",
      },
      {
        src: "https://www088.vipanicdn.net/streamhls/83a227d867325122bc1a93622cf0fb3d/ep.1.1709061920.1080.m3u8",
        quality: "1080p",
      },
      {
        src: "https://www088.vipanicdn.net/streamhls/83a227d867325122bc1a93622cf0fb3d/ep.1.1709061920.m3u8",
        quality: "default",
      },
    ],
    chapters: [
      {
        name: "opening interval",
        startTime: 54.711,
        endTime: 145.111,
        skipAble: true,
        color: "yellow",
      },
      {
        name: "ending interval",
        startTime: 1292.583,
        endTime: 1370.829,
        skipAble: false,
        color: "pink",
      },
      {
        name: "mixed ed",
        startTime: 1424.042,
        endTime: 1435,
        skipAble: true,
        color: "blue",
      },
    ],
    showSkipableChapter: true,
  },
};

export const MultiQuality: Story = {
  args: {
    source: [
      {
        src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
        quality: "576p",
      },
      {
        src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4",
        quality: "720p",
      },
      {
        src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4",
        quality: "1080p",
      },
    ],
    captions: [
      {
        srclang: "en",
        src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt",
        default: true,
      },
      {
        srclang: "fr",
        src: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt",
      },
    ],
    // downloadLink:
    //   "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
  },
};
