import styled, { createGlobalStyle } from 'styled-components';
import { getColor } from '../../../functions/colors';
import Stack from '../../atoms/Stack';
import { pixelsToRems } from '../../../functions/pixelsToRems';

export const HEADER_HEIGHT = 60;

export const Header = styled.header`
  height: ${pixelsToRems(HEADER_HEIGHT)};
  background: ${getColor('tertiary7')};
`;

export const HeaderContent = styled(Stack).attrs({
  fullWidth: true,
  gap: 20,
})`
  height: 100%;
`;

export const Main = styled.main`
  height: calc(100vh - ${pixelsToRems(HEADER_HEIGHT)});
  overflow: auto;
  padding: ${pixelsToRems(50)} 0;
`;

export const Content = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1200px;
  padding: 0 ${pixelsToRems(50)};
  margin: 0 auto;
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
