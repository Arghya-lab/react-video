import React from "react";
import { useVideo } from "../Provider/VideoProvider";
import { LoadingIcon } from "../icons";
import "./buffering.scss";

function Buffering() {
  const { playerState } = useVideo();

  if (!playerState.buffering) return null;

  return (
    <div className="buffering-container">
      <LoadingIcon strokeWidth={4.8} />
    </div>
  );
}

export default Buffering;
