import styled from 'styled-components';
import { getColor } from '../../../functions/colors';
import { pixelsToRems } from '../../../functions/pixelsToRems';
import Stack, { StackProps } from '../../atoms/Stack';

interface CardProps extends StackProps {
  $active: boolean;
}

export const Container = styled(Stack).attrs({
  gap: 20,
})`
  flex-wrap: wrap;
`;

export const Card = styled(Stack).attrs({
  direction: 'column',
  gap: 10,
})<CardProps>`
  padding: ${pixelsToRems(20)};
  border: 1px solid ${getColor('tertiary7')};
  border-radius: ${pixelsToRems(20)};
  min-width: ${pixelsToRems(200)};
  ${({ $active }) => $active && `border-color: ${getColor('secondary3')};`}

  &:hover {
    border-color: ${getColor('secondary3')};
  }
`;
