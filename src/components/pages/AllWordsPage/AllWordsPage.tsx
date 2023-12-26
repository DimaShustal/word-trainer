import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../../contexts/AppContext';
import Loader from '../../atoms/Loader/Loader';
import { SUPPORTED_LANGUAGES } from '../../../constants/languages';
import { ALL_LANGUAGES_PATH } from '../../../constants/path';
import { Container, WordContainer } from './AllWordsPage.style';
import Stack from '../../atoms/Stack';
import Button from '../../atoms/Button';
import Typography from '../../atoms/Typography';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

function AllWordsPage() {
  const { store } = useAppContext();
  const { language } = useParams();

  useEffect(() => {
    if (language && SUPPORTED_LANGUAGES.includes(language)) {
      store.wordList.setLanguage(language);

      if (!store.wordList.isLoaded) store.wordList.fetchWords();
    }
  }, [store.wordList.isLoaded]);

  if (!language || !SUPPORTED_LANGUAGES.includes(language)) {
    return <Navigate to={ALL_LANGUAGES_PATH} replace={true} />;
  }

  if (!store.wordList.isLoaded) {
    return <Loader />;
  }

  return (
    <Container>
      {store.wordList.words.map(({ word, translation }, k) => (
        <WordContainer key={k}>
          <Stack direction="column" alignItems="flex-start">
            <Typography variant="h6">{word}</Typography>
            <Typography variant="paragraphMedium" color="secondary1">
              {translation}
            </Typography>
          </Stack>
          <Stack gap={10}>
            <Button type="text" size="medium" onClick={() => null}>
              Статус
            </Button>
            <Button type="icon" Icon={EditOutlined} size="small" onClick={() => null} />
            <Button type="icon" Icon={DeleteOutlined} size="small" onClick={() => null} />
          </Stack>
        </WordContainer>
      ))}
    </Container>
  );
}

export default observer(AllWordsPage);
