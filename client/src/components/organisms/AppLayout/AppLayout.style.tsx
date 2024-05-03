import styled, { createGlobalStyle } from 'styled-components';
import { getColor } from '../../../functions/colors';
import { pixelsToRems } from '../../../functions/pixelsToRems';
import { HEADER_HEIGHT } from '../../../constants/ui';

export const Main = styled.main`
  height: calc(100vh - ${pixelsToRems(HEADER_HEIGHT)});
  overflow: auto;
  padding: ${pixelsToRems(50)} 0;
`;

export const GlobalStyle = createGlobalStyle`
  html {
    background: ${getColor('primary1')};
    color: ${getColor('primary2')};
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-size: 24px;

    @media (max-width: 1920px) {
      font-size: 22px;
    }
    
    @media (max-width: 1600px) {
      font-size: 20px;
    }
    
    @media (max-width: 1200px) {
      font-size: 18px;
    }
    
    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

  * {
    box-sizing: border-box;
  }
  
  [role=button] {
    cursor: pointer;
  }
`;

export const Version = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 12px;
  color: ${getColor('tertiary6')};
`;
