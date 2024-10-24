import { useEffect, useRef, useState } from "react";
import secToMinSec from "../../lib/secToMinSec";
import { useVideo } from "../Provider/VideoProvider";
import screenFull from "screenfull";
import ProgressBar from "./ProgressBar";
import { isMobile } from "react-device-detect";
import classNames from "classnames";
import { controlVisibleDuration } from "../../lib/constant";
import TooltipWrapper from "./TooltipWrapper";
import Slider from "./Slider";
import {
  IconMaximize,
  IconMinimize,
  IconPictureInPictureOff,
  IconPictureInPictureOn,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerTrackNextFilled,
  IconPlayerTrackPrevFilled,
  IconSettingsFilled,
  IconVolume,
  IconVolume2,
  IconVolume3,
} from "@tabler/icons-react";

function Controls() {
  const {
    controls,
    videoRef,
    videoSkipSec,
    chapters,
    playerState,
    controlVisibleTill,
    setPlayerState,
    videoContainerRef,
    handlePlayPaused,
  } = useVideo();
  const volumeContainerRef = useRef<HTMLDivElement>(null);
  const [volumeUpdate, setVolumeUpdate] = useState(0);
  const [isReverseTime, setIsReverseTime] = useState(false);

  const togglePip = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else if (videoRef?.current) {
      videoRef.current.requestPictureInPicture();
    }
  };

  const toggleFullScreen = () => {
    if (
      videoContainerRef &&
      videoContainerRef.current &&
      screenFull.isEnabled
    ) {
      if (screenFull.isFullscreen) {
        screenFull.exit();
        if (screen.orientation) screen.orientation.unlock();

        setPlayerState((prev) => ({ ...prev, isFullScreen: false }));
      } else {
        if (document.pictureInPictureElement) {
          document.exitPictureInPicture();
        }

        screenFull.request(videoContainerRef.current);
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
    }
  };

  const handleVolumeChange = (value: number) => {
    if (videoRef?.current && !playerState.muted) {
      const volume = Math.max(0, Math.min(1, value / 10));
      videoRef.current.volume = volume;
      setPlayerState((prev) => ({ ...prev, volume }));
    }
  };

  const toggleMute = () => {
    if (videoRef?.current) {
      const muted = !playerState.muted;
      videoRef.current.muted = muted;
      setPlayerState((prev) => ({ ...prev, muted }));
    }
  };

  const handleSkipForward = () => {
    if (videoRef?.current) {
      if (controlVisibleTill) {
        controlVisibleTill.current =
          videoRef.current.currentTime + videoSkipSec + controlVisibleDuration;
      }

      videoRef.current.currentTime =
        videoRef.current.currentTime + videoSkipSec;
    }
  };

  const handleSkipBack = () => {
    if (videoRef?.current) {
      if (controlVisibleTill) {
        controlVisibleTill.current =
          videoRef.current.currentTime - videoSkipSec + controlVisibleDuration;
      }

      videoRef.current.currentTime =
        videoRef.current.currentTime - videoSkipSec;
    }
  };

  useEffect(() => {
    const handlePlayerKeyPress = (e: KeyboardEvent) => {
      if (isMobile) return;
      const tagName = document.activeElement?.tagName.toLowerCase();
      if (tagName === "input") return;
      if (!videoRef?.current) return;

      e.preventDefault();
      switch (e.key.toLowerCase()) {
        case " ":
          if (tagName === "button") return;
          if (handlePlayPaused) handlePlayPaused();
          break;
        case "k":
          if (handlePlayPaused) handlePlayPaused();
          break;
        case "arrowright":
        case "l":
          handleSkipForward();
          break;
        case "arrowleft":
        case "j":
          handleSkipBack();
          break;
        case "f":
          toggleFullScreen();
          break;
        case "p":
          togglePip();
          break;
        case "m":
          toggleMute();
          break;
        case "Escape":
          if (screenFull.isFullscreen) {
            screenFull.exit();
            if (screen.orientation) screen.orientation.unlock();
            setPlayerState((prev) => ({ ...prev, isFullScreen: false }));
          }
          break;
        case "arrowup":
          handleVolumeChange((videoRef.current.volume + 0.2) * 10);
          break;
        case "arrowdown":
          handleVolumeChange((videoRef.current.volume - 0.2) * 10);
          break;
        case "0":
          videoRef.current.currentTime = (videoRef.current.duration * 0) / 10;
          break;
        case "1":
          videoRef.current.currentTime = (videoRef.current.duration * 1) / 10;
          break;
        case "2":
          videoRef.current.currentTime = (videoRef.current.duration * 2) / 10;
          break;
        case "3":
          videoRef.current.currentTime = (videoRef.current.duration * 3) / 10;
          break;
        case "4":
          videoRef.current.currentTime = (videoRef.current.duration * 4) / 10;
          break;
        case "5":
          videoRef.current.currentTime = (videoRef.current.duration * 5) / 10;
          break;
        case "6":
          videoRef.current.currentTime = (videoRef.current.duration * 6) / 10;
          break;
        case "7":
          videoRef.current.currentTime = (videoRef.current.duration * 7) / 10;
          break;
        case "8":
          videoRef.current.currentTime = (videoRef.current.duration * 8) / 10;
          break;
        case "9":
          videoRef.current.currentTime = (videoRef.current.duration * 9) / 10;
          break;
        default:
          break;
      }
    };

    const handleScroll = (e: WheelEvent) => {
      const isOverSlider =
        volumeContainerRef.current &&
        volumeContainerRef.current.contains(e.target as Node);
      if (isOverSlider) {
        e.preventDefault(); // Prevent default scroll behavior

        if (videoRef?.current && !playerState.muted) {
          setVolumeUpdate((prev) => (prev + e.deltaY < 0 ? 0.1 : -0.1));
        }
      }
    };

    document.addEventListener("keydown", handlePlayerKeyPress);
    window.addEventListener("wheel", handleScroll, { passive: false }); // Add passive: false to prevent default scroll
    return () => {
      document.removeEventListener("keydown", handlePlayerKeyPress);
      window.removeEventListener("wheel", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    handleSkipBack,
    handlePlayPaused,
    handleSkipForward,
    handleVolumeChange,
    toggleFullScreen,
    toggleMute,
    togglePip,
    setPlayerState,
    videoRef,
  ]);

  useEffect(() => {
    if (videoRef?.current && !playerState.muted) {
      const volume = Math.max(
        0,
        Math.min(1, playerState.volume + volumeUpdate)
      );

      videoRef.current.volume = volume;
      if (controlVisibleTill) {
        controlVisibleTill.current =
          videoRef.current.currentTime + controlVisibleDuration;
      }
      setPlayerState((prev) => ({ ...prev, volume, isControlVisible: true }));
      setVolumeUpdate(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volumeUpdate, controlVisibleTill, setPlayerState, videoRef]);

  if (!controls) return null;

  return (
    <>
      <span
        className={classNames("background-overlay", {
          visible: !playerState.playing,
        })}
      />
      <div
        className={classNames(
          {
            visible: playerState.isControlVisible,
            hidden: !playerState.isControlVisible,
          },
          "video-bottom-control-container"
        )}
      >
        <ProgressBar />
        <div className="controls">
          {!isMobile && (
            <>
              <TooltipWrapper
                position="top-right"
                toolTip={playerState.playing ? "Pause" : "Play"}
              >
                <button
                  id="play-pause-btn"
                  className="rv-btn"
                  onClick={handlePlayPaused}
                >
                  {playerState.playing ? (
                    <IconPlayerPauseFilled />
                  ) : (
                    <IconPlayerPlayFilled />
                  )}
                </button>
              </TooltipWrapper>
              <div ref={volumeContainerRef} className="volume-container">
                <TooltipWrapper toolTip={playerState.muted ? "Unmute" : "Mute"}>
                  <button
                    id="volume-btn"
                    className="rv-btn"
                    onClick={toggleMute}
                  >
                    {playerState.muted || playerState.volume === 0 ? (
                      <IconVolume3 />
                    ) : playerState.volume < 0.5 ? (
                      <IconVolume2 />
                    ) : (
                      <IconVolume />
                    )}
                  </button>
                </TooltipWrapper>
                <Slider
                  className="volume-slider-root"
                  trackClassName="volume-slider-track"
                  rangeClassName="volume-slider-range"
                  thumbClassName="volume-slider-thumb"
                  max={10}
                  step={1}
                  value={[playerState.muted ? 0 : playerState.volume * 10]}
                  onValueChange={([val]) => handleVolumeChange(val)}
                />
              </div>
            </>
          )}
          <div
            className="duration-container"
            onClick={() => setIsReverseTime((prev) => !prev)}
          >
            <span>
              {isReverseTime
                ? secToMinSec(
                    playerState.currentTime - (playerState.duration || 0)
                  )
                : secToMinSec(playerState.currentTime)}
            </span>
            /<span>{secToMinSec(playerState.duration || 0)}</span>
          </div>
          {chapters && chapters.length > 0 && (
            <p
              className={classNames("chapter-button", {
                "show-chapter-button": !playerState.currentChapter,
              })}
              onClick={() =>
                setPlayerState((prev) => ({
                  ...prev,
                  isChapterOverLayOpen: !prev.isChapterOverLayOpen,
                }))
              }
            >
              • {playerState.currentChapter?.name || "show chapters"}
              <svg height="20" viewBox="0 0 24 24" width="20">
                <path
                  d="M9.71 18.71l-1.42-1.42 5.3-5.29-5.3-5.29 1.42-1.42 6.7 6.71z"
                  fill="#fff"
                ></path>
              </svg>
            </p>
          )}
          <span style={{ flexGrow: 1 }} />
          <TooltipWrapper toolTip="Skip backward">
            <button className="rv-btn" onClick={handleSkipBack}>
              <IconPlayerTrackPrevFilled size={20} />
            </button>
          </TooltipWrapper>
          <TooltipWrapper toolTip="Skip forward">
            <button className="rv-btn" onClick={handleSkipForward}>
              <IconPlayerTrackNextFilled size={20} />
            </button>
          </TooltipWrapper>
          <TooltipWrapper toolTip="Setting">
            <button
              id="setting-button"
              className={classNames("setting-button rv-btn", {
                "setting-active": playerState.isSettingOpen,
              })}
            >
              <IconSettingsFilled />
            </button>
          </TooltipWrapper>
          {/* if browser support then show pip button */}
          {document.pictureInPictureEnabled && (
            <TooltipWrapper toolTip={playerState.pip ? "Exit Pip" : "Pip"}>
              <button className="rv-btn" onClick={togglePip}>
                {playerState.pip ? (
                  <IconPictureInPictureOff />
                ) : (
                  <IconPictureInPictureOn />
                )}
              </button>
            </TooltipWrapper>
          )}
          <TooltipWrapper
            toolTip={
              playerState.isFullScreen ? "Exit fullscreen" : "Full screen"
            }
            position="top-left"
          >
            <button className="rv-btn" onClick={toggleFullScreen}>
              {playerState.isFullScreen ? <IconMinimize /> : <IconMaximize />}
            </button>
          </TooltipWrapper>
        </div>
      </div>
    </>
  );
}

export default Controls;
