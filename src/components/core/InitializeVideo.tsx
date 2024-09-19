import { useEffect } from "react";
import VideoSrc from "../../lib/VideoSrc";
import Hls from "hls.js";
import dashjs from "dashjs";
import flvjs from "flv.js";
import { useVideo } from "../Provider/VideoProvider";
import fetchAndParseCaption from "../../lib/fetchAndParseCaption";

function InitializeVideo() {
  // let progressTimeout: NodeJS.Timeout;

  const {
    videoRef,
    source,
    defaultQuality,
    autoPlay,
    captions,
    playerState,
    setPlayerState,
  } = useVideo();

  useEffect(() => {
    let hls: Hls | null = null;
    let dashPlayer: dashjs.MediaPlayerClass | null = null;
    let flvPlayer: flvjs.Player | null = null;

    if (videoRef?.current) {
      const video = videoRef.current;
      const previouslyPlayingAt = playerState.currentTime;
      const isPreviouslyPlaying = playerState.playing;

      const videoSrc = new VideoSrc(
        source,
        playerState.currentSource?.quality || defaultQuality
      );
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

      if (!playerState.isSourceAutoSelected) {
        //  false mean the quality is changed
        if (isPreviouslyPlaying) video.play();
        video.currentTime = previouslyPlayingAt;
      } else if (autoPlay) {
        video.play();
      }

      if (captions) {
        const defaultCaption = captions.find((caption) => caption.default);
        if (defaultCaption) {
          setPlayerState((prev) => ({
            ...prev,
            currentCaption: defaultCaption,
          }));
          fetchAndParseCaption(defaultCaption.src).then((data) =>
            setPlayerState((prev) => ({ ...prev, currentCaptionData: data }))
          );
        }
      }
    }

    return () => {
      // clearTimeout(progressTimeout);
      if (hls) hls.destroy();
      if (dashPlayer) dashPlayer.reset();
      if (flvPlayer) flvPlayer.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source, videoRef, autoPlay, captions, defaultQuality, setPlayerState]);

  return null;
}

export default InitializeVideo;
