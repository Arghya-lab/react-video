import React from "react";
import { PlaybackSpeedIcon, QualityIcon } from "../../icons";
import { useVideo } from "../../Provider/VideoProvider";

function SettingOptions() {
  const { playerState, setPlayerState } = useVideo();

  return (
    <div className="setting-item-option">
      {/* Caption */}
      {/* <div
        className="setting-item"
        onClick={() =>
          setPlayerState((prev) => ({ ...prev, settingItemOpen: "caption" }))
        }
      >
        <div className="setting-item-icon">
          <CaptionIcon />
        </div>
        <div className="setting-item-label">
          <span>CC/Subtitles</span>
          <span className="setting-item-label-count"> (1)</span>
        </div>
        <div className="setting-active">Off</div>
      </div> */}
      {/* Playback speed */}
      <div
        className="setting-item"
        onClick={() =>
          setPlayerState((prev) => ({
            ...prev,
            settingItemOpen: "playbackSpeed",
          }))
        }
      >
        <div className="setting-item-icon">
          <PlaybackSpeedIcon />
        </div>
        <div className="setting-item-label">
          <span>Playback speed</span>
        </div>
        <div className="setting-active">{playerState.currentPlayback.text}</div>
      </div>
      {/* Quality */}
      {playerState.currentSource && (
        <div
          className="setting-item"
          onClick={() =>
            setPlayerState((prev) => ({ ...prev, settingItemOpen: "quality" }))
          }
        >
          <div className="setting-item-icon">
            <QualityIcon />
          </div>
          <div className="setting-item-label">
            <span>Quality</span>
          </div>
          <div className="setting-active">
            {playerState.currentSource &&
              (playerState.isSourceAutoSelected
                ? `Auto (${playerState.currentSource.quality})`
                : playerState.currentSource.quality)}
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingOptions;
