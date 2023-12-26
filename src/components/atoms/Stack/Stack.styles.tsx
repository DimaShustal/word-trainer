import styled, { css } from 'styled-components';
import omitForwardedProps from '../../../functions/omitForwardedProps';
import { StackBaseProps } from './Stack.types';
import { pixelsToRems } from '../../../functions/pixelsToRems';

export const StackContainer = styled.div.withConfig(
  omitForwardedProps<StackBaseProps>(['direction', 'justifyContent', 'alignItems', 'gap', 'fullWidth']),
)<StackBaseProps>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  gap: ${({ gap }) => (gap ? pixelsToRems(gap) : 0)};
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`;
