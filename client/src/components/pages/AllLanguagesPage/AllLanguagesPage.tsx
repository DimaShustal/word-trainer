import { FC, MouseEvent } from 'react';
import { observer } from 'mobx-react-lite';
import Typography from '../../atoms/Typography';
import { Card, Container } from './AllLanguagesPage.style';
import { useAppContext } from '../../../contexts/AppContext';
import Loader from '../../atoms/Loader/Loader';
import IconPolish from '../../atoms/IconPolish/IconPolish';
import IconEnglish from '../../atoms/IconEnglish/IconEnglish';
import { Language as LanguageGraphql } from '../../../__generated__/graphql';
import { IIconProps } from '../../../types/IconSize';

const MAP_CODE_TO_ICON: Record<string, FC<IIconProps>> = {
  pl: IconPolish,
  en: IconEnglish,
};

type IconProps = {
  code: string;
};

function Icon({ code }: IconProps) {
  const IconComponent = MAP_CODE_TO_ICON[code];

  if (!IconComponent) return null;
  return <IconComponent size="large" />;
}

function AllLanguagesPage() {
  const { store } = useAppContext();

  const clickHandler = (e: MouseEvent<HTMLElement>) => {
    const { id } = e.currentTarget.dataset;
    const language = store.languages.list?.find((language: LanguageGraphql) => language?.id === id);

    if (language && id) {
      store.user.setLanguage(id);
    }
  };

  if (!store.languages.isLoaded) return <Loader />;

  return (
    <Container>
      {store.languages.list?.map(({ code, id, name }: LanguageGraphql) => (
        <Card key={id} role="button" onClick={clickHandler} data-id={id} $active={store.user.currentLanguageId === id}>
          <Icon code={code} />
          <Typography>{name}</Typography>
        </Card>
      ))}
    </Container>
  );
}

export default observer(AllLanguagesPage);
