import styled from 'styled-components';
import Stack from '../../atoms/Stack';
import { getColor } from '../../../functions/colors';
import { pixelsToRems } from '../../../functions/pixelsToRems';

export const Container = styled(Stack).attrs({
  fullWidth: true,
  direction: 'column',
  alignItems: 'initial',
  justifyContent: 'initial',
  gap: 10,
})``;

export const WordContainer = styled(Stack).attrs({
  fullWidth: true,
  justifyContent: 'space-between',
})`
  & + & {
    padding-top: ${pixelsToRems(10)};
    border-top: 1px solid ${getColor('secondary1')}66;
  }
`;
