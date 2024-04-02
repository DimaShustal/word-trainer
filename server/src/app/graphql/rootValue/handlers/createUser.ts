import bcrypt from 'bcrypt';
import { generateToken } from '../../../functions/authorization.js';
import { IUserCredentials } from '../types.js';
import loginValidationSchema from '../../../constants/loginValidationSchema.js';
import db from '../../../../db/index.js';

async function createUser({ name, password }: IUserCredentials): Promise<string> {
  await loginValidationSchema.validate({ name, password }, { abortEarly: false });

  const existingUser = await db.User.findOne({ name }, { id: 1, name: 1 });

  if (existingUser) {
    throw new Error('Username already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const newUser = new db.User({ name, passwordHash, salt, words: [] });

  await newUser.save();

  return generateToken(newUser);
}

export default createUser;
