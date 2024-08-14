export type SourceArray = { quality?: string | number; src: string }[];

export type SourceType = string | SourceArray | null;

export interface VideoPropTypes {
  source: SourceType;
  defaultQuality?: string | number;
  autoPlay?: boolean;
  onReady?: () => void;
  onStart?: () => void;
  onPlay?: () => void;
  onBuffer?: () => void;
  onBufferEnd?: () => void;
  onPause?: () => void;
  onSeek?: () => void;
  onEnded?: () => void;
  onError?: () => void;
  onEnablePIP?: () => void;
  onDisablePIP?: () => void;
  onDuration?: (duration: null | number) => void;
  onProgress?: (duration: number) => void;
  handlePlayPaused?: () => void;
  // onPlaybackRateChange: ()=>void,
  // onPlaybackQualityChange: ()=>void,
  // onClickPreview: ()=>void,
}

export interface PlayerStateType {
  // isReady: boolean;
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
  // url: string | null;
  // controls: boolean,
  // light: boolean,
  // playbackRate: number,
  // loop: boolean,
  // sources: AnimeStreamingLinkType[];
  // currentSource: AnimeStreamingLinkType | null;
  // playbackQuality: string;
  // videoAspectRatio: number;
  // FullScreenType: ScreenFullTypeEnum;
  // isMobileDevice: boolean;
  // controllerVisibility: boolean;
  // skipTimes: SkipTimeType[];
  // isQualitySelectionOpen: boolean;
  // isSettingSectionOpen: boolean;
}
