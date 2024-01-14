import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ALL_LANGUAGES_PATH, ALL_WORDS_PATH, PHRASE_CONSTRUCTOR_PATH } from '../../../constants/path';
import { Main, GlobalStyle, Header, Content, HeaderContent } from './AppLayout.style';
import Button from '../../atoms/Button';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <Header>
        <Content>
          <HeaderContent>
            <Button type="text" size="medium" as={Link} to={ALL_LANGUAGES_PATH}>
              Языки
            </Button>
            <Button type="text" size="medium" as={Link} to={ALL_WORDS_PATH}>
              Слова
            </Button>
            <Button type="text" size="medium" as={Link} to={PHRASE_CONSTRUCTOR_PATH}>
              Конструктор
            </Button>
          </HeaderContent>
        </Content>
      </Header>
      <Main>
        <Content>{children}</Content>
      </Main>
      <GlobalStyle />
    </>
  );
};

export default AppLayout;
