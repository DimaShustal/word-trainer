import { MutableRefObject, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useAppContext } from '../../../contexts/AppContext';
import Loader from '../../atoms/Loader/Loader';
import { Container, WordContainer, AddButton } from './AllWordsPage.style';
import Stack from '../../atoms/Stack';
import Button from '../../atoms/Button';
import Typography from '../../atoms/Typography';
import { DeleteOutlined, PlusOutlined, SoundOutlined } from '@ant-design/icons';
import { Navigate } from 'react-router-dom';
import { ADD_WORDS_PATH, ALL_LANGUAGES_PATH } from '../../../constants/path';
import pronounceText from '../../../functions/pronounceText';

type SpeedList = {
  [key: string]: boolean;
};

function AllWordsPage() {
  const { store } = useAppContext();
  const languageCode = store.user.language?.code || '';
  const pronounceTextSpeedList: MutableRefObject<SpeedList> = useRef({});

  const pronounceTextFn = (text: string, id: string) => {
    const speedListValue = pronounceTextSpeedList.current[id] ?? true;
    const speed = speedListValue ? 1 : 0.5;

    pronounceTextSpeedList.current[id] = !speedListValue;
    pronounceText(text, languageCode, speed);
  };

  useEffect(() => {
    if (!store.wordList.isLoaded) store.wordList.fetchWords();
  }, [store.wordList.isLoaded]);

  if (!store.user.currentLanguageId) return <Navigate to={ALL_LANGUAGES_PATH} replace={true} />;
  if (!store.wordList.isLoaded) return <Loader />;

  if (!store.wordList.words.length) {
    return (
      <Container>
        <Typography variant="h6">Слова отсутствуют</Typography>
        <AddButton to={ADD_WORDS_PATH}>
          <PlusOutlined />
        </AddButton>
      </Container>
    );
  }

  return (
    <Container>
      {store.wordList.words.map(({ word, translation, id }) => (
        <WordContainer key={id}>
          <Stack direction="column" alignItems="flex-start">
            <Typography variant="h6">{word}</Typography>
            <Typography variant="paragraphMedium" color="secondary1">
              {translation}
            </Typography>
          </Stack>
          <Stack gap={10}>
            {/*<Button type="text" size="medium" onClick={() => null}>*/}
            {/*  Статус*/}
            {/*</Button>*/}
            <Button type="icon" Icon={SoundOutlined} size="small" onClick={() => pronounceTextFn(word, id)} />
            <Button type="icon" Icon={DeleteOutlined} size="small" onClick={() => store.wordList.removeWords([id])} />
          </Stack>
        </WordContainer>
      ))}
      <Button
        size="medium"
        disabled={!store.wordList.hasNextPage}
        loading={store.wordList.isLoading}
        onClick={() => store.wordList.fetchWords()}
        tMargin={20}
      >
        Загрузить еще
      </Button>
      <AddButton to={ADD_WORDS_PATH}>
        <PlusOutlined />
      </AddButton>
    </Container>
  );
}

export default observer(AllWordsPage);
