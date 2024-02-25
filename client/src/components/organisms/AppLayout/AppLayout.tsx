import { FC, ReactNode } from 'react';
import { Main, GlobalStyle } from './AppLayout.style';
import Header from '../Header/Header';
import Content from '../../atoms/Content/Content';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Main>
        <Content>{children}</Content>
      </Main>
      <GlobalStyle />
    </>
  );
};

export default AppLayout;
