import React from "react";
import { VideoPropTypes } from "../@types/video";
import { VideoProvider } from "./Provider/VideoProvider";
import InitializeVideo from "./core/InitializeVideo";
import VideoEventListeners from "./core/VideoEventListeners";
import Controls from "./controls/Controls";
import Buffering from "./overlays/Buffering";
import MobileControl from "./controls/MobileControl";
import Settings from "./overlays/settings";
import Caption from "./overlays/Caption";

function ReactVideo(props: VideoPropTypes) {
  return (
    <VideoProvider {...props}>
      <InitializeVideo />
      <VideoEventListeners />
      <Controls />
      <MobileControl />
      <Buffering />
      <Settings />
      <Caption />
    </VideoProvider>
  );
}

export default ReactVideo;
