import React from "react";
import { useVideo } from "../Provider/VideoProvider";
import { LoadingIcon } from "../icons";
import "./buffering.scss";
import classNames from "classnames";

function Buffering() {
  const { playerState } = useVideo();

  return (
    <div
      className={classNames("buffering-container", {
        "control-visible": playerState.isControlVisible,
        buffering: playerState.buffering && playerState.playing,
      })}
    >
      <LoadingIcon strokeWidth={4.8} />
    </div>
  );
}

export default Buffering;
