import React, { HTMLProps } from "react";

export interface IconPropType extends HTMLProps<HTMLSpanElement> {
  size?: number;
  color?: string;
  fill?: boolean;
  fillColor?: string;
  strokeWidth?: number;
  className?: string;
  key?: React.Key | null;
}

export interface PipIconPropType extends HTMLProps<HTMLSpanElement> {
  size?: number;
  color?: string;
  fill?: boolean;
  fillColor?: string;
  strokeWidth?: number;
  className?: string;
  isPip?: boolean;
  key?: React.Key | null;
}

export interface BasicIconPropType extends HTMLProps<HTMLSpanElement> {
  size?: number;
  color?: string;
  className?: string;
  key?: React.Key | null;
}
