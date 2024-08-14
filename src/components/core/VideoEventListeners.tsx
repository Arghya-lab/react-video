import { RefObject, useEffect } from "react";
import { useVideo } from "../Provider/VideoProvider";
import screenFull from "screenfull";

export interface VideoEventListenersProps {
  videoRef: RefObject<HTMLVideoElement>;
}

function VideoEventListeners() {
  const {
    videoRef,
    playerState,
    setPlayerState,
    onReady,
    onStart,
    onPlay,
    onBuffer,
    onBufferEnd,
    onPause,
    onSeek,
    onEnded,
    onError,
    onDuration,
    onProgress,
    onEnablePIP,
    onDisablePIP,
  } = useVideo();

  useEffect(() => {
    if (videoRef && videoRef.current) {
      videoRef.current.addEventListener("canplay", handleReady);
      videoRef.current.addEventListener("play", handleOnPlay);
      videoRef.current.addEventListener("progress", handleProgress);
      videoRef.current.addEventListener("timeupdate", handleTimeUpdate);
      videoRef.current.addEventListener("waiting", handleBuffering);
      videoRef.current.addEventListener("playing", handleBufferingEnd);
      videoRef.current.addEventListener("pause", onPause);
      videoRef.current.addEventListener("seeked", onSeek);
      videoRef.current.addEventListener("ended", onEnded);
      videoRef.current.addEventListener("error", onError);
      videoRef.current.addEventListener("enterpictureinpicture", handleEnablePIP);
      videoRef.current.addEventListener("leavepictureinpicture", handleDisablePIP);
      document.addEventListener("fullscreenchange", handleFullscreenChange);
      document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.addEventListener("mozfullscreenchange", handleFullscreenChange);
      document.addEventListener("MSFullscreenChange", handleFullscreenChange);
    }

    return () => {
      if (videoRef && videoRef.current) {
        videoRef.current.removeEventListener("canplay", handleReady);
        videoRef.current.removeEventListener("play", handleOnPlay);
        videoRef.current.removeEventListener("progress", handleProgress);
        videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        videoRef.current.removeEventListener("waiting", handleBuffering);
        videoRef.current.removeEventListener("playing", handleBufferingEnd);
        videoRef.current.removeEventListener("pause", onPause);
        videoRef.current.removeEventListener("seeked", onSeek);
        videoRef.current.removeEventListener("ended", onEnded);
        videoRef.current.removeEventListener("error", onError);
        videoRef.current.removeEventListener("enterpictureinpicture", handleEnablePIP);
        videoRef.current.removeEventListener("leavepictureinpicture", handleDisablePIP);
        document.removeEventListener("fullscreenchange", handleFullscreenChange);
        document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
        document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
        document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
      }
    };
  }, [videoRef]);

  const getDuration = () => {
    if (videoRef && videoRef.current) {
      return videoRef.current.duration;
    }
    return null;
  };

  const handleReady = () => {
    onReady();
    const duration = getDuration();
    setPlayerState((prev) => ({
      ...prev,
      buffering: false,
      duration,
    }));
    onDuration(duration);
  };

  const handleOnPlay = () => {
    if (playerState.startOnPlay) {
      onStart();
      setPlayerState((prev) => ({ ...prev, startOnPlay: false }));
    }
    onPlay();
    setPlayerState((prev) => ({ ...prev, playing: true, buffering: false }));

    //  TODO: on quality change seek to prev position
  };

  const handleProgress = () => {
    if (videoRef && videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const buffered = videoRef.current.buffered;

      const bufferedAreas: [number, number][] = [];

      for (let i = 0; i < buffered.length; i++) {
        const start = buffered.start(i);
        const end = buffered.end(i);

        bufferedAreas.push([start, end]);
      }

      onProgress(currentTime);
      setPlayerState((prev) => ({
        ...prev,
        currentTime,
        loaded: bufferedAreas,
      }));
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef && videoRef.current) {
      const currentTime = videoRef.current.currentTime;

      onProgress(currentTime);
      setPlayerState((prev) => ({
        ...prev,
        currentTime,
      }));
    }
  };

  const handleBuffering = () => {
    onBuffer();
    setPlayerState((prev) => ({ ...prev, buffering: true }));
  };

  const handleBufferingEnd = () => {
    onBufferEnd();
    setPlayerState((prev) => ({ ...prev, buffering: false }));
  };

  const handleEnablePIP = () => {
    onEnablePIP();
    setPlayerState((prev) => ({
      ...prev,
      pip: true,
      isFullScreen: false,
    }));
  };
  const handleDisablePIP = () => {
    onDisablePIP();
    setPlayerState((prev) => ({
      ...prev,
      pip: false,
    }));
  };

  const handleFullscreenChange = () => {
    if (videoRef && videoRef.current && screenFull.element == videoRef.current) {
      screenFull.exit();
      setPlayerState((prev) => ({ ...prev, pip: false }));
    }
  };

  return null;
}

export default VideoEventListeners;