import bcrypt from 'bcrypt';
import { generateToken } from '../../../functions/authorization.js';
import { IUserCredentials } from '../../../types/index.js';
import loginValidationSchema from '../../../constants/loginValidationSchema.js';
import db from '../../../db/index.js';

async function login({ name, password }: IUserCredentials): Promise<string> {
  await loginValidationSchema.validate({ name, password }, { abortEarly: false });

  const user = await db.User.findOne({ name }, { id: 1, name: 1, passwordHash: 1 });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  return generateToken(user);
}

export default login;
