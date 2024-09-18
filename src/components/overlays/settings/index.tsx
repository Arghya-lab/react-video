import { useVideo } from "../../Provider/VideoProvider";
import classNames from "classnames";
import SettingOptions from "./SettingOptions";
import CaptionOptions from "./CaptionOptions";
import PlaybackSpeedOption from "./PlaybackSpeedOption";
import QualityOption from "./QualityOption";

function Settings() {
  const { playerState } = useVideo();

  return (
    <div
      id="setting-container"
      className={classNames("setting-container", {
        "show-setting": playerState.isSettingOpen,
      })}
    >
      {!playerState.settingItemOpen && <SettingOptions />}
      {playerState.settingItemOpen === "caption" && <CaptionOptions />}
      {playerState.settingItemOpen === "playbackSpeed" && (
        <PlaybackSpeedOption />
      )}
      {playerState.settingItemOpen === "quality" && <QualityOption />}
    </div>
  );
}

export default Settings;
