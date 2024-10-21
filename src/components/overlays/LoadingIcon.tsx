import { HTMLProps } from "react";
import classnames from "classnames";

export interface IconPropType extends HTMLProps<HTMLSpanElement> {
  size?: number;
  color?: string;
  fill?: boolean;
  fillColor?: string;
  strokeWidth?: number;
  className?: string;
  key?: React.Key | null;
}

export function LoadingIcon({
  className,
  color,
  fill,
  fillColor,
  size,
  strokeWidth,
  key,
  ...rest
}: IconPropType) {
  return (
    <span className={classnames("player-icon", className)} key={key} {...rest}>
      <svg
        className="loader-container"
        viewBox="25 25 50 50"
        width={size ? size.toString() : undefined}
        fill={fill ? fillColor || color || "currentColor" : "none"}
        stroke={color || "currentColor"}
        strokeWidth={strokeWidth ? strokeWidth.toString() : "1.5"}
      >
        <circle className="loading-circle" r="20" cy="50" cx="50"></circle>
      </svg>
    </span>
  );
}
