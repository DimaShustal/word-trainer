import { v2 } from '@google-cloud/translate';

const translate = new v2.Translate({ key: process.env.GOOGLE_TRANSLATE_API_KEY, autoRetry: true, maxRetries: 1 });

async function translateText(text: string[], fromLanguage: string, toLanguage: string) {
  try {
    const [translations] = await translate.translate(text, {
      from: fromLanguage,
      to: toLanguage,
    });

    return Array.isArray(translations) ? translations : [translations];
  } catch (error) {
    console.error('translateText: ', error);

    return [];
  }
}

export default translateText;
