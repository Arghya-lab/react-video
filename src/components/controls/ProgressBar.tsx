import React, { useMemo, useRef, useState } from "react";
import ReactSlider from "react-slider";
import { useVideo } from "../Provider/VideoProvider";
import "./progressBar.scss";

function ProgressBar() {
  const { videoRef, playerState } = useVideo();
  const sliderRef = useRef<HTMLDivElement>(null);

  const [sliderValue, setSliderValue] = useState(0);

  useMemo(
    () =>
      setSliderValue(
        (playerState.currentTime / (playerState.duration || 0) || 0) * 1000
      ),
    [playerState.currentTime]
  );

  const handleChangeCurrentTime = (value: number, index: number) => {
    if (videoRef && videoRef.current) {
      setSliderValue(value);
      videoRef.current.currentTime =
        (value / 1000) * (videoRef.current.duration || 0);
    }
  };

  return (
    <div ref={sliderRef} className="slider-container">
      <ReactSlider
        className="horizontal-slider"
        trackClassName="slider-track"
        thumbClassName="slider-thumb"
        renderThumb={(props) => <div {...props} />}
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
            left: `${(loadedArea[0] / (playerState.duration || 0) || 0) * 100}%`,
            width: `${((loadedArea[1] - loadedArea[0]) / (playerState.duration || 0) || 0) * 100}%`,
          }}
        />
      ))}
    </div>
  );
}

export default ProgressBar;
