import React from 'react';
import { observer } from 'mobx-react-lite';
import wordList from '../../../stores/WordList';

const TrainingPage = observer(() => {
  return (
    <>
      {wordList.words.map(({ word, translation }, k) => (
        <div key={k}>
          <span>{word}</span>
          <span>{translation}</span>
        </div>
      ))}
    </>
  );
});

export default TrainingPage;
