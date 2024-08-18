import { PlaybackType, PlayerStateType } from "../@types";
import { isMobile } from "react-device-detect";

export const controlVisibleDuration = 3; // 3 seconds of visibility

export const playbackSpeeds: PlaybackType[] = [
  { text: "0.25x", playbackRate: 0.25 },
  { text: "0.5x", playbackRate: 0.5 },
  { text: "0.75x", playbackRate: 0.75 },
  { text: "Default", playbackRate: 1.0 },
  { text: "1.25x", playbackRate: 1.25 },
  { text: "1.5x", playbackRate: 1.5 },
  { text: "1.75x", playbackRate: 1.75 },
  { text: "2.0x", playbackRate: 2.0 },
];

export const defaultPlayerState: PlayerStateType = {
  playing: false,
  startOnPlay: true,
  buffering: false,
  duration: 0,
  currentTime: 0,
  pip: false,
  isFullScreen: false,
  loaded: [],
  volume: isMobile ? 1 : 0.85, //  value -> 0-1
  muted: false,
  isControlVisible: true,
  isSettingOpen: false,
  settingItemOpen: null,
  currentSource: null,
  isSourceAutoSelected: true,
  currentPlayback: playbackSpeeds.find(
    (playbackSpeed) => playbackSpeed.text === "Default"
  )!,
  currentCaption: null,
  currentCaptionData: null,
  currentChapter: null,
  nextChapterStartAt: null,
  isChapterOverLayOpen: false,
};
