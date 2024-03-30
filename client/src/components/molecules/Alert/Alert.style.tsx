import styled, { css } from 'styled-components';
import { getColor } from '../../../functions/colors';
import Stack from '../../atoms/Stack';
import { pixelsToRems } from '../../../functions/pixelsToRems';

const ErrorStyles = css`
  background-color: ${getColor('tertiary4')};
  border-color: ${getColor('primary2')};
  color: ${getColor('primary2')};
`;

const InfoStyles = css`
  background-color: ${getColor('secondary3')};
  border-color: ${getColor('primary2')};
  color: ${getColor('primary2')};
`;

const SuccessStyles = css`
  background-color: ${getColor('tertiary2')};
  border-color: ${getColor('primary2')};
  color: ${getColor('primary2')};
`;

export const AlertContainer = styled(Stack).attrs({
  gap: pixelsToRems(5),
  direction: 'row',
  justifyContent: 'space-between',
})`
  width: ${pixelsToRems(400)};
  margin-bottom: ${pixelsToRems(10)};
  padding: ${pixelsToRems(10)};
  border-radius: ${pixelsToRems(10)};
  border: 1px solid;

  @media (max-width: 376px) {
    width: 100%;
  }

  ${({ $isError, $isInfo }) => {
    if ($isError) return ErrorStyles;
    if ($isInfo) return InfoStyles;
    return SuccessStyles;
  }}
`;
