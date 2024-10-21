import { CSSProperties, ReactNode } from "react";
import { SubtitleItemType } from "../lib/fetchAndParseCaption";

export type SourceItemType = { quality: string | number; src: string };

export type SourceType = string | SourceItemType[] | null;

export interface PlaybackType {
  text: string;
  playbackRate: number;
}

export interface CaptionType {
  srclang: string;
  src: string;
  default?: boolean;
}

export interface ChapterType {
  name: string;
  startTime: number;
  endTime: number;
  color?: string;
  skipAble?: boolean;
}

export interface VideoPropTypes {
  source: SourceType;
  defaultQuality?: string | number;
  autoPlay?: boolean;
  controls?: boolean | "html5";
  loop?: boolean;
  captions?: CaptionType[];
  videoSkipSec?: number;
  chapters?: ChapterType[];
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
}
export interface VideoProviderProps extends VideoPropTypes {
  children: ReactNode;
}

export interface PlayerStateType {
  isVideoLoaded: boolean;
  playing: boolean;
  startOnPlay: boolean;
  buffering: boolean;
  duration: number | null;
  currentTime: number;
  pip: boolean;
  isFullScreen: boolean;
  loaded: [startTime: number, endTime: number][]; //  each array's first item is start of buffered & last item is end of buffered
  volume: number; //  value -> 0-1
  muted: boolean;
  isControlVisible: boolean;
  isSettingOpen: boolean;
  settingItemOpen: "caption" | "playbackSpeed" | "quality" | null;
  currentSource: SourceItemType | null;
  isSourceAutoSelected: boolean;
  currentPlayback: PlaybackType;
  currentCaption: CaptionType | null;
  currentCaptionData: SubtitleItemType[] | null;
  currentChapter: ChapterType | null;
  nextChapterStartAt: number | null;
  isChapterOverLayOpen: boolean;
  prevPlayerHeight?: number;
  // videoAspectRatio: number;
  // FullScreenType: ScreenFullTypeEnum;
}
