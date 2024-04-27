import { ComponentType, CSSProperties, ReactNode, AllHTMLAttributes } from 'react';
import { TColor } from '../../../functions/colors';

type AsComponent<T = any> = ComponentType<T> | string;

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
  children: ReactNode;
  align?: CSSProperties['textAlign'];
  fontWeight?: CSSProperties['fontWeight'];
  textTransform?: CSSProperties['textTransform'];
  textDecoration?: CSSProperties['textDecoration'];
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
} & AllHTMLAttributes<unknown>;
