import mongoose from 'mongoose';
import { IWord } from '../../types/index.js';

const wordSchema = new mongoose.Schema<IWord>({
  languageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Language', required: true },
  word: { type: String, required: true },
  translation: { type: String, required: true },
});

wordSchema.index({ languageId: 1, translation: 1 });

wordSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

wordSchema.set('toJSON', {
  virtuals: true,
});

wordSchema.set('toObject', {
  virtuals: true,
});

const Word = mongoose.model<IWord>('Word', wordSchema);

export default Word;
