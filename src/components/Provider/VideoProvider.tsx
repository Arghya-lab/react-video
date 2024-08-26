import React, {
  createContext,
  forwardRef,
  ForwardRefRenderFunction,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  RefObject,
  useContext,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import screenfull from "screenfull";
import { isDesktop } from "react-device-detect";
import {
  PlayerStateType,
  VideoPropTypes,
  VideoProviderProps,
} from "../../@types/video";
import { VideoContextType } from "../../@types/context";
import { controlVisibleDuration, defaultPlayerState } from "../../lib/constant";
import "./main.scss";

const VideoContext = createContext<VideoContextType>({
  videoRef: null,
  videoContainerRef: null,
  source: null,
  autoPlay: false,
  controls: true,
  loop: false,
  videoSkipSec: 10,
  className: "",
  height: 480,
  width: 854,
  playerState: defaultPlayerState,
  controlVisibleTill: null,
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

// Define the component using ForwardRefRenderFunction
const VideoProviderFunction: ForwardRefRenderFunction<
  HTMLVideoElement,
  VideoProviderProps
> = (
  {
    children,
    source,
    defaultQuality,
    autoPlay = false,
    controls = true,
    loop = false,
    captions,
    videoSkipSec = 10,
    chapters,
    showSkipableChapter = false,
    loadingPoster = undefined,
    infoText,
    fullscreenOnlyInfoText,
    className = "",
    height = 480,
    width = 854,
    style,
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
  }: { children: ReactNode } & VideoPropTypes,
  ref
) => {
  const videoRef =
    (ref as RefObject<HTMLVideoElement>) || useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const controlVisibleTill = useRef(controlVisibleDuration);
  const [playerState, setPlayerState] =
    useState<PlayerStateType>(defaultPlayerState);

  const handlePlayPaused = () => {
    if (videoRef.current) {
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
    const topVideoLayer = document.querySelector(".mobileControl-container");

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
      } else if (isDesktop && topVideoLayer?.contains(e.target as Node)) {
        handlePlayPaused();
      }
    }
  };

  const handleDoubleClick = (e: MouseEvent) => {
    const topVideoLayer = document.querySelector(".mobileControl-container");

    if (
      !screenfull.isFullscreen &&
      videoContainerRef.current &&
      isDesktop &&
      topVideoLayer?.contains(e.target as Node)
    ) {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      }

      screenfull.request(videoContainerRef.current);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((screen as any).orientation) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (screen as any).orientation?.lock("landscape");
      }
      setPlayerState((prev) => ({
        ...prev,
        isFullScreen: true,
        pip: false,
      }));
    }
  };

  return (
    <VideoContext.Provider
      value={{
        videoRef,
        videoContainerRef,
        source,
        defaultQuality,
        autoPlay,
        controls,
        captions,
        videoSkipSec,
        chapters,
        showSkipableChapter,
        infoText,
        fullscreenOnlyInfoText,
        className,
        height,
        width,
        style,
        playerState,
        controlVisibleTill,
        setPlayerState,
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
        style={{ height, width, ...style }}
        className={classNames("video-container", className, {
          "full-screen": playerState.isFullScreen,
        })}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        {source ? (
          <>
            <video
              ref={videoRef}
              style={{ width: "100%" }}
              autoPlay={autoPlay}
              controls={controls === "html5"}
              loop={loop}
              poster={loadingPoster}
            >
              {captions &&
                captions.map((caption) => (
                  <track
                    key={caption.srclang}
                    kind="subtitles"
                    srcLang={caption.srclang}
                    src={caption.src}
                  />
                ))}
            </video>
            {children}
          </>
        ) : null}
      </div>
    </VideoContext.Provider>
  );
};

// Use forwardRef to create a component that supports refs
export const VideoProvider = forwardRef(VideoProviderFunction);

// Set displayName for easier debugging
VideoProvider.displayName = "ReactVideo";
