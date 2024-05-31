import { observer } from 'mobx-react-lite';
import { AnswerContainer, AnswerItem, Container, WordsContainer } from './PhraseConstructor.style';
import { useAppContext } from '../../../contexts/AppContext';
import { useRef, useState } from 'react';
import Typography from '../../atoms/Typography';
import Stack from '../../atoms/Stack';
import Button from '../../atoms/Button';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import DraggableItem from '../../atoms/DraggableItem/DraggableItem';
import { ICheckedPhrasePart, IPhrasePart, IWord } from '../../../types/Word';
import { Navigate } from 'react-router-dom';
import { ALL_WORDS_PATH } from '../../../constants/path';
import useResolutionType from '../../../functions/useResolutionType';
import { RESOLUTION_TYPES } from '../../../constants/resolution';
import pronounceText from '../../../functions/pronounceText';

interface IPhraseConstructorProps {
  refresh: () => void;
}

const randomizePhraseParts = (phraseParts: IPhrasePart[]) => () =>
  [...phraseParts].sort((a, b) => {
    if (a.id === 1) return -1;
    if (b.id === 1) return 1;
    return Math.random() - 0.5;
  });

function PhraseConstructor({ refresh }: IPhraseConstructorProps) {
  const { store } = useAppContext();
  const phrase = useRef<IWord | null>(store.wordList.getRandomPhrase());
  const [phraseParts, setPhraseParts] = useState<IPhrasePart[]>(
    randomizePhraseParts(phrase.current?.phraseParts || []),
  );
  const [answers, setAnswers] = useState<ICheckedPhrasePart[]>([]);
  const resolutionType = useResolutionType();
  const isDesktop = resolutionType === RESOLUTION_TYPES.DESKTOP;

  const pronounceTextAndRefresh = async () => {
    if (phrase.current && store.user.language) {
      await pronounceText(phrase.current.word, store.user.language.code);
    }

    refresh();
  };

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
    pronounceTextAndRefresh();
  };

  if (!phrase.current) {
    // TODO: add alert about all phrases are learned
    return <Navigate to={ALL_WORDS_PATH} replace={true} />;
  }

  return (
    <Container>
      <Stack direction="column" gap={40} fullWidth>
        <Typography variant="h5" align="center">
          {phrase.current?.translation}
        </Typography>

        <DndProvider backend={isDesktop ? HTML5Backend : TouchBackend}>
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
        <Button type="text" size="medium" onClick={pronounceTextAndRefresh}>
          Не знаю
        </Button>
      </Stack>
    </Container>
  );
}

export default observer(PhraseConstructor);
