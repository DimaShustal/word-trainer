import styled from 'styled-components';
import { pixelsToRems } from '../../../functions/pixelsToRems';

export const ContentStyles = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1200px;
  padding: 0 ${pixelsToRems(50)};
  margin: 0 auto;
`;
