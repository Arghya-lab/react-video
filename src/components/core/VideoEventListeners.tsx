import { useEffect } from "react";
import { useVideo } from "../Provider/VideoProvider";
import { controlVisibleDuration } from "../../lib/constant";

function VideoEventListeners() {
  const {
    videoRef,
    videoContainerRef,
    controlVisibleTill,
    playerState,
    chapters,
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
    const video = videoRef?.current;

    const handleDuration = () => {
      if (video) {
        const duration = video.duration;

        setPlayerState((prev) => ({
          ...prev,
          duration,
        }));

        onDuration(duration);
      }
    };

    const handleReady = () => {
      if (!playerState.isVideoLoaded) {
        onReady();
      }

      setPlayerState((prev) => ({
        ...prev,
        buffering: false,
        isVideoLoaded: true,
      }));
    };

    const handleOnPlay = () => {
      if (playerState.startOnPlay) {
        onStart();
        setPlayerState((prev) => ({ ...prev, startOnPlay: false }));
      }
      onPlay();
      setPlayerState((prev) => ({ ...prev, playing: true, buffering: false }));
    };

    const handleOnPause = () => {
      onPause();
      setPlayerState((prev) => ({
        ...prev,
        playing: false,
        isControlVisible: true,
      }));
    };

    const handleProgress = () => {
      if (video) {
        const currentTime = video.currentTime;
        const buffered = video.buffered;

        const bufferedAreas: [number, number][] = [];

        for (let i = 0; i < buffered.length; i++) {
          const start = buffered.start(i);
          const end = buffered.end(i);

          bufferedAreas.push([start, end]);
        }

        onProgress({ currentTime, buffered });
        setPlayerState((prev) => ({
          ...prev,
          currentTime,
          loaded: bufferedAreas,
        }));
      }
    };

    const handleTimeUpdate = () => {
      if (video) {
        const currentTime = video.currentTime;

        //  Update current chapters
        if (
          chapters && // nothing is set
          ((!playerState.currentChapter && !playerState.nextChapterStartAt) ||
            //  chapter have to update
            (playerState.currentChapter &&
              playerState.currentChapter.endTime <= currentTime) ||
            (playerState.nextChapterStartAt &&
              playerState.nextChapterStartAt <= currentTime) ||
            //  user skip back
            (playerState.currentChapter &&
              playerState.currentChapter.startTime > currentTime))
        ) {
          const updatedCh = chapters.find(
            (chapter) =>
              chapter.startTime <= currentTime && chapter.endTime >= currentTime
          );
          const nextCh = chapters.find(
            (chapter) => chapter.startTime > currentTime
          );
          setPlayerState((prev) => ({
            ...prev,
            currentChapter: updatedCh || null,
            nextChapterStartAt: prev.nextChapterStartAt
              ? nextCh?.startTime || playerState.duration
              : nextCh?.startTime || null,
          }));
        }

        if (
          playerState.isControlVisible &&
          controlVisibleTill &&
          controlVisibleTill.current + 1 < currentTime
        ) {
          document.documentElement.style.cursor = "none";

          setPlayerState((prev) => ({
            ...prev,
            currentTime,
            isControlVisible: false,
            isSettingOpen: false,
            settingItemOpen: null,
          }));
        } else {
          setPlayerState((prev) => ({
            ...prev,
            currentTime,
          }));
        }
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

    if (video) {
      video.addEventListener("canplay", handleReady);
      video.addEventListener("loadedmetadata", handleDuration);
      video.addEventListener("play", handleOnPlay);
      video.addEventListener("progress", handleProgress);
      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("waiting", handleBuffering);
      video.addEventListener("playing", handleBufferingEnd);
      video.addEventListener("pause", handleOnPause);
      video.addEventListener("seeked", onSeek);
      video.addEventListener("ended", onEnded);
      video.addEventListener("error", onError);
      video.addEventListener("enterpictureinpicture", handleEnablePIP);
      video.addEventListener("leavepictureinpicture", handleDisablePIP);
    }

    return () => {
      if (video) {
        video.removeEventListener("canplay", handleReady);
        video.removeEventListener("loadedmetadata", handleDuration);
        video.removeEventListener("play", handleOnPlay);
        video.removeEventListener("progress", handleProgress);
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("waiting", handleBuffering);
        video.removeEventListener("playing", handleBufferingEnd);
        video.removeEventListener("pause", handleOnPause);
        video.removeEventListener("seeked", onSeek);
        video.removeEventListener("ended", onEnded);
        video.removeEventListener("error", onError);
        video.removeEventListener("enterpictureinpicture", handleEnablePIP);
        video.removeEventListener("leavepictureinpicture", handleDisablePIP);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    videoRef,
    chapters,
    controlVisibleTill,
    onBuffer,
    onBufferEnd,
    onDisablePIP,
    onDuration,
    onEnablePIP,
    onEnded,
    onError,
    onPause,
    onPlay,
    onProgress,
    onReady,
    onSeek,
    onStart,
    setPlayerState,
  ]);

  useEffect(() => {
    const videoContainer = videoContainerRef?.current;

    const handleShowControls = () => {
      if (videoRef?.current && controlVisibleTill) {
        document.documentElement.style.cursor = "default";
        controlVisibleTill.current =
          videoRef.current.currentTime + controlVisibleDuration;
        setPlayerState((prev) => ({
          ...prev,
          isControlVisible: true,
        }));
      }
    };

    videoContainer?.addEventListener("mousemove", handleShowControls);
    videoContainer?.addEventListener("keydown", handleShowControls);

    return () => {
      videoContainer?.removeEventListener("mousemove", handleShowControls);
      videoContainer?.removeEventListener("keydown", handleShowControls);
    };
  }, [videoRef, videoContainerRef, controlVisibleTill, setPlayerState]);

  return null;
}

export default VideoEventListeners;
