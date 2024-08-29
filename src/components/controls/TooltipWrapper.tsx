import React, { ComponentProps, ReactNode } from "react";
import classNames from "classnames";
import { useVideo } from "../Provider/VideoProvider";
import { isMobile } from "react-device-detect";

export type TooltipPosition = "top" | "top-left" | "top-right";

export interface TooltipWrapperProp extends ComponentProps<"div"> {
  children: ReactNode;
  toolTip: string;
  position?: TooltipPosition;
}

function TooltipWrapper({
  children,
  toolTip,
  position = "top",
  ...args
}: TooltipWrapperProp) {
  const { playerState } = useVideo();

  if (isMobile) return children;

  return (
    <div className="tooltip-wrapper" {...args}>
      {children}
      <div
        className={classNames("tooltip", ` tooltip-${position}`, {
          fullscreen: playerState.isFullScreen,
        })}
      >
        {toolTip}
      </div>
    </div>
  );
}

export default TooltipWrapper;
