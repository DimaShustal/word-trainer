import { observer } from 'mobx-react-lite';
import { AnswerContainer, AnswerItem, Container, WordsContainer } from './PhraseConstructorPage.style';
import { useAppContext } from '../../../contexts/AppContext';
import { FC, useEffect, useRef, useState } from 'react';
import Loader from '../../atoms/Loader/Loader';
import Typography from '../../atoms/Typography';
import Stack from '../../atoms/Stack';
import Button from '../../atoms/Button';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableItem from '../../atoms/DraggableItem/DraggableItem';
import { ICheckedPhrasePart, IPhrasePart, IWord } from '../../../types/Word';
import { Navigate } from 'react-router-dom';
import { ALL_WORDS_PATH } from '../../../constants/path';

interface IPhraseConstructorProps {
  refresh: () => void;
}

const randomizePhraseParts = (phraseParts: IPhrasePart[]) => () =>
  [...phraseParts].sort((a, b) => {
    if (a.id === 1) return -1;
    if (b.id === 1) return 1;
    return Math.random() - 0.5;
  });

const PhraseConstructor: FC<IPhraseConstructorProps> = observer(({ refresh }) => {
  const { store } = useAppContext();
  const phrase = useRef<IWord>(store.wordList.getRandomPhrase());
  const [phraseParts, setPhraseParts] = useState<IPhrasePart[]>(
    randomizePhraseParts(phrase.current?.phraseParts || []),
  );
  const [answers, setAnswers] = useState<ICheckedPhrasePart[]>([]);

  const moveAnswer = (fromIndex: number, toIndex: number) => {
    const updatedAnswers = [...answers];
    const [movedAnswer] = updatedAnswers.splice(fromIndex, 1);

    updatedAnswers.splice(toIndex, 0, movedAnswer);
    setAnswers(updatedAnswers);
  };

  const selectAnswer = (answer: IPhrasePart) => {
    const newPhraseParts = phraseParts.filter(phrasePart => phrasePart.id !== answer.id);
    const newAnswers = [...answers, { ...answer, hasError: false }];

    setPhraseParts(newPhraseParts);
    setAnswers(newAnswers);
  };

  const checkAnswers = () => {
    const checkedPhrasePart = phrase.current?.checkPhraseParts(answers) || [];

    if (checkedPhrasePart.some(({ hasError }) => hasError)) {
      setAnswers(checkedPhrasePart);
      return;
    }

    phrase.current?.updateLastUse();
    refresh();
  };

  if (!phrase.current) {
    return <Navigate to={ALL_WORDS_PATH} replace={true} />;
  }

  return (
    <Container>
      <Stack direction="column" gap={40} fullWidth>
        <Typography variant="h5" align="center">
          {phrase.current.translation}
        </Typography>

        <DndProvider backend={HTML5Backend}>
          <AnswerContainer>
            {answers.map((answer, index) => (
              <DraggableItem key={answer.id} id={answer.id} index={index} moveCard={moveAnswer}>
                <AnswerItem $hasError={answer.hasError}>{answer.text}</AnswerItem>
              </DraggableItem>
            ))}
          </AnswerContainer>
        </DndProvider>

        <WordsContainer>
          {phraseParts.map(answer => (
            <Button key={answer.id} type="secondary" size="small" onClick={() => selectAnswer(answer)}>
              {answer.text}
            </Button>
          ))}
        </WordsContainer>
      </Stack>

      <Stack gap={20}>
        <Button type="primary" size="medium" disabled={!!phraseParts.length} onClick={checkAnswers}>
          Проверить
        </Button>
        <Button type="text" size="medium" onClick={() => refresh()}>
          Не знаю
        </Button>
      </Stack>
    </Container>
  );
});

const PhraseConstructorPage = observer(() => {
  const { store } = useAppContext();
  const [key, setKey] = useState<number>(0);

  const refresh = () => {
    setKey(key + 1);
  };

  useEffect(() => {
    if (!store.wordList.isLoaded) store.wordList.fetchWords();
  }, [store.wordList.isLoaded]);

  if (!store.wordList.isLoaded) {
    return <Loader />;
  }

  if (!store.wordList.phrases?.length) {
    return <Navigate to={ALL_WORDS_PATH} replace={true} />;
  }

  return <PhraseConstructor key={key} refresh={refresh} />;
});

export default PhraseConstructorPage;
