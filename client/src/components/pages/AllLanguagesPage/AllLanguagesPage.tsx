import { MouseEvent } from 'react';
import { observer } from 'mobx-react-lite';
import Typography from '../../atoms/Typography';
import { LANGUAGES } from '../../../constants/languages';
import { Card, Container } from './AllLanguagesPage.style';
import { useAppContext } from '../../../contexts/AppContext';

function AllLanguagesPage() {
  const { store } = useAppContext();

  const clickHandler = (e: MouseEvent<HTMLElement>) => {
    const { code } = e.currentTarget.dataset;

    if (code) {
      store.user.setLanguage(code);
    }
  };

  return (
    <Container>
      {LANGUAGES.map(({ code, name, Icon }) => (
        <Card key={code} role="button" onClick={clickHandler} data-code={code} $active={store.user.language === code}>
          <Icon size="large" />
          <Typography>{name}</Typography>
        </Card>
      ))}
    </Container>
  );
}

export default observer(AllLanguagesPage);
