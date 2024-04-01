import mongoose from 'mongoose';

const languageSchema = new mongoose.Schema({
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

const Language = mongoose.model('Language', languageSchema);

export default Language;
