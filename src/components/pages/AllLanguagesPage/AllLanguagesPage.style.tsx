import styled from 'styled-components';
import { getColor } from '../../../functions/colors';
import { pixelsToRems } from '../../../functions/pixelsToRems';
import Stack from '../../atoms/Stack';

export const Container = styled(Stack)`
  flex-wrap: wrap;
`;

export const Card = styled(Stack)`
  padding: ${pixelsToRems(20)};
  border: 1px solid ${getColor('tertiary7')};
  border-radius: ${pixelsToRems(20)};
  min-width: ${pixelsToRems(200)};
`;
