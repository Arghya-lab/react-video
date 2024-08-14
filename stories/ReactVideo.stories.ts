import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ReactVideo } from "../src";

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
      "https://imdb-video.media-imdb.com/vi738838041/1434659607842-pgv4ql-1722963382149.mp4?Expires=1723637528&Signature=s00FkvgnBBtEvSxqIRpWJ4U4yCn3CplbdpWquqPc~sQ9pJoN9qNK4~L8xZ3qCQPCP4i8g8tT3aTPNSELul1CP~oqDmqT04fHXn21it736UlC8xawBujjXDtrlKQkA8Pj26aPduIK-PD3J3EszuyUm~JFJ5nVXGmOjwNryE~DYcS5hSiz1jh07O8fzcscAJLT-fksJxQnEZ7pp31DtS2D7Uw6znKSFgAjKVt4Aj5bmDKOp6S6G8Ek-RPzdyql0rxHrHUoMud5Z1WsRTfkatVHekJWxQvrvfy2qcQof1Z7u1WqujhCNyNOHHslm2pt~4169StrukQjInphGBS1ptOTzQ__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA",
    // autoPlay: true,
  },
};

export const Hls8Video: Story = {
  args: {
    // source: "https://www088.vipanicdn.net/streamhls/83a227d867325122bc1a93622cf0fb3d/ep.1.1709061920.1080.m3u8",
    source:
      "https://www088.vipanicdn.net/streamhls/83a227d867325122bc1a93622cf0fb3d/ep.1.1709061920.480.m3u8",
    // autoPlay: true,
  },
};

export const DashVideo: Story = {
  args: {
    source: "https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths/dash.mpd",
    // autoPlay: true,
  },
};
