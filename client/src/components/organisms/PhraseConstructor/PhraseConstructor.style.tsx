import styled from 'styled-components';
import Stack from '../../atoms/Stack';
import { getColor } from '../../../functions/colors';
import { pixelsToRems } from '../../../functions/pixelsToRems';

interface IAnswerItemProps {
  $hasError: boolean;
}

export const Container = styled(Stack).attrs({
  justifyContent: 'space-between',
  direction: 'column',
  fullWidth: true,
  gap: 20,
})`
  height: 100%;
`;

export const AnswerContainer = styled(Stack).attrs({
  justifyContent: 'left',
  gap: 1,
  fullWidth: true,
})`
  flex-wrap: wrap;
  padding: ${pixelsToRems(20)};
  border: 1px solid ${getColor('secondary1')};
  min-height: ${pixelsToRems(105)};

  & > * {
    height: auto;
  }
`;

export const AnswerItem = styled.button<IAnswerItemProps>`
  all: unset;
  cursor: pointer;
  padding: 0 ${pixelsToRems(10)};
  border-radius: 3px;
  height: ${pixelsToRems(30)};
  border: 1px solid ${getColor('secondary1')};

  ${({ $hasError }) => $hasError && `border-color: ${getColor('tertiary4')};`}
`;

export const WordsContainer = styled(Stack).attrs({
  fullWidth: true,
  gap: 20,
})`
  flex-wrap: wrap;
`;
