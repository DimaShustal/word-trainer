import { observer } from 'mobx-react-lite';
import { useAppContext } from '../../../contexts/AppContext';
import { useEffect, useState } from 'react';
import Loader from '../../atoms/Loader/Loader';
import { Navigate } from 'react-router-dom';
import { ALL_WORDS_PATH } from '../../../constants/path';
import PhraseConstructor from '../../organisms/PhraseConstructor/PhraseConstructor';

function PhraseConstructorPage() {
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
}

export default observer(PhraseConstructorPage);
