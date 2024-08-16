import React, {
  createContext,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import {
  PlaybackType,
  PlayerStateType,
  VideoPropTypes,
} from "../../@types/video";
import { VideoContextType } from "../../@types/context";
import { isMobile } from "react-device-detect";
import classNames from "classnames";

export const playbackSpeeds: PlaybackType[] = [
  { text: "0.25x", playbackRate: 0.25 },
  { text: "0.5x", playbackRate: 0.5 },
  { text: "0.75x", playbackRate: 0.75 },
  { text: "Default", playbackRate: 1.0 },
  { text: "1.25x", playbackRate: 1.25 },
  { text: "1.5x", playbackRate: 1.5 },
  { text: "1.75x", playbackRate: 1.75 },
  { text: "2.0x", playbackRate: 2.0 },
];

export const defaultPlayerState: PlayerStateType = {
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
  isControlVisible: true,
  isSettingOpen: false,
  settingItemOpen: null,
  currentSource: null,
  isSourceAutoSelected: true,
  currentPlayback: playbackSpeeds.find(
    (playbackSpeed) => playbackSpeed.text === "Default"
  )!,
  // isReady: false,
  // light: false,
  // loop: false,
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
  source: null,
  defaultQuality: undefined,
  autoPlay: false,
  videoSkipSec: 10,
  className: "",
  playerState: defaultPlayerState,
  setPlayerState: () => {},
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
  onPlaybackRateChange: () => {},
  onQualityChange: () => {},
  handlePlayPaused: () => {},
});

export const useVideo = () => useContext(VideoContext);

export function VideoProvider({
  children,
  source,
  defaultQuality,
  autoPlay = false,
  videoSkipSec = 10,
  className = "",
  height = 480,
  width = 854,
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
  onPlaybackRateChange = () => {},
  onQualityChange = () => {},
}: { children: ReactNode } & VideoPropTypes) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const [playerState, setPlayerState] =
    useState<PlayerStateType>(defaultPlayerState);

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

  const handleClick: MouseEventHandler = (e: MouseEvent) => {
    // if setting overlay is open then hide and if click on button then show
    const settingBtn = document.getElementById("setting-button");
    const settingContainer = document.getElementById("setting-container");

    if (!(settingContainer && settingContainer.contains(e.target as Node))) {
      if (
        !playerState.isSettingOpen &&
        settingBtn &&
        settingBtn.contains(e.target as Node)
      ) {
        setPlayerState((prev) => ({ ...prev, isSettingOpen: true }));
      } else if (playerState.isSettingOpen) {
        setPlayerState((prev) => ({
          ...prev,
          isSettingOpen: false,
          settingItemOpen: null,
        }));
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
        videoSkipSec,
        className,
        height,
        width,
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
        onPlaybackRateChange,
        onQualityChange,
        handlePlayPaused,
      }}
    >
      <div
        ref={videoContainerRef}
        style={{ height, width }}
        className={classNames("video-container", className, {
          "full-screen": playerState.isFullScreen,
        })}
        onClick={handleClick}
      >
        {source ? (
          <>
            <video
              ref={videoRef}
              style={{ width: "100%" }}
              autoPlay={autoPlay}
            />
            {children}
          </>
        ) : null}
      </div>
    </VideoContext.Provider>
  );
}
