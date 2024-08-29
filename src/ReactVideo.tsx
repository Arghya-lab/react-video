import React, { forwardRef, ForwardRefRenderFunction } from "react";
import { VideoPropTypes } from "./@types/video";
import { VideoProvider } from "./components/Provider/VideoProvider";
import InitializeVideo from "./components/core/InitializeVideo";
import VideoEventListeners from "./components/core/VideoEventListeners";
import Controls from "./components/controls/Controls";
// import ToolTips from "./components/overlays/ToolTips";
import InfoText from "./components/overlays/InfoText";
import Buffering from "./components/overlays/Buffering";
import MobileControl from "./components/controls/MobileControl";
import Settings from "./components/overlays/settings";
import Caption from "./components/overlays/Caption";
import Chapters from "./components/overlays/Chapters";
import SkipButton from "./components/overlays/SkipButton";
import LoadingPoster from "./components/overlays/LoadingPoster";
import "../scss/main.scss";

const ReactVideoFunction: ForwardRefRenderFunction<
  HTMLVideoElement,
  VideoPropTypes
> = (props, ref) => (
  <VideoProvider {...props} ref={ref}>
    <LoadingPoster />
    <InitializeVideo />
    <VideoEventListeners />
    <Controls />
    {/* <ToolTips /> */}
    <InfoText />
    <MobileControl />
    <Buffering />
    <Settings />
    <Caption />
    <Chapters />
    <SkipButton />
  </VideoProvider>
);

export const ReactVideo = forwardRef(ReactVideoFunction);
ReactVideo.displayName = "ReactVideo";

export default ReactVideo;
