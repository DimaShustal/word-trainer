import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Typography from '../../atoms/Typography';
import { LANGUAGES } from '../../../constants/languages';
import { Card, Container } from './AllLanguagesPage.style';

function AllLanguagesPage() {
  const navigate = useNavigate();

  const clickHandler = (e: MouseEvent<HTMLElement>) => {
    const { code } = e.currentTarget.dataset;

    if (code) {
      navigate(`/${code}/words`);
    }
  };

  return (
    <Container gap={20}>
      {LANGUAGES.map(({ code, name, Icon }) => (
        <Card key={code} role="button" onClick={clickHandler} data-code={code} direction="column" gap={10}>
          <Icon size="large" />
          <Typography>{name}</Typography>
        </Card>
      ))}
    </Container>
  );
}

export default observer(AllLanguagesPage);
