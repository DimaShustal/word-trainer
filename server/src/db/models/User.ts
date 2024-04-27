import mongoose from 'mongoose';
import { IUser, IUserWord } from '../../types/index.js';

const userWordSchema = new mongoose.Schema<IUserWord>({
  wordId: { type: mongoose.Schema.Types.ObjectId, ref: 'Word', required: true },
  languageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Language', required: true },
  lastUse: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  word: { type: String, required: true },
  translation: { type: String, required: true },
});

userWordSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

userWordSchema.set('toJSON', {
  virtuals: true,
});

userWordSchema.set('toObject', {
  virtuals: true,
});

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true, unique: true, minlength: 6, maxLength: 30 },
  passwordHash: { type: String, required: true },
  salt: { type: String, required: true },
  words: [userWordSchema],
});

userSchema.index({ name: 1 });

userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

userSchema.set('toJSON', {
  virtuals: true,
});

userSchema.set('toObject', {
  virtuals: true,
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
