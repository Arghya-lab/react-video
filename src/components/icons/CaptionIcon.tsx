import React from "react";
import { BasicIconPropType } from "./propTypes";
import classnames from "classnames";
import "./icon.scss";

export function CaptionIcon({ className, color, size, ...rest }: BasicIconPropType) {
  return (
    <span className={classnames("player-icon", className)} {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size ? size.toString() : 24}
        height={size ? size.toString() : 24}
        viewBox="0 0 48 48"
      >
        <path d="M0 0h48v48H0z" fill="none" />
        <path
          d="M38 8H10c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zM22 22h-3v-1h-4v6h4v-1h3v2c0 1.1-.89 2-2 2h-6c-1.11 0-2-.9-2-2v-8c0-1.1.89-2 2-2h6c1.11 0 2 .9 2 2v2zm14 0h-3v-1h-4v6h4v-1h3v2c0 1.1-.89 2-2 2h-6c-1.11 0-2-.9-2-2v-8c0-1.1.89-2 2-2h6c1.11 0 2 .9 2 2v2z"
          fill={color || "currentColor"}
        />
      </svg>
    </span>
  );
}