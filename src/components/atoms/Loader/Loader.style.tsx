import styled from 'styled-components';
import { pixelsToRems } from '../../../functions/pixelsToRems';

export const LoaderWrapper = styled.div`
  font-size: ${pixelsToRems(50)};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
