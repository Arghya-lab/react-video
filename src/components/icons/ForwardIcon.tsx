import React from "react";
import { IconPropType } from "./propTypes";
import classnames from "classnames";

export function ForwardIcon({
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
        viewBox="0 0 24 24"
        width={size ? size.toString() : "24"}
        height={size ? size.toString() : "24"}
        fill={fill ? fillColor || color || "currentColor" : "none"}
        stroke={color || "currentColor"}
        strokeWidth={strokeWidth ? strokeWidth.toString() : "2"}
      >
        <polygon points="13 19 22 12 13 5 13 19" />
        <polygon points="2 19 11 12 2 5 2 19" />
      </svg>
    </span>
  );
}
