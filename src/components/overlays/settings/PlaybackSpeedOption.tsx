import React from "react";
import { useVideo } from "../../Provider/VideoProvider";
import { PlaybackType } from "../../../@types";
import { playbackSpeeds } from "../../../lib/constant";

function PlaybackSpeedOption() {
  const { setPlayerState, videoRef, onPlaybackRateChange } = useVideo();

  const handleChangePlaybackRate = (playback: PlaybackType) => {
    if (videoRef && videoRef.current) {
      videoRef.current.playbackRate = playback.playbackRate;

      onPlaybackRateChange(playback.playbackRate);
      setPlayerState((prev) => ({
        ...prev,
        currentPlayback: playback,
        settingItemOpen: null,
      }));
    }
  };

  return (
    <>
      <div
        className="setting-option-header"
        onClick={() =>
          setPlayerState((prev) => ({ ...prev, settingItemOpen: null }))
        }
      >
        Playback speed
      </div>
      <div className="setting-option-choice-container">
        {playbackSpeeds.map((playback) => (
          <div
            key={playback.playbackRate}
            className="setting-option-choice"
            onClick={() => handleChangePlaybackRate(playback)}
          >
            <span>{playback.text}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default PlaybackSpeedOption;
