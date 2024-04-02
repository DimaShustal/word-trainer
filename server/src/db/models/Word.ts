import mongoose from 'mongoose';
import { IWord } from '../../types/index.js';

const wordSchema: mongoose.Schema<IWord> = new mongoose.Schema({
  languageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Language', required: true },
  word: { type: String, required: true },
  translation: { type: String, required: true },
});

// TODO test index for addWordsFromTranslation.ts
// wordSchema.index({ languageId: 1 });
// wordSchema.index({ translation: 1 });

// wordSchema.index({ languageId: 1, translation: 1 });

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
