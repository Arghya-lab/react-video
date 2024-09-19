import { IconPropType } from "./propTypes";
import classnames from "classnames";

export function VolumeLowIcon({
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
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      </svg>
    </span>
  );
}
