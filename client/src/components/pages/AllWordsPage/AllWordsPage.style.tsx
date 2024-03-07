import styled from 'styled-components';
import Stack from '../../atoms/Stack';
import { getColor } from '../../../functions/colors';
import { pixelsToRems } from '../../../functions/pixelsToRems';
import { Link } from 'react-router-dom';

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

export const AddButton = styled(Link)`
  position: fixed;
  bottom: ${pixelsToRems(50)};
  right: ${pixelsToRems(50)};
  color: ${getColor('primary2')};
  background: ${getColor('secondary3')};
  border: 1px solid ${getColor('primary2')};
  border-radius: 50%;
  padding: ${pixelsToRems(20)};
  font-size: ${pixelsToRems(30)};
  z-index: 120;

  &:hover {
    color: ${getColor('primary2')}cc;
    background: ${getColor('secondary3')}cc;
  }
`;
