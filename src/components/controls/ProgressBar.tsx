import { useMemo, useRef, useState } from "react";
import ReactSlider from "react-slider";
import classNames from "classnames";
import { useVideo } from "../Provider/VideoProvider";
import { controlVisibleDuration } from "../../lib/constant";

function ProgressBar() {
  const {
    videoRef,
    playerState,
    controlVisibleTill,
    chapters,
    showSkipableChapter,
  } = useVideo();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderValue, setSliderValue] = useState(0);

  useMemo(() => {
    setSliderValue(
      (playerState.currentTime / (playerState.duration || 0) || 0) * 1000
    );
  }, [playerState.currentTime]);

  const handleChangeCurrentTime = (value: number) => {
    if (videoRef && videoRef.current) {
      const WishCT = (value / 1000) * (videoRef.current.duration || 0);

      if (controlVisibleTill) {
        controlVisibleTill.current = WishCT + controlVisibleDuration;
      }

      setSliderValue(value);
      videoRef.current.currentTime = WishCT;
    }
  };

  return (
    <div ref={sliderRef} className="slider-container">
      <ReactSlider
        className="horizontal-slider"
        trackClassName="slider-track"
        thumbClassName="slider-thumb"
        renderThumb={(props) => (
          // eslint-disable-next-line react/prop-types
          <div {...props} style={{ ...props?.style, zIndex: 20 }} />
        )}
        min={0}
        max={1000}
        value={sliderValue}
        onChange={handleChangeCurrentTime}
      />
      {playerState.loaded.map((loadedArea) => (
        <div
          key={`${loadedArea[0]}-${loadedArea[1]}`}
          className="loaded-progress"
          style={{
            left: `${
              (loadedArea[0] / (playerState.duration || 0) || 0) * 100
            }%`,
            width: `${
              ((loadedArea[1] - loadedArea[0]) / (playerState.duration || 0) ||
                0) * 100
            }%`,
          }}
        />
      ))}
      {chapters &&
        showSkipableChapter &&
        chapters.map((chapter) =>
          chapter.skipAble ? (
            <div
              key={chapter.name}
              className={classNames("chapter-bar", {
                "above-progress": playerState.currentTime > chapter.endTime,
              })}
              style={{
                left: `${
                  (chapter.startTime / (playerState.duration || 0) || 0) * 100
                }%`,
                width: `${
                  ((chapter.endTime - chapter.startTime) /
                    (playerState.duration || 0) || 0) * 100
                }%`,
                background: chapter.color,
              }}
            />
          ) : null
        )}
    </div>
  );
}

export default ProgressBar;
