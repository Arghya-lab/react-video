import { CSSProperties } from "react";

export type SourceItemType = { quality: string | number; src: string };
export type SourceType = string | SourceItemType[] | null;
export interface PlaybackType {
  text: string;
  playbackRate: number;
}
export interface CaptionType {
  srclang: string;
  src: string;
}

export interface VideoPropTypes {
  source: SourceType;
  defaultQuality?: string | number;
  autoPlay?: boolean;
  controls?: boolean | "html5";
  captions?: CaptionType[];
  videoSkipSec?: number;
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
  onEnded?: () => void;
  onError?: () => void;

  onPlaybackRateChange?: (playbackSpeed: number) => void;
  onQualityChange?: (sourceItem: SourceItemType) => void;
  handlePlayPaused?: () => void;
}

export interface PlayerStateType {
  playing: boolean;
  startOnPlay: boolean;
  buffering: boolean;
  duration: number | null;
  currentTime: number;
  pip: boolean;
  isFullScreen: boolean;
  loaded: [number, number][]; //  each array's first item is start of buffered & last item is end of buffered
  volume: number; //  value -> 0-1
  muted: boolean;
  isControlVisible: boolean;
  isSettingOpen: boolean;
  settingItemOpen: "caption" | "playbackSpeed" | "quality" | null;
  currentSource: SourceItemType | null;
  isSourceAutoSelected: boolean;
  currentPlayback: PlaybackType;
  currentCaption: CaptionType | null;
  // loop: boolean,
  // skipTimes: SkipTimeType[];
  // isReady: boolean;
  // url: string | null;
  // light: boolean,
  // sources: AnimeStreamingLinkType[];
  // playbackQuality: string;
  // videoAspectRatio: number;
  // FullScreenType: ScreenFullTypeEnum;
  // isMobileDevice: boolean;
  // controllerVisibility: boolean;
  // isQualitySelectionOpen: boolean;
  // isSettingSectionOpen: boolean;
}
