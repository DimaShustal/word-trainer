import { makeAutoObservable } from 'mobx';

interface IWord {
  word: string;
  translation: string;
}

class Word {
  word: string;
  translation: string;
  id = Math.round(Math.random() * Math.pow(10, 16));
  // category: string;
  // progressPercent: number;
  // status: string; LEARNED / LEARNING

  constructor({ word, translation }: IWord) {
    makeAutoObservable(this);

    this.word = word;
    this.translation = translation;
  }

  // increaseTimer() {
  //   this.secondsPassed += 1;
  // }
}

class WordList {
  words: Word[] = [];

  constructor(words: Word[]) {
    makeAutoObservable(this);
    this.words = words;
  }

  // increaseTimer() {
  //   this.secondsPassed += 1;
  // }
}

const data: IWord[] = [
  { word: 'violently', translation: 'яростно' },
  { word: 'suffering from', translation: 'страдать от' },
  { word: 'passed out', translation: 'потерял сознание' },
  { word: 'grief', translation: 'горе' },
  { word: 'unbearable', translation: 'невыносимый' },
];

const words = data.map(wordData => new Word(wordData));
const wordList = new WordList(words);

export default wordList;
