import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Container } from './AddWordsPage.style';
import TextField from '../../atoms/TextField/TextField';
import Button from '../../atoms/Button';
import { useAppContext } from '../../../contexts/AppContext';
import { observer } from 'mobx-react-lite';
import * as yup from 'yup';
import normalizeYupError from '../../../functions/normalizeYupError';

const validationSchema = yup.object().shape({
  translations: yup
    .string()
    .required('Обязательное поле')
    .matches(
      /^[А-Яа-я0-9,.\s!?\-*&=+_/|\\<>;]*$/i,
      'Используйте только рууские буквы, цифры и знаки препинания (,.!?-) и спец символы (*&=+_/|\\<>;)',
    ),
  separator: yup
    .string()
    .min(1, 'Минимум 1 символ')
    .matches(/^[*&=+_/|\\<>;]+$/i, 'Используйте только спецсимволы (*&=+_/|\\<>;)'),
});

const AddWordsPage = () => {
  const { store } = useAppContext();

  const [translations, setTranslations] = useState('');
  const [separator, setSeparator] = useState('/');

  const [translationsError, setTranslationsError] = useState('');
  const [separatorError, setSeparatorError] = useState('');

  const isProcessing = useRef(false);

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'translations') {
      setTranslations(e.target.value);
      return;
    }

    if (e.target.name === 'separator') {
      setSeparator(e.target.value);
      return;
    }
  };

  const createWordsFromTranslations = async () => {
    if (isProcessing.current) return;

    try {
      isProcessing.current = true;
      setTranslationsError('');
      setSeparatorError('');

      await validationSchema.validate({ translations, separator }, { abortEarly: false });
      await store.wordList.addWordsFromTranslation(translations.split(separator));

      setTranslations('');
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const yupErrors = normalizeYupError(error);

        if (yupErrors?.translations) setTranslationsError(yupErrors.translations[0]);
        if (yupErrors?.separator) setSeparatorError(yupErrors.separator[0]);
      } else {
        console.error('AddWordsPage.createWordsFromTranslations', error);
      }
    }

    isProcessing.current = false;
  };

  useEffect(() => {
    if (!store.wordList.isLoaded) store.wordList.fetchWords();
  }, [store.wordList.isLoaded]);

  return (
    <Container>
      <TextField
        label="Несколько переводов через разделитель"
        type="translations"
        name="translations"
        placeholder="Меня завут Том / Как тебя завут? / Я из Литвы / ..."
        value={translations}
        onChange={inputHandler}
        error={translationsError}
      />
      <TextField
        label="Разделитель"
        type="separator"
        name="separator"
        placeholder="*&=+_/|\<>;"
        value={separator}
        onChange={inputHandler}
        error={separatorError}
      />
      <Button size="small" fullWidth onClick={createWordsFromTranslations}>
        Добавить слова
      </Button>
    </Container>
  );
};

export default observer(AddWordsPage);
