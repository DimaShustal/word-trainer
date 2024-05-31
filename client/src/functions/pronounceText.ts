type LanguageSettings = {
  voice: SpeechSynthesisVoice | undefined;
  lang: string;
};

type LanguageSettingsList = {
  [key: string]: () => LanguageSettings;
};

const LANGUAGE_SETTINGS: LanguageSettingsList = {
  pl: () => ({
    voice: window.speechSynthesis.getVoices().find(voice => voice.name.toLowerCase() === 'google polski'),
    lang: 'pl-PL',
  }),
  en: () => ({
    voice: window.speechSynthesis.getVoices().find(voice => voice.name.toLowerCase() === 'google us english'),
    lang: 'en-US',
  }),
};

async function pronounceText(text: string, languageCode: string, speed: number = 1) {
  if (!window.speechSynthesis.getVoices().length) {
    await new Promise(resolve => {
      window.speechSynthesis.onvoiceschanged = resolve;
    });
  }

  const utterance = new SpeechSynthesisUtterance(text);
  const settings = LANGUAGE_SETTINGS[languageCode]?.();

  utterance.rate = speed;
  if (settings?.voice) utterance.voice = settings.voice;
  if (settings?.lang) utterance.lang = settings.lang;
  window.speechSynthesis.speak(utterance);

  await new Promise(resolve => {
    utterance.onend = resolve;
    utterance.onerror = resolve;
  });
}

export default pronounceText;
