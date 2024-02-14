export interface ILanguageWord {
  id: string;
  word: string;
  translation: string;
}

export interface ILanguage {
  id: string;
  name: string;
  code: string;
  words: ILanguageWord[];
}
