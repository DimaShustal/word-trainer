import React from 'react';
import { TColor } from '../../../functions/colors';

type AsComponent<T = any> = React.ComponentType<T> | string;

export type TTypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'paragraphLarge'
  | 'paragraphMedium'
  | 'paragraphSmall';

export type TypographyRootProps = {
  children: React.ReactNode;
  align?: React.CSSProperties['textAlign'];
  fontWeight?: React.CSSProperties['fontWeight'];
  textTransform?: React.CSSProperties['textTransform'];
  textDecoration?: React.CSSProperties['textDecoration'];
  bMargin?: number;
  lMargin?: number;
  rMargin?: number;
  tMargin?: number;
  noWrap?: boolean;
  variant?: TTypographyVariant;
  color?: TColor;
  lineThrough?: boolean;
};

export type TypographyProps = TypographyRootProps & {
  component?: AsComponent;
} & React.HTMLAttributes<unknown>;
