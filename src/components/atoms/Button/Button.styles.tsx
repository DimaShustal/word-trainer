import styled, { css } from 'styled-components';
import omitForwardedProps from '../../../functions/omitForwardedProps';
import { StyledButtonProps } from './Button.types';
import { pixelsToRems } from '../../../functions/pixelsToRems';

const omittedButtonProps: Array<keyof StyledButtonProps> = ['cConf', 'sConf', 'active', 'loading', 'fullWidth'];

const disabledState = css<StyledButtonProps>`
  color: ${({ cConf }) => cConf.disabled.text};
  background: ${({ cConf }) => cConf.disabled.background};
  border-color: ${({ cConf }) => cConf.disabled.background};
`;

const normalState = css<StyledButtonProps>`
  color: ${({ cConf }) => cConf.normal.text};
  background: ${({ cConf }) => cConf.normal.background};
  border-color: ${({ cConf }) => cConf.normal.background};
`;

const activeState = css<StyledButtonProps>`
  color: ${({ cConf }) => cConf.active.text};
  background: ${({ cConf }) => cConf.active.background};
  border-color: ${({ cConf }) => cConf.active.background};
`;

const commonStyle = css<StyledButtonProps>`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  position: relative;
  align-items: center;
  text-align: center;
  justify-content: center;
  transition: 0.2s;
  max-width: 100%;

  font-weight: ${({ sConf }) => sConf.fontWeight || '500'};
  font-size: ${({ sConf }) => sConf.fontSize};
  min-width: ${({ sConf, fullWidth }) => (fullWidth ? '100%' : sConf.width)};
  height: ${({ sConf }) => sConf.height};
  pointer-events: ${({ loading, disabled }) => (loading || disabled ? 'none' : 'auto')};

  &:hover {
    color: ${({ cConf }) => cConf.hover.text};
    background: ${({ cConf }) => cConf.hover.background};
    border-color: ${({ cConf }) => cConf.hover.background};
  }

  &:active {
    color: ${({ cConf }) => cConf.pressed.text};
    background: ${({ cConf }) => cConf.pressed.background};
    border-color: ${({ cConf }) => cConf.pressed.background};
  }

  ${({ disabled, active }) => {
    if (disabled) return disabledState;
    if (active) return activeState;
    return normalState;
  }}
`;

export const Text = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
`;

export const PrimaryButton = styled.button.withConfig(
  omitForwardedProps<StyledButtonProps>(omittedButtonProps),
)<StyledButtonProps>`
  ${commonStyle};
  border-radius: ${pixelsToRems(100)};
  padding: 0 ${pixelsToRems(20)};
`;

export const SecondaryButton = styled.button.withConfig(
  omitForwardedProps<StyledButtonProps>(omittedButtonProps),
)<StyledButtonProps>`
  ${commonStyle};
  border-radius: ${pixelsToRems(100)};
  padding: 0 ${pixelsToRems(20)};
`;

export const IconButton = styled.button.withConfig(
  omitForwardedProps<StyledButtonProps>(omittedButtonProps),
)<StyledButtonProps>`
  ${commonStyle};
  background: transparent;
`;

export const TextButton = styled.button.withConfig(
  omitForwardedProps<StyledButtonProps>(omittedButtonProps),
)<StyledButtonProps>`
  ${commonStyle};
  background: transparent;
`;
