import { Routes, Route } from 'react-router-dom';
import {
  ADD_WORDS_PATH,
  ALL_LANGUAGES_PATH,
  ALL_WORDS_PATH,
  LOGIN_PATH,
  PHRASE_CONSTRUCTOR_PATH,
  ROOT_PATH,
  // ALL_TRAININGS_PATH,
  // TRAINING_TRANSLATION_PATH,
  // TRAINING_WRITING_PATH,
  // TRAINING_BLITZ_PATH,
  // TRAINING_RESULT_PATH,
} from 'constants/path';
import RootPage from './components/pages/RootPage/RootPage';
import LoginPage from './components/pages/LoginPage/LoginPage';
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
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import useLogoutListener from './functions/useLogoutListener';
import AuthorizedRoute from './components/organisms/AuthorizedRoute/AuthorizedRoute';
import AddWordsPage from './components/pages/AddWordsPage/AddWordsPage';

if (process.env.NODE_ENV !== 'production') {
  loadDevMessages();
  loadErrorMessages();
}

function App() {
  const { store } = useAppContext();

  useEffect(() => {
    if (store.user.isLogged) {
      if (!store.user.isLoaded) store.user.fetchUser();
      if (!store.languages.isLoaded) store.languages.fetchLanguages();
    }
  }, [store.user.isLogged]);

  useLogoutListener(store);

  if (store.user.isLogged && !store.user.isLoaded) {
    return <Loader />;
  }

  return (
    <AppLayout>
      <Routes>
        <Route path={ROOT_PATH} element={<RootPage />} />
        <Route path={LOGIN_PATH} element={<LoginPage />} />
        <Route
          path={ALL_LANGUAGES_PATH}
          element={
            <AuthorizedRoute>
              <AllLanguagesPage />
            </AuthorizedRoute>
          }
        />
        <Route
          path={ALL_WORDS_PATH}
          element={
            <AuthorizedRoute>
              <AllWordsPage />
            </AuthorizedRoute>
          }
        />
        <Route
          path={PHRASE_CONSTRUCTOR_PATH}
          element={
            <AuthorizedRoute>
              <PhraseConstructorPage />
            </AuthorizedRoute>
          }
        />
        <Route
          path={ADD_WORDS_PATH}
          element={
            <AuthorizedRoute>
              <AddWordsPage />
            </AuthorizedRoute>
          }
        />
        {/*<Route path={ALL_TRAININGS_PATH} element={<AllTrainingsPage />} />*/}
        {/*<Route path={TRAINING_TRANSLATION_PATH} element={<TrainingTranslationPage />} />*/}
        {/*<Route path={TRAINING_WRITING_PATH} element={<TrainingWritingPage />} />*/}
        {/*<Route path={TRAINING_BLITZ_PATH} element={<TrainingBlitzPage />} />*/}
        {/*<Route path={TRAINING_RESULT_PATH} element={<TrainingResultPage />} />*/}
      </Routes>
    </AppLayout>
  );
}

export default observer(App);
