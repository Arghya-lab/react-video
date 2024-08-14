import React, { createContext, ReactNode, useContext, useRef, useState } from "react";
import { PlayerStateType, VideoPropTypes } from "../../@types/video";
import { VideoContextType } from "../../@types/context";
import { isMobile } from "react-device-detect";

const defaultPlayerState: PlayerStateType = {
  // isReady: false,
  playing: false,
  startOnPlay: true,
  buffering: false,
  duration: 0,
  currentTime: 0,
  pip: false,
  isFullScreen: false,
  loaded: [],
  volume: isMobile ? 1 : 0.85, //  value -> 0-1
  muted: false,
  // light: false,
  // playbackRate: 1.0,
  // loop: false,
  // sources: [],
  // currentSource: null,
  // playbackQuality: playbackQuality || "360p",
  // videoAspectRatio: 16 / 9,
  // FullScreenType: 0, // value -> 0=>>default 1=>>maxWidth 2=>>16:9
  // isMobileDevice: isMobileDevice(),
  // controllerVisibility: true,
  // skipTimes: [],
  // isQualitySelectionOpen: false,
  // isSettingSectionOpen: false,
};

const VideoContext = createContext<VideoContextType>({
  videoRef: null,
  videoContainerRef: null,
  playerState: defaultPlayerState,
  setPlayerState: () => {},
  source: null,
  defaultQuality: undefined,
  autoPlay: false,
  onReady: () => {},
  onStart: () => {},
  onPlay: () => {},
  onBuffer: () => {},
  onBufferEnd: () => {},
  onPause: () => {},
  onSeek: () => {},
  onEnded: () => {},
  onError: () => {},
  onEnablePIP: () => {},
  onDisablePIP: () => {},
  onDuration: () => {},
  onProgress: () => {},
  handlePlayPaused: () => {},
});

export const useVideo = () => useContext(VideoContext);

export function VideoProvider({
  children,
  source,
  defaultQuality,
  autoPlay = false,
  onReady = () => {},
  onStart = () => {},
  onPlay = () => {},
  onBuffer = () => {},
  onBufferEnd = () => {},
  onPause = () => {},
  onSeek = () => {},
  onEnded = () => {},
  onError = () => {},
  onEnablePIP = () => {},
  onDisablePIP = () => {},
  onDuration = () => {},
  onProgress = () => {},
}: { children: ReactNode } & VideoPropTypes) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const [playerState, setPlayerState] = useState<PlayerStateType>(defaultPlayerState);

  const handlePlayPaused = () => {
    if (videoRef && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setPlayerState((prev) => ({ ...prev, playing: true }));
      } else {
        videoRef.current.pause();
        setPlayerState((prev) => ({ ...prev, playing: false }));
      }
    }
  };

  return (
    <VideoContext.Provider
      value={{
        videoRef,
        videoContainerRef,
        playerState,
        setPlayerState,
        source,
        defaultQuality,
        autoPlay,
        onReady,
        onStart,
        onPlay,
        onBuffer,
        onBufferEnd,
        onPause,
        onSeek,
        onEnded,
        onError,
        onEnablePIP,
        onDisablePIP,
        onDuration,
        onProgress,
        handlePlayPaused,
      }}
    >
      {source ? (
        <div ref={videoContainerRef} className="video-container">
          <video ref={videoRef} style={{ width: "100%" }} autoPlay={autoPlay} />
          {children}
        </div>
      ) : null}
    </VideoContext.Provider>
  );
}
