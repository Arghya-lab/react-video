import {
  IconAdjustmentsHorizontal,
  IconBadgeCcFilled,
  IconBrandSpeedtest,
} from "@tabler/icons-react";
import { useVideo } from "../../Provider/VideoProvider";

function SettingOptions() {
  const { captions, playerState, setPlayerState } = useVideo();

  return (
    <div className="setting-item-option">
      {/* Caption */}
      {captions && captions.length > 0 && (
        <div
          className="setting-item"
          onClick={() =>
            setPlayerState((prev) => ({ ...prev, settingItemOpen: "caption" }))
          }
        >
          <div className="setting-item-icon">
            <IconBadgeCcFilled size={20} />
          </div>
          <div className="setting-item-label">
            <span>CC/Subtitles </span>
            <span className="setting-item-label-count">
              ({captions.length})
            </span>
          </div>
          <div className="setting-active">
            {playerState.currentCaption?.srclang || "Off"}
          </div>
        </div>
      )}
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
          <IconBrandSpeedtest size={20} />
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
            <IconAdjustmentsHorizontal size={20} />
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
