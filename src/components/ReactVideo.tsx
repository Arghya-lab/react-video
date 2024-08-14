import React from "react";
import { VideoPropTypes } from "../@types/video";
import { VideoProvider } from "./Provider/VideoProvider";
import InitializeVideo from "./core/InitializeVideo";
import VideoEventListeners from "./core/VideoEventListeners";
import Controls from "./controls/Controls";
import Buffering from "./overlays/Buffering";
import MobileControl from "./controls/MobileControl";

function ReactVideo(props: VideoPropTypes) {
  return (
    <div style={{ height: "200vh" }}>
      <VideoProvider {...props}>
        <InitializeVideo />
        <VideoEventListeners />
        <Controls />
        <MobileControl />
        <Buffering />
      </VideoProvider>
    </div>
  );
}

export default ReactVideo;
