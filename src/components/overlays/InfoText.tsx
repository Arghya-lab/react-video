import React from "react";
import { useVideo } from "../Provider/VideoProvider";
import classNames from "classnames";
import "./infoText.scss";
import { isMobile } from "react-device-detect";

function InfoText() {
  const { infoText, fullscreenOnlyInfoText, playerState } = useVideo();

  return (
    <div
      className={classNames("info-text-container", {
        "full-screen": playerState.isFullScreen,
      })}
    >
      {((fullscreenOnlyInfoText && playerState.isFullScreen && infoText) ||
        (!fullscreenOnlyInfoText && infoText && !isMobile)) && (
        <>
          <h1>{infoText.title}</h1>
          <p>{infoText?.summery}</p>
        </>
      )}
    </div>
  );
}

export default InfoText;