export type SourceArray = { quality?: string | number; src: string }[];

export type SourceType = string | SourceArray | null;

export interface VideoPropTypes {
  source: SourceType;
  defaultQuality?: string | number;
  autoPlay?: boolean;
  onReady?: () => any;
  onStart?: () => any;
  onPlay?: () => any;
  onBuffer?: () => any;
  onBufferEnd?: () => any;
  onPause?: () => any;
  onSeek?: () => any;
  onEnded?: () => any;
  onError?: () => any;
  onEnablePIP?: () => any;
  onDisablePIP?: () => any;
  onDuration?: (duration: null | number) => any;
  onProgress?: (duration: number) => any;
  // onPlaybackRateChange: ()=>any,
  // onPlaybackQualityChange: ()=>any,
  // onClickPreview: ()=>any,
  handlePlayPaused: () => any;
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

interface playPauseAction {
  type: "playDideo";
}

export type PlayerActionType = playPauseAction;
