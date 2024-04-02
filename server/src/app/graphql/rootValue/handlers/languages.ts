import db from '../../../../db/index.js';
import { ILanguage } from '../../../../db/types.js';

function languages(): Promise<ILanguage[]> {
  return db.Language.find().sort({ name: 1 });
}

export default languages;
