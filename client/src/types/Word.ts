export interface IWordData {
  word: string;
  translation: string;
  id: number;
  last_use: number;
  category: number;
  learned: boolean;
}

export interface IPhrasePart {
  text: string;
  id: number;
}

export interface ICheckedPhrasePart extends IPhrasePart {
  hasError: boolean;
}

export interface IWord extends IWordData {
  isPhrase: boolean;
  phraseParts: IPhrasePart[] | null;
  checkPhraseParts: (phraseParts: IPhrasePart[]) => ICheckedPhrasePart[];
  updateLastUse: () => void;
}
