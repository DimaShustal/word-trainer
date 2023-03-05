import styled, { css } from 'styled-components';
import omitForwardedProps from '../../../functions/omitForwardedProps';
import { StackBaseProps } from './Stack.types';

export const StackContainer = styled.div.withConfig(
  omitForwardedProps<StackBaseProps>(['direction', 'justifyContent', 'alignItems', 'gap', 'fullWidth']),
)<StackBaseProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  gap: ${({ gap }) => gap && `${gap}px`};
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`;
