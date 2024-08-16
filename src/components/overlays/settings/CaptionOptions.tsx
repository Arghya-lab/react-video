import React from "react";
import { useVideo } from "../../Provider/VideoProvider";

function CaptionOptions() {
  const { setPlayerState } = useVideo();
  const captions = ["English", "Japanese", "Hindi", "Bengali", "Tamil"];

  return (
    <>
      <div
        className="setting-option-header"
        onClick={() =>
          setPlayerState((prev) => ({ ...prev, settingItemOpen: null }))
        }
      >
        Caption
      </div>
      <div className="setting-option-choice-container">
        {captions.map((caption) => (
          <div key={caption} className="setting-option-choice">
            <span>{caption}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default CaptionOptions;
