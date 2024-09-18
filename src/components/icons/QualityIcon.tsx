import { BasicIconPropType } from "./propTypes";
import classnames from "classnames";

export function QualityIcon({
  className,
  color,
  size,
  ...rest
}: BasicIconPropType) {
  return (
    <span className={classnames("player-icon", className)} {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size ? size.toString() : "24"}
        height={size ? size.toString() : "24"}
        viewBox="0 0 24 24"
        fill={color || "currentColor"}
      >
        <path d="M15,17h6v1h-6V17z M11,17H3v1h8v2h1v-2v-1v-2h-1V17z M14,8h1V6V5V3h-1v2H3v1h11V8z M18,5v1h3V5H18z M6,14h1v-2v-1V9H6v2H3v1 h3V14z M10,12h11v-1H10V12z"></path>
      </svg>
    </span>
  );
}
