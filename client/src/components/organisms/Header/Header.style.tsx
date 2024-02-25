import styled from 'styled-components';
import { pixelsToRems } from '../../../functions/pixelsToRems';
import { getColor } from '../../../functions/colors';
import Stack from '../../atoms/Stack';
import { HEADER_HEIGHT } from '../../../constants/ui';

export const HeaderContainer = styled.header`
  height: ${pixelsToRems(HEADER_HEIGHT)};
  background: ${getColor('tertiary7')};
`;

export const HeaderContent = styled(Stack).attrs({
  fullWidth: true,
  justifyContent: 'space-between',
})`
  height: 100%;
`;
