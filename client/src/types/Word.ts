export interface IPhrasePart {
  text: string;
  id: number;
}

export interface ICheckedPhrasePart extends IPhrasePart {
  hasError: boolean;
}

export interface IWord {
  word: string;
  translation: string;
  id: string;
  lastUse: number;
  learned: boolean;
  isPhrase: boolean;
  phraseParts: IPhrasePart[] | null;
  checkPhraseParts: (phraseParts: IPhrasePart[]) => ICheckedPhrasePart[];
  updateLastUse: () => void;
}
