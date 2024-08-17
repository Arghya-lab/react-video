import React, {
  createContext,
  forwardRef,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  RefObject,
  useContext,
  useRef,
  useState,
} from "react";
import { PlayerStateType, VideoPropTypes } from "../../@types/video";
import { VideoContextType } from "../../@types/context";
import classNames from "classnames";
import { controlVisibleDuration, defaultPlayerState } from "../../lib/constant";
import { SubtitleItemType } from "../../lib/fetchAndParseCaption";

const VideoContext = createContext<VideoContextType>({
  videoRef: null,
  videoContainerRef: null,
  source: null,
  defaultQuality: undefined,
  autoPlay: false,
  controls: true,
  videoSkipSec: 10,
  className: "",
  playerState: defaultPlayerState,
  controlVisibleTill: null,
  captionData: null,
  setPlayerState: () => {},
  setCaptionData: () => {},
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

export const VideoProvider = forwardRef<
  HTMLVideoElement,
  { children: ReactNode } & VideoPropTypes
>(
  (
    {
      children,
      source,
      defaultQuality,
      autoPlay = false,
      controls = true,
      captions = undefined,
      videoSkipSec = 10,
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
      handlePlayPaused = () => {},
    }: { children: ReactNode } & VideoPropTypes,
    ref
  ) => {
    const videoRef =
      (ref as RefObject<HTMLVideoElement>) || useRef<HTMLVideoElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const controlVisibleTill = useRef(controlVisibleDuration);
    const [captionData, setCaptionData] = useState<SubtitleItemType[] | null>(
      null
    );

    const [playerState, setPlayerState] =
      useState<PlayerStateType>(defaultPlayerState);

    handlePlayPaused = () => {
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
          source,
          defaultQuality,
          autoPlay,
          controls,
          captions,
          videoSkipSec,
          className,
          height,
          width,
          style,
          playerState,
          controlVisibleTill,
          captionData,
          setPlayerState,
          setCaptionData,
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
        >
          {source ? (
            <>
              <video
                ref={videoRef}
                style={{ width: "100%" }}
                autoPlay={autoPlay}
                controls={controls === "html5"}
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
  }
);

VideoProvider.displayName = "ReactVideo";
