import { forwardRef } from "react";
import { VideoPropTypes } from "./@types/video";
import { VideoProvider } from "./components/Provider/VideoProvider";
import InitializeVideo from "./components/core/InitializeVideo";
import VideoEventListeners from "./components/core/VideoEventListeners";
import Controls from "./components/controls/Controls";
import InfoText from "./components/overlays/InfoText";
import Buffering from "./components/overlays/Buffering";
import MobileControl from "./components/controls/MobileControl";
import Settings from "./components/overlays/settings";
import Caption from "./components/overlays/Caption";
import Chapters from "./components/overlays/Chapters";
import SkipButton from "./components/overlays/SkipButton";
import LoadingPoster from "./components/overlays/LoadingPoster";
import "./scss/main.scss";

const ReactVideo = forwardRef<HTMLVideoElement, VideoPropTypes>(
  (props, ref) => (
    <VideoProvider {...props} ref={ref}>
      <LoadingPoster />
      <InitializeVideo />
      <VideoEventListeners />
      <Controls />
      <InfoText />
      <MobileControl />
      <Buffering />
      <Settings />
      <Caption />
      <Chapters />
      <SkipButton />
    </VideoProvider>
  )
);

ReactVideo.displayName = "ReactVideo";

export default ReactVideo;
