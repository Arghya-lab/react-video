import { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";
import { PlayerStateType, SourceItemType, VideoPropTypes } from "./video";

export interface VideoContextType extends VideoPropTypes {
  videoRef: RefObject<HTMLVideoElement> | null;
  videoContainerRef: RefObject<HTMLDivElement> | null;
  autoPlay: boolean;
  videoSkipSec: number;
  className?: string;
  playerState: PlayerStateType;
  controlVisibleTill: MutableRefObject<number> | null;
  setPlayerState: Dispatch<SetStateAction<PlayerStateType>>;
  onReady: () => void;
  onStart: () => void;
  onPlay: () => void;
  onBuffer: () => void;
  onBufferEnd: () => void;
  onPause: () => void;
  onSeek: () => void;
  onEnded: () => void;
  onError: () => void;
  onEnablePIP: () => void;
  onDisablePIP: () => void;
  onProgress: ({
    currentTime,
    buffered,
  }: {
    currentTime: number;
    buffered: TimeRanges;
  }) => void;
  onPlaybackRateChange: (playbackSpeed: number) => void;
  onQualityChange: (sourceItem: SourceItemType) => void;
  handlePlayPaused?: () => void;
}
