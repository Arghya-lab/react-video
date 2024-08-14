import { HTMLProps } from "react";

export interface IconPropType extends HTMLProps<HTMLSpanElement> {
  size?: number;
  color?: string;
  fill?: boolean;
  fillColor?: string;
  strokeWidth?: number;
  className?: string;
}

export interface PipIconPropType extends HTMLProps<HTMLSpanElement> {
  size?: number;
  color?: string;
  fill?: boolean;
  fillColor?: string;
  strokeWidth?: number;
  className?: string;
  isPip?: boolean;
}

export interface BasicIconPropType extends HTMLProps<HTMLSpanElement> {
  size?: number;
  color?: string;
  className?: string;
}
