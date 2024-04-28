import { ComponentType, CSSProperties, HTMLAttributes, ReactNode } from 'react';

type AsComponent<T = any> = ComponentType<T> | string;

export interface StackBaseProps {
  direction?: CSSProperties['flexDirection'];
  gap?: number;
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  fullWidth?: boolean;
}

export type StackProps = StackBaseProps & {
  children: ReactNode;
  component?: AsComponent;
} & HTMLAttributes<HTMLDivElement>;
