import React from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';

export type ButtonColor = {
  background: string | undefined;
  text: string | undefined;
};

export type ButtonColorStates = {
  normal: ButtonColor;
  hover: ButtonColor;
  pressed: ButtonColor;
  disabled: ButtonColor;
  active: ButtonColor;
};

export type ButtonSize = {
  width?: string;
  height?: string;
  iconSize?: string;
  iconPadding?: string;
  fontSize?: string;
  fontWeight?: string;
  borderWidth?: string;
};

export type StyledButtonProps = {
  active: boolean;
  disabled: boolean;
  loading: boolean;
  fullWidth: boolean;
  cConf: ButtonColorStates;
  sConf: ButtonSize | Partial<ButtonSize>;
  href: string;
};

export type ButtonVariants<T = unknown> = {
  primary: T;
  secondary: T;
  icon: T;
  text: T;
};

export type ButtonSizesVariants = {
  large: ButtonSize;
  medium: ButtonSize;
  small: ButtonSize;
};

export type ButtonRootProps = {
  /**
   * Way to pass `type` to the button element
   */
  buttonType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];

  /**
   * The content of the button.
   */
  children?: React.ReactNode;

  /**
   * Controls disabled state
   */
  disabled?: boolean;

  /**
   * Makes button fill container by width
   */
  fullWidth?: boolean;

  /**
   * Controls button size
   */
  size?: keyof ButtonSizesVariants;

  /**
   * Controls button type
   */
  type?: keyof ButtonVariants;

  /**
   * Element that would be rendered inplace of icon
   */
  Icon?: typeof Icon;

  /**
   * Controls button loading state
   */
  loading?: boolean;

  /**
   * href attribute for link button
   */
  href?: string;

  /**
   * Sets active state for button
   */
  active?: boolean;

  /**
   * styled-component `as` prop
   */
  as?: React.ElementType;

  /**
   * react-router-dom `to` prop
   */
  to?: string;
};

export type ButtonProps = ButtonRootProps & React.HTMLAttributes<unknown>;
