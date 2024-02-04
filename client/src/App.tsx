import { Routes, Route } from 'react-router-dom';
import {
  ALL_LANGUAGES_PATH,
  ALL_WORDS_PATH,
  PHRASE_CONSTRUCTOR_PATH,
  // ALL_TRAININGS_PATH,
  // ADD_WORDS_PATH,
  // TRAINING_TRANSLATION_PATH,
  // TRAINING_WRITING_PATH,
  // TRAINING_BLITZ_PATH,
  // TRAINING_RESULT_PATH,
} from 'constants/path';
import AllLanguagesPage from 'components/pages/AllLanguagesPage/AllLanguagesPage';
import AllWordsPage from 'components/pages/AllWordsPage/AllWordsPage';
import PhraseConstructorPage from 'components/pages/PhraseConstructorPage/PhraseConstructorPage';
// import AllTrainingsPage from 'components/pages/AllTrainingsPage/AllTrainingsPage';
// import AddWordPage from 'components/pages/AddWordPage/AddWordPage';
// import TrainingTranslationPage from 'components/pages/TrainingsTranslationPage/TrainingTranslationPage';
// import TrainingWritingPage from './components/pages/TrainingWritingPage/TrainingWritingPage';
// import TrainingBlitzPage from 'components/pages/TrainingBlitzPage/TrainingBlitzPage';
// import TrainingResultPage from 'components/pages/TrainingResultPage/TrainingResultPage';
import AppLayout from 'components/organisms/AppLayout/AppLayout';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Loader from './components/atoms/Loader/Loader';
import { useAppContext } from './contexts/AppContext';

function App() {
  const { store } = useAppContext();

  useEffect(() => {
    if (!store.user.isLoaded) store.user.fetchUser();
  }, [store.wordList.isLoaded]);

  if (!store.user.isLoaded) {
    return <Loader />;
  }

  return (
    <AppLayout>
      <Routes>
        <Route path={ALL_LANGUAGES_PATH} element={<AllLanguagesPage />} />
        <Route path={ALL_WORDS_PATH} element={<AllWordsPage />} />
        <Route path={PHRASE_CONSTRUCTOR_PATH} element={<PhraseConstructorPage />} />
        {/*<Route path={ALL_TRAININGS_PATH} element={<AllTrainingsPage />} />*/}
        {/*<Route path={ADD_WORDS_PATH} element={<AddWordPage />} />*/}
        {/*<Route path={TRAINING_TRANSLATION_PATH} element={<TrainingTranslationPage />} />*/}
        {/*<Route path={TRAINING_WRITING_PATH} element={<TrainingWritingPage />} />*/}
        {/*<Route path={TRAINING_BLITZ_PATH} element={<TrainingBlitzPage />} />*/}
        {/*<Route path={TRAINING_RESULT_PATH} element={<TrainingResultPage />} />*/}
      </Routes>
    </AppLayout>
  );
}

export default observer(App);
