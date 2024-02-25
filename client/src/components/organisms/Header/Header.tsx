import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { ALL_LANGUAGES_PATH, ALL_WORDS_PATH, PHRASE_CONSTRUCTOR_PATH, ROOT_PATH } from '../../../constants/path';
import { HeaderContainer, HeaderContent } from './Header.style';
import Button from '../../atoms/Button';
import { useAppContext } from '../../../contexts/AppContext';
import Stack from '../../atoms/Stack';
import Content from '../../atoms/Content/Content';

function Header() {
  const { store } = useAppContext();

  const loginHandler = () => {
    // TODO implement login
  };

  if (!store.user.isLogged) {
    return (
      <HeaderContainer>
        <Content>
          <HeaderContent>
            <Button type="text" size="medium" as={Link} to={ROOT_PATH}>
              Главная
            </Button>
            <Button type="text" size="medium" onClick={loginHandler}>
              Войти
            </Button>
          </HeaderContent>
        </Content>
      </HeaderContainer>
    );
  }

  return (
    <HeaderContainer>
      <Content>
        <HeaderContent>
          <Button type="text" size="medium" as={Link} to={ROOT_PATH}>
            Главная
          </Button>
          <Stack gap={20}>
            <Button type="text" size="medium" as={Link} to={ALL_LANGUAGES_PATH}>
              Языки
            </Button>
            <Button type="text" size="medium" as={Link} to={ALL_WORDS_PATH}>
              Слова
            </Button>
            <Button type="text" size="medium" as={Link} to={PHRASE_CONSTRUCTOR_PATH}>
              Конструктор
            </Button>
          </Stack>
          <Button type="text" size="medium" onClick={store.user.logout}>
            Выйти
          </Button>
        </HeaderContent>
      </Content>
    </HeaderContainer>
  );
}

export default observer(Header);
