import React from 'react';
import { Button, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { ALL_LANGUAGES_PATH } from '../../../constants/path';
import { Content, GlobalStyle } from './AppLayout.style';

interface Props {
  children: React.ReactNode;
}

function AppLayout({ children }: Props) {
  return (
    <>
      <Layout>
        <Layout.Header>
          <Link to={ALL_LANGUAGES_PATH}>
            <Button>Home</Button>
          </Link>
        </Layout.Header>
        <Content>{children}</Content>
      </Layout>
      <GlobalStyle />
    </>
  );
}

export default AppLayout;
