import React, { CSSProperties } from 'react';

type AsComponent<T = any> = React.ComponentType<T> | string;

export interface StackBaseProps {
  direction?: CSSProperties['flexDirection'];
  gap?: number;
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  fullWidth?: boolean;
}

export type StackProps = StackBaseProps & {
  children: React.ReactNode;
  component?: AsComponent;
} & React.HTMLAttributes<HTMLDivElement>;
