import styled from 'styled-components';
import { pixelsToRems } from '../../../functions/pixelsToRems';

export const AlertsContainer = styled.div`
  position: fixed;
  bottom: ${pixelsToRems(80)};
  left: ${pixelsToRems(20)};
  right: ${pixelsToRems(20)};
  transform: translateY(100%);
  display: flex;
  flex-direction: column-reverse;
  z-index: 100;

  @media (max-width: 376px) {
    z-index: 140;
  }

  &:empty {
    display: none;
  }
`;
