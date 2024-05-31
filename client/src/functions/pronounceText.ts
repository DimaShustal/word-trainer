type LanguageSettings = {
  voice: SpeechSynthesisVoice | undefined;
  lang: string;
};

type LanguageSettingsList = {
  [key: string]: LanguageSettings;
};

const LANGUAGE_SETTINGS: LanguageSettingsList = {
  pl: {
    voice: window.speechSynthesis.getVoices().find(voice => voice.name === 'Google Polski'),
    lang: 'pl-PL',
  },
  en: {
    voice: window.speechSynthesis.getVoices().find(voice => voice.name === 'Google US English'),
    lang: 'en-US',
  },
};

function pronounceText(text: string, languageCode: string, speed: number = 1) {
  const utterance = new SpeechSynthesisUtterance(text);
  const settings = LANGUAGE_SETTINGS[languageCode];

  utterance.rate = speed;
  if (settings?.voice) utterance.voice = settings.voice;
  if (settings?.lang) utterance.lang = settings.lang;
  window.speechSynthesis.speak(utterance);
}

export default pronounceText;
