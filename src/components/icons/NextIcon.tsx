import React from "react";
import { IconPropType } from "./propTypes";
import classnames from "classnames";

export function NextIcon({
  className,
  color,
  fill = true,
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
        <polygon points="5 4 15 12 5 20 5 4" />
        <line x1="19" x2="19" y1="5" y2="19" />
      </svg>
    </span>
  );
}
