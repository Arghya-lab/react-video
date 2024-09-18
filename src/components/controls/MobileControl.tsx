import { BackwardIcon, ForwardIcon, PauseIcon, PlayIcon } from "../icons";
import { isMobile } from "react-device-detect";
import { useVideo } from "../Provider/VideoProvider";
import classNames from "classnames";
import { controlVisibleDuration } from "../../lib/constant";

function MobileControl() {
  const {
    videoRef,
    playerState,
    handlePlayPaused,
    videoSkipSec,
    controlVisibleTill,
  } = useVideo();

  const handleSkipForward = () => {
    if (videoRef && videoRef.current) {
      if (controlVisibleTill) {
        controlVisibleTill.current =
          videoRef.current.currentTime + videoSkipSec + controlVisibleDuration;
      }

      videoRef.current.currentTime =
        videoRef.current.currentTime + videoSkipSec;
    }
  };

  const handleSkipBack = () => {
    if (videoRef && videoRef.current) {
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
      className={classNames(
        { visible: playerState.isControlVisible },
        { hidden: !playerState.isControlVisible },
        "mobile-control-container"
      )}
    >
      {isMobile && (
        <button onClick={handleSkipBack}>
          <BackwardIcon size={36} />
        </button>
      )}
      {(isMobile || !playerState.playing) && (
        <button
          onClick={handlePlayPaused}
          className={classNames("play-btn-center", {
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
        <button onClick={handleSkipForward}>
          <ForwardIcon size={36} />
        </button>
      )}
    </div>
  );
}

export default MobileControl;
