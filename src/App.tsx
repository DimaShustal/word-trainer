import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  ALL_LANGUAGES_PATH,
  ALL_WORDS_PATH,
  ALL_TRAININGS_PATH,
  ADD_WORDS_PATH,
  TRAINING_TRANSLATION_PATH,
  TRAINING_WRITING_PATH,
  TRAINING_BLITZ_PATH,
  TRAINING_RESULT_PATH,
} from 'constants/path';
import AllLanguagesPage from 'components/pages/AllLanguagesPage/AllLanguagesPage';
import AllWordsPage from 'components/pages/AllWordsPage/AllWordsPage';
import AllTrainingsPage from 'components/pages/AllTrainingsPage/AllTrainingsPage';
import AddWordPage from 'components/pages/AddWordPage/AddWordPage';
import TrainingTranslationPage from 'components/pages/TrainingsTranslationPage/TrainingTranslationPage';
import TrainingWritingPage from './components/pages/TrainingWritingPage/TrainingWritingPage';
import TrainingBlitzPage from 'components/pages/TrainingBlitzPage/TrainingBlitzPage';
import TrainingResultPage from 'components/pages/TrainingResultPage/TrainingResultPage';

function App() {
  return (
    <Routes>
      <Route path={ALL_LANGUAGES_PATH} element={<AllLanguagesPage />} />
      <Route path={ALL_WORDS_PATH} element={<AllWordsPage />} />
      <Route path={ALL_TRAININGS_PATH} element={<AllTrainingsPage />} />
      <Route path={ADD_WORDS_PATH} element={<AddWordPage />} />
      <Route path={TRAINING_TRANSLATION_PATH} element={<TrainingTranslationPage />} />
      <Route path={TRAINING_WRITING_PATH} element={<TrainingWritingPage />} />
      <Route path={TRAINING_BLITZ_PATH} element={<TrainingBlitzPage />} />
      <Route path={TRAINING_RESULT_PATH} element={<TrainingResultPage />} />
    </Routes>
  );
}

export default App;
