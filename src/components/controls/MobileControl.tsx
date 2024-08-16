import React from "react";
import { BackwardIcon, ForwardIcon, PauseIcon, PlayIcon } from "../icons";
import { isMobile } from "react-device-detect";
import { useVideo } from "../Provider/VideoProvider";
import classNames from "classnames";
import "./mobileControl.scss";

function MobileControl() {
  const { videoRef, playerState, handlePlayPaused, videoSkipSec } = useVideo();
  return (
    <div
      className={classNames(
        { visible: playerState.isControlVisible },
        { hidden: !playerState.isControlVisible },
        "mobileControl-container"
      )}
    >
      {isMobile && (
        <button
          onClick={() => {
            if (videoRef && videoRef.current) {
              videoRef.current.currentTime =
                videoRef.current.currentTime - videoSkipSec;
            }
          }}
        >
          <BackwardIcon size={36} />
        </button>
      )}
      {(isMobile || !playerState.playing) && (
        <button
          onClick={handlePlayPaused}
          className={classNames({
            buffering: playerState.buffering && playerState.playing,
          })}
        >
          {playerState.playing ? (
            <PauseIcon size={36} />
          ) : (
            <PlayIcon size={36} />
          )}
        </button>
      )}
      {isMobile && (
        <button
          onClick={() => {
            if (videoRef && videoRef.current) {
              videoRef.current.currentTime =
                videoRef.current.currentTime + videoSkipSec;
            }
          }}
        >
          <ForwardIcon size={36} />
        </button>
      )}
    </div>
  );
}

export default MobileControl;
