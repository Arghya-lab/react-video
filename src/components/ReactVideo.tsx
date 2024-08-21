import React from "react";
import { VideoPropTypes } from "../@types/video";
import { VideoProvider } from "./Provider/VideoProvider";
import InitializeVideo from "./core/InitializeVideo";
import VideoEventListeners from "./core/VideoEventListeners";
import Controls from "./controls/Controls";
import ToolTips from "./overlays/ToolTips";
import InfoText from "./overlays/InfoText";
import Buffering from "./overlays/Buffering";
import MobileControl from "./controls/MobileControl";
import Settings from "./overlays/settings";
import Caption from "./overlays/Caption";
import Chapters from "./overlays/Chapters";
import SkipButton from "./overlays/SkipButton";

function ReactVideo(props: VideoPropTypes) {
  return (
    <VideoProvider {...props}>
      <InitializeVideo />
      <VideoEventListeners />
      <Controls />
      <ToolTips />
      <InfoText />
      <MobileControl />
      <Buffering />
      <Settings />
      <Caption />
      <Chapters />
      <SkipButton />
    </VideoProvider>
  );
}

export default ReactVideo;
