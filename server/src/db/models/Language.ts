import mongoose from 'mongoose';
import { ILanguage } from '../../types/index.js';

const languageSchema = new mongoose.Schema<ILanguage>({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  translationCode: { type: String, required: true },
});

languageSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

languageSchema.set('toJSON', {
  virtuals: true,
});

languageSchema.set('toObject', {
  virtuals: true,
});

const Language = mongoose.model<ILanguage>('Language', languageSchema);

export default Language;
