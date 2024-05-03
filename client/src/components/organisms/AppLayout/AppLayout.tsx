import { FC, ReactNode } from 'react';
import { Main, GlobalStyle, Version } from './AppLayout.style';
import Header from '../Header/Header';
import Content from '../../atoms/Content/Content';
import AlertsPortal from '../AlertsPortal/AlertsPortal';

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
      <AlertsPortal />
      <Version>v.{process.env.REACT_APP_VERSION}</Version>
    </>
  );
};

export default AppLayout;
