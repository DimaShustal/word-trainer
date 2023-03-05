import styled, { createGlobalStyle } from 'styled-components';
import { Layout } from 'antd';

const HEADER_HEIGHT = 64;

export const Content = styled(Layout.Content)`
  height: calc(100vh - ${HEADER_HEIGHT}px);
  overflow: auto;
  padding: 50px;
`;

export const GlobalStyle = createGlobalStyle`
  [role=button] {
    cursor: pointer;
  }
`;
