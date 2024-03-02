import { MouseEvent } from 'react';
import { observer } from 'mobx-react-lite';
import Typography from '../../atoms/Typography';
import { Card, Container } from './AllLanguagesPage.style';
import { useAppContext } from '../../../contexts/AppContext';
import { Navigate } from 'react-router-dom';
import { ROOT_PATH } from '../../../constants/path';
import Loader from '../../atoms/Loader/Loader';
import IconPolish from '../../atoms/IconPolish/IconPolish';
import IconEnglish from '../../atoms/IconEnglish/IconEnglish';
import { Language as LanguageGraphql } from '../../../__generated__/graphql';

const MAP_CODE_TO_ICON = {
  pl: IconPolish,
  en: IconEnglish,
};

function Icon({ code }) {
  const IconComponent = MAP_CODE_TO_ICON[code];

  if (!IconComponent) return null;
  return <IconComponent size="large" />;
}

function AllLanguagesPage() {
  const { store } = useAppContext();

  const clickHandler = (e: MouseEvent<HTMLElement>) => {
    const { id } = e.currentTarget.dataset;
    const languages = store.languages.list?.find((language: LanguageGraphql) => language.id === id);

    if (languages) {
      store.user.setLanguage(id);
    }
  };

  if (!store.user.isLogged) return <Navigate to={ROOT_PATH} replace={true} />;
  if (!store.languages.isLoaded) return <Loader />;

  return (
    <Container>
      {store.languages.list?.map(({ code, id, name }) => (
        <Card key={id} role="button" onClick={clickHandler} data-id={id} $active={store.user.currentLanguageId === id}>
          <Icon code={code} />
          <Typography>{name}</Typography>
        </Card>
      ))}
    </Container>
  );
}

export default observer(AllLanguagesPage);
