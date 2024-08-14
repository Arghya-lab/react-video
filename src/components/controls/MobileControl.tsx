import React from "react";
import { NextIcon, PauseIcon, PlayIcon, PrevIcon } from "../icons";
import "./mobileControl.scss";
import { isMobile } from "react-device-detect";
import { useVideo } from "../Provider/VideoProvider";

function MobileControl() {
  const { playerState, handlePlayPaused } = useVideo();
  return (
    <div className="mobileControl-container">
      {isMobile && (
        <button>
          <PrevIcon size={36} />
        </button>
      )}
      {(isMobile || !playerState.playing) && (
        <button onClick={handlePlayPaused}>
          {playerState.playing ? <PauseIcon size={36} /> : <PlayIcon size={36} />}
        </button>
      )}
      {isMobile && (
        <button>
          <NextIcon size={36} />
        </button>
      )}
    </div>
  );
}

export default MobileControl;
