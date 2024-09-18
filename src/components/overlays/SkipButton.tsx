import tinycolor from "tinycolor2";
import classNames from "classnames";
import { useVideo } from "../Provider/VideoProvider";

function SkipButton() {
  const { videoRef, playerState } = useVideo();

  if (
    playerState.currentChapter?.skipAble &&
    playerState.currentChapter.startTime + 5 > playerState.currentTime
  ) {
    return (
      <button
        className={classNames("skip-button", {
          "control-visible": playerState.isControlVisible,
        })}
        style={{
          borderColor: playerState.currentChapter.color,
          backgroundColor: tinycolor(playerState.currentChapter.color || "#fff")
            .setAlpha(0.2)
            .toRgbString(),
        }}
        onClick={() => {
          if (videoRef?.current && playerState.currentChapter)
            videoRef.current.currentTime = playerState.currentChapter.endTime;
        }}
      >
        skip {playerState.currentChapter.name}
      </button>
    );
  }

  return null;
}

export default SkipButton;
