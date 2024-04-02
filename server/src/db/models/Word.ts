import mongoose from 'mongoose';
import { IWord } from '../types.js';

// TODO add index to languageId and translation (for addWordsFromTranslation.ts)
const wordSchema: mongoose.Schema<IWord> = new mongoose.Schema({
  languageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Language', required: true },
  word: { type: String, required: true },
  translation: { type: String, required: true },
});

wordSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

wordSchema.set('toJSON', {
  virtuals: true,
});

wordSchema.set('toObject', {
  virtuals: true,
});

const Word: mongoose.Model<IWord> = mongoose.model('Word', wordSchema);

export default Word;
