import React from "react";
import { IconPropType } from "./propTypes";
import classnames from "classnames";

export function MinimizeIcon({
  className,
  color,
  fill,
  fillColor,
  size,
  strokeWidth,
  ...rest
}: IconPropType) {
  return (
    <span className={classnames("player-icon", className)} {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size ? size.toString() : "24"}
        height={size ? size.toString() : "24"}
        viewBox="0 0 24 24"
        fill={fill ? fillColor || color || "currentColor" : "none"}
        stroke={color || "currentColor"}
        strokeWidth={strokeWidth ? strokeWidth.toString() : "1.5"}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 3v3a2 2 0 0 1-2 2H3" />
        <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
        <path d="M3 16h3a2 2 0 0 1 2 2v3" />
        <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
      </svg>
    </span>
  );
}
