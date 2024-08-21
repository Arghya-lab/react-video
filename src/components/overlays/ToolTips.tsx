import React from "react";
import { Tooltip } from "react-tooltip";
import classNames from "classnames";
import { isDesktop } from "react-device-detect";
import { useVideo } from "../Provider/VideoProvider";
import "./toolTips.scss";

interface ToolTipType {
  anchorSelector: string;
  content: string;
  place?:
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end";
}

function ToolTips() {
  const { playerState } = useVideo();

  const toolTips: ToolTipType[] = [
    {
      anchorSelector: "#play-pause-btn",
      content: playerState.playing ? "Pause" : "Play",
      place: "top-start",
    },
    {
      anchorSelector: "#volume-btn",
      content: playerState.muted ? "Unmute" : "Mute",
    },
    {
      anchorSelector: "#backward-btn",
      content: "Skip backward",
    },
    {
      anchorSelector: "#forward-btn",
      content: "Skip forward",
    },
    { anchorSelector: "#setting-button", content: "Setting" },
    {
      anchorSelector: "#pip-button",
      content: playerState.pip ? "Exit Pip" : "Pip",
    },
    {
      anchorSelector: "#fullscreen-btn",
      content: playerState.isFullScreen ? "exit fullscreen" : "Full screen",
      place: "top-end",
    },
  ];

  if (!isDesktop) return null;

  return (
    <>
      {toolTips.map(({ anchorSelector, content, place }, id) => (
        <Tooltip
          key={id}
          place={place || "top"}
          className={classNames("tool-tip", {
            "full-screen": playerState.isFullScreen,
          })}
          anchorSelect={anchorSelector}
          hidden={playerState.isSettingOpen}
        >
          {content}
        </Tooltip>
      ))}
    </>
  );
}

export default ToolTips;
