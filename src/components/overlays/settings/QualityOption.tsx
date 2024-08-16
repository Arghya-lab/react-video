import React from "react";
import { useVideo } from "../../Provider/VideoProvider";
import { SourceItemType } from "../../../@types";

function QualityOption() {
  const { videoRef, source, playerState, setPlayerState, onQualityChange } =
    useVideo();

  if (!(source instanceof Array)) return null;

  const handleBack = () => {
    setPlayerState((prev) => ({ ...prev, settingItemOpen: null }));
  };

  const handleQualityChange = (sourceItem: SourceItemType) => {
    if (videoRef && videoRef.current) {
      if (videoRef.current.src !== sourceItem.src) {
        const video = videoRef.current;
        const previouslyPlayingAt = playerState.currentTime;
        const isPreviouslyPlaying = playerState.playing;

        video.src = sourceItem.src;
        if (isPreviouslyPlaying) video.play();
        video.currentTime = previouslyPlayingAt;

        onQualityChange(sourceItem);
        setPlayerState((prev) => ({
          ...prev,
          currentSource: sourceItem,
          isSourceAutoSelected: false,
          loaded: [],
          settingItemOpen: null,
        }));
      } else {
        handleBack();
      }
    }
  };

  return (
    <>
      <div className="setting-option-header" onClick={handleBack}>
        Quality
      </div>
      <div className="setting-option-choice-container">
        {source.map((sourceItem) => (
          <div
            key={sourceItem.quality}
            className="setting-option-choice"
            onClick={() => handleQualityChange(sourceItem)}
          >
            <span>{sourceItem.quality}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default QualityOption;
