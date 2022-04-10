import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TRAINING_PATH, TRAINING_PREVIEW_PATH } from './constants/path';

// TrainingPreviewPage:
// - shows words and additional information (success rating, translation)
// - button that selects 20 random words to practice
// - checkboxes for choosing words to practice

// TrainingPage:
// - word writing exercise
// - russian translation exercise
// - english translation exercise

function App() {
  return (
    <Routes>
      <Route path={TRAINING_PREVIEW_PATH} element={<div>TrainingPreviewPage</div>} />
      <Route path={TRAINING_PATH} element={<div>TrainingPage</div>} />
    </Routes>
  );
}

export default App;
