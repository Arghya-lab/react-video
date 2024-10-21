import { isMobile } from "react-device-detect";
import { useVideo } from "../Provider/VideoProvider";
import classNames from "classnames";
import { controlVisibleDuration } from "../../lib/constant";
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerTrackNextFilled,
  IconPlayerTrackPrevFilled,
} from "@tabler/icons-react";

function MobileControl() {
  const {
    videoRef,
    playerState,
    handlePlayPaused,
    videoSkipSec,
    controlVisibleTill,
  } = useVideo();

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

  return (
    <div
      id="mobile-control-container"
      className={classNames(
        { visible: playerState.isControlVisible },
        { hidden: !playerState.isControlVisible }
      )}
    >
      {isMobile && (
        <button className="rv-btn" onClick={handleSkipBack}>
          <IconPlayerTrackPrevFilled size={36} />
        </button>
      )}
      {isMobile ||
        (!playerState.playing && (
          <button
            id="play-btn-center"
            onClick={handlePlayPaused}
            className={classNames("rv-btn", {
              buffering: playerState.buffering && playerState.playing,
            })}
          >
            {playerState.playing ? (
              <IconPlayerPauseFilled
                size={playerState.isFullScreen ? 56 : 36}
              />
            ) : (
              <IconPlayerPlayFilled size={playerState.isFullScreen ? 56 : 36} />
            )}
          </button>
        ))}
      {isMobile && (
        <button className="rv-btn" onClick={handleSkipForward}>
          <IconPlayerTrackNextFilled size={36} />
        </button>
      )}
    </div>
  );
}

export default MobileControl;
