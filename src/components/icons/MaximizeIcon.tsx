import { IconPropType } from "./propTypes";
import classnames from "classnames";

export function MaximizeIcon({
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
        <path d="M8 3H5a2 2 0 0 0-2 2v3" />
        <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
        <path d="M3 16v3a2 2 0 0 0 2 2h3" />
        <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
      </svg>
    </span>
  );
}
