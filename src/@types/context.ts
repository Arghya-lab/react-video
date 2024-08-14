import { Dispatch, RefObject, SetStateAction } from "react";
import { PlayerStateType, VideoPropTypes } from "./video";

export interface VideoContextType extends VideoPropTypes {
  videoRef: RefObject<HTMLVideoElement> | null;
  videoContainerRef: RefObject<HTMLDivElement> | null;
  playerState: PlayerStateType;
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
  onDuration: (duration: number | null) => void;
  onProgress: (duration: number) => void;
}
