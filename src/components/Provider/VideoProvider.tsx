import {
  createContext,
  forwardRef,
  MouseEvent,
  MouseEventHandler,
  useImperativeHandle,
  useContext,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import screenfull from "screenfull";
import { isDesktop } from "react-device-detect";
import { PlayerStateType, VideoProviderProps } from "../../@types/video";
import { VideoContextType } from "../../@types/context";
import { controlVisibleDuration, defaultPlayerState } from "../../lib/constant";

const VideoContext = createContext<VideoContextType>({
  videoRef: null,
  videoContainerRef: null,
  source: null,
  autoPlay: false,
  controls: true,
  loop: false,
  videoSkipSec: 10,
  className: "",
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
  onProgress: () => {},
  onPlaybackRateChange: () => {},
  onQualityChange: () => {},
  handlePlayPaused: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useVideo = () => useContext(VideoContext);

// Define the component using ForwardRefRenderFunction
export const VideoProvider = forwardRef<HTMLVideoElement, VideoProviderProps>(
  (
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
      onProgress = () => {},
      onPlaybackRateChange = () => {},
      onQualityChange = () => {},
    }: VideoProviderProps,
    ref
  ) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    // const videoRef = ref || defaultVideoRef;
    useImperativeHandle(ref, () => videoRef.current!, []);
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
      const topVideoLayer = document.querySelector("#mobile-control-container");
      const centerPlatBtn = document.querySelector("#play-btn-center");

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
        } else if (centerPlatBtn?.contains(e.target as Node)) {
          return;
        } else if (isDesktop && topVideoLayer?.contains(e.target as Node)) {
          handlePlayPaused();
        }
      }
    };

    const handleDoubleClick = (e: MouseEvent) => {
      const topVideoLayer = document.querySelector("#mobile-control-container");
      const centerPlatBtn = document.querySelector("#play-btn-center");

      if (centerPlatBtn?.contains(e.target as Node)) {
        return;
      } else if (
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
          loadingPoster,
          fullscreenOnlyInfoText,
          className,
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
          onProgress,
          onPlaybackRateChange,
          onQualityChange,
          handlePlayPaused,
        }}
      >
        <div
          ref={videoContainerRef}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          style={{
            width,
            ...style,
            height: playerState.isVideoLoaded
              ? undefined
              : playerState.prevPlayerHeight,
          }}
          id="react-video-container"
          className={classNames("video-container", className, {
            "full-screen": playerState.isFullScreen,
            "video-loaded": playerState.isVideoLoaded,
          })}
        >
          {source ? (
            <>
              <video
                ref={videoRef}
                autoPlay={autoPlay}
                controls={controls === "html5"}
                loop={loop}
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

// Set displayName for easier debugging
VideoProvider.displayName = "ReactVideo";
