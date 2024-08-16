import React, { useEffect, useRef, useState } from "react";
import {
  BackwardIcon,
  ForwardIcon,
  MaximizeIcon,
  MinimizeIcon,
  PauseIcon,
  PipIcon,
  PlayIcon,
  SettingIcon,
  VolumeHighIcon,
  VolumeLowIcon,
  VolumeMediumIcon,
  VolumeMuteIcon,
} from "../icons";
import secToMinSec from "../../lib/secToMinSec";
import { useVideo } from "../Provider/VideoProvider";
import screenFull from "screenfull";
import ProgressBar from "./ProgressBar";
import "./controls.scss";
import ReactSlider from "react-slider";
import { isMobile } from "react-device-detect";
import classNames from "classnames";

function Controls() {
  const {
    videoSkipSec,
    playerState,
    videoRef,
    setPlayerState,
    videoContainerRef,
    handlePlayPaused,
  } = useVideo();
  const volumeContainerRef = useRef<HTMLDivElement>(null);
  const [volumeUpdate, setVolumeUpdate] = useState(0);
  const [isReverseTime, setIsReverseTime] = useState(false);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      const isOverSlider =
        volumeContainerRef.current &&
        volumeContainerRef.current.contains(e.target as Node);
      if (isOverSlider) {
        e.preventDefault(); // Prevent default scroll behavior

        if (videoRef && videoRef.current && !playerState.muted) {
          setVolumeUpdate((prev) => (prev + e.deltaY < 0 ? 0.1 : -0.1));
        }
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false }); // Add passive: false to prevent default scroll
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (videoRef && videoRef.current && !playerState.muted) {
      const volume = Math.max(
        0,
        Math.min(1, playerState.volume + volumeUpdate)
      );

      videoRef.current.volume = volume;
      setPlayerState((prev) => ({ ...prev, volume }));
      setVolumeUpdate(0);
    }
  }, [volumeUpdate]);

  const togglePip = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else if (videoRef && videoRef.current) {
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
    if (videoRef && videoRef.current && !playerState.muted) {
      const volume = Math.max(0, Math.min(1, value / 10));
      videoRef.current.volume = volume;
      setPlayerState((prev) => ({ ...prev, volume }));
    }
  };

  const toggleMute = () => {
    if (videoRef && videoRef.current) {
      const muted = !playerState.muted;
      videoRef.current.muted = muted;
      setPlayerState((prev) => ({ ...prev, muted }));
    }
  };

  return (
    <div
      className={classNames(
        { visible: playerState.isControlVisible },
        { hidden: !playerState.isControlVisible },
        "video-bottom-control-container"
      )}
    >
      <ProgressBar />
      <div className="controls">
        {!isMobile && (
          <>
            <button onClick={handlePlayPaused}>
              {playerState.playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <div ref={volumeContainerRef} className="volume-container">
              <button onClick={toggleMute}>
                {playerState.muted || playerState.volume === 0 ? (
                  <VolumeMuteIcon fill />
                ) : playerState.volume < 0.33 ? (
                  <VolumeLowIcon fill />
                ) : playerState.volume < 0.67 ? (
                  <VolumeMediumIcon fill />
                ) : (
                  <VolumeHighIcon fill />
                )}
              </button>
              <ReactSlider
                className="horizontal-slider volume-slider"
                trackClassName="volume-track"
                thumbClassName="volume-thumb"
                renderThumb={(props) => <div {...props} />}
                min={0}
                max={10}
                value={playerState.muted ? 0 : playerState.volume * 10}
                onChange={handleVolumeChange}
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
        {/* TODO: Caption & playback speed support */}
        {/* <button className="captions-btn">
          <CaptionIcon />
          </button> */}
        {/* <button>1x</button> */}
        {/*{source instanceof Array &&
          source.length > 1 &&
          videoRef &&
          videoRef.current && (
            <button>
              <button onClick={handleChangeSource}>
              {source.map((sourceItem) => (
                <div key={sourceItem.quality}>{sourceItem.quality}</div>
              ))}
            </button>
          )} */}
        <button
          onClick={() => {
            if (videoRef && videoRef.current) {
              videoRef.current.currentTime =
                videoRef.current.currentTime - videoSkipSec;
            }
          }}
        >
          <BackwardIcon size={20} />
        </button>
        <button
          onClick={() => {
            if (videoRef && videoRef.current) {
              videoRef.current.currentTime =
                videoRef.current.currentTime + videoSkipSec;
            }
          }}
        >
          <ForwardIcon size={20} />
        </button>
        <button
          id="setting-button"
          className={classNames("setting-button", {
            "setting-active": playerState.isSettingOpen,
          })}
        >
          <SettingIcon fill />
        </button>
        <button onClick={togglePip}>
          <PipIcon isPip={playerState.pip} />
        </button>
        <button onClick={toggleFullScreen}>
          {playerState.isFullScreen ? <MinimizeIcon /> : <MaximizeIcon />}
        </button>
      </div>
    </div>
  );
}

export default Controls;
