import { IconPropType } from "./propTypes";
import classnames from "classnames";

export function PrevIcon({
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
        <polygon points="19 20 9 12 19 4 19 20" />
        <line x1="5" x2="5" y1="19" y2="5" />
      </svg>
    </span>
  );
}
