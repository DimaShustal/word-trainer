import { observer } from 'mobx-react-lite';
import { AnswerContainer, AnswerItem, Container, WordsContainer } from './PhraseConstructorPage.style';
import { useAppContext } from '../../../contexts/AppContext';
import { useEffect, useState } from 'react';
import Loader from '../../atoms/Loader/Loader';
import Typography from '../../atoms/Typography';
import Stack from '../../atoms/Stack';
import Button from '../../atoms/Button';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableItem from '../../atoms/DraggableItem/DraggableItem';

function PhraseConstructorPage() {
  const { store } = useAppContext();
  const [answers, setAnswers] = useState([
    { text: 'jestem', id: 1 },
    { text: 'z', id: 2 },
    { text: 'firmy', id: 3 },
    { text: 'ots', id: 4 },
    { text: 'i', id: 5 },
    { text: 'zapomniałem', id: 6 },
    { text: 'karty', id: 7 },
    { text: 'czy', id: 8 },
    { text: 'możesz', id: 9 },
    { text: 'mi', id: 10 },
    { text: 'pomóc', id: 11 },
  ]);

  const moveCard = (fromIndex: number, toIndex: number) => {
    const updatedAnswers = [...answers];
    const [movedAnswer] = updatedAnswers.splice(fromIndex, 1);

    updatedAnswers.splice(toIndex, 0, movedAnswer);
    setAnswers(updatedAnswers);
  };

  useEffect(() => {
    if (!store.wordList.isLoaded) store.wordList.fetchWords();
  }, [store.wordList.isLoaded]);

  if (!store.wordList.isLoaded) {
    return <Loader />;
  }

  const { translation, word } = store.wordList.words[2];

  const words = word
    .toLowerCase()
    .trim()
    .replace(/[.,?!]+/gi, '')
    .replace(/\s+/gi, ' ')
    .split(' ');

  return (
    <Container>
      <Stack direction="column" gap={40} fullWidth>
        <Typography variant="h5" align="center">
          {translation}
        </Typography>

        <DndProvider backend={HTML5Backend}>
          <AnswerContainer>
            {answers.map((answer, index) => (
              <DraggableItem key={answer.id} id={answer.id} index={index} moveCard={moveCard}>
                <AnswerItem>{answer.text}</AnswerItem>
              </DraggableItem>
            ))}
          </AnswerContainer>
        </DndProvider>

        <WordsContainer>
          {words.map((substring, id) => (
            <Button key={id} type="secondary" size="small" onClick={() => null}>
              {substring}
            </Button>
          ))}
        </WordsContainer>
      </Stack>

      <Stack gap={20}>
        <Button type="primary" size="medium" onClick={() => null}>
          Проверить
        </Button>
        <Button type="text" size="medium" onClick={() => null}>
          Не знаю
        </Button>
      </Stack>
    </Container>
  );
}

export default observer(PhraseConstructorPage);
