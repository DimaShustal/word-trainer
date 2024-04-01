import mongoose from 'mongoose';

const userWordSchema = new mongoose.Schema({
  wordId: { type: mongoose.Schema.Types.ObjectId, ref: 'Word', required: true },
  languageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Language', required: true },
  lastUse: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  word: { type: String, required: true },
  translation: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, minlength: 6, maxLength: 30 },
  passwordHash: { type: String, required: true },
  salt: { type: String, required: true },
  words: [userWordSchema],
});

userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

userSchema.set('toJSON', {
  virtuals: true,
});

userSchema.set('toObject', {
  virtuals: true,
});

const User = mongoose.model('User', userSchema);

export default User;
