import { Dispatch, RefObject, SetStateAction } from "react";
import { PlayerStateType, VideoPropTypes } from "./video";

export interface VideoContextType extends VideoPropTypes {
  videoRef: RefObject<HTMLVideoElement> | null;
  videoContainerRef: RefObject<HTMLDivElement> | null;
  playerState: PlayerStateType;
  setPlayerState: Dispatch<SetStateAction<PlayerStateType>>;
  onReady: () => any;
  onStart: () => any;
  onPlay: () => any;
  onBuffer: () => any;
  onBufferEnd: () => any;
  onPause: () => any;
  onSeek: () => any;
  onEnded: () => any;
  onError: () => any;
  onEnablePIP: () => any;
  onDisablePIP: () => any;
  onDuration: (duration: number | null) => any;
  onProgress: (duration: number) => any;
}
