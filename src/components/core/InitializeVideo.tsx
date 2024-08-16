import { useEffect } from "react";
import VideoSrc from "../../lib/VideoSrc";
import Hls from "hls.js";
import dashjs from "dashjs";
import flvjs from "flv.js";
import { useVideo } from "../Provider/VideoProvider";

function InitializeVideo() {
  let progressTimeout: NodeJS.Timeout;
  const { videoRef, source, defaultQuality, autoPlay, setPlayerState } =
    useVideo();

  useEffect(() => {
    let hls: Hls | null = null;
    let dashPlayer: dashjs.MediaPlayerClass | null = null;
    let flvPlayer: flvjs.Player | null = null;

    if (videoRef && videoRef.current) {
      const video = videoRef.current;
      const videoSrc = new VideoSrc(source, defaultQuality);
      setPlayerState((prev) => ({
        ...prev,
        currentSource: videoSrc.preferredSource,
      }));

      //  for normal video link
      if (videoSrc.src) {
        video.src = videoSrc.src;
      }

      //  for hls video link
      if (videoSrc.hlsSrc) {
        if (video.canPlayType("application/vnd.apple.mpegurl")) {
          // If the browser supports HLS natively (e.g., Safari)
          video.src = videoSrc.hlsSrc;
        } else if (Hls.isSupported()) {
          // If the browser does not support HLS natively, use hls.js
          hls = new Hls();
          hls.loadSource(videoSrc.hlsSrc);
          hls.attachMedia(video);
        }
      }

      //  for dash video link
      if (videoSrc.dashSrc) {
        dashPlayer = dashjs.MediaPlayer().create();
        dashPlayer.initialize(video, videoSrc.dashSrc);
      }

      //  for flv video link
      if (videoSrc.flvSrc && flvjs.isSupported()) {
        flvPlayer = flvjs.createPlayer({
          type: "flv",
          url: videoSrc.flvSrc,
        });
        flvPlayer.attachMediaElement(video);
        flvPlayer.load();
      }

      if (autoPlay) {
        video.play();
      }
    }

    return () => {
      clearTimeout(progressTimeout);
      if (hls) hls.destroy();
      if (dashPlayer) dashPlayer.reset();
      if (flvPlayer) flvPlayer.destroy();
    };
  }, [source, videoRef]);

  return null;
}

export default InitializeVideo;
