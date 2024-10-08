import { IconPropType } from "./propTypes";
import classnames from "classnames";

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
      {/*  From Uiverse.io by barisdogansutcu  */}
      <svg
        className="loader-container"
        viewBox="25 25 50 50"
        width={size ? size.toString() : undefined}
        fill={fill ? fillColor || color || "currentColor" : "none"}
        stroke={color || "currentColor"}
        strokeWidth={strokeWidth ? strokeWidth.toString() : "1.5"}
        // strokeLinecap="round"
      >
        <circle className="loading-circle" r="20" cy="50" cx="50"></circle>
      </svg>
    </span>
  );
}
