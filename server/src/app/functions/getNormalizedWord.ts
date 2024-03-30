interface LanguageRegex {
  [key: string]: string;
}

const LANGUAGE_REGEX: LanguageRegex = {
  ru: 'а-я',
};

function getNormalizedWord(word: string, languageCode: string) {
  const regex = LANGUAGE_REGEX[languageCode];

  if (!word || typeof word !== 'string' || !languageCode || !regex || !new RegExp(`[${regex}]`, 'ig').test(word)) {
    return '';
  }

  return word
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/\n/g, ' ')
    .replace(new RegExp(`[^${regex}0-9.,;!?\\- ]`, 'g'), '')
    .replace(new RegExp(`^[^${regex}0-9]+`), '')
    .replace(/\s*([.!?])\s*$/, '$1')
    .trim();
}

export default getNormalizedWord;
