import bcrypt from 'bcrypt';
import { IContext } from '../../../../types/index.js';
import { generateToken } from '../../../functions/authorization.js';
import { IUserCredentials } from '../types.js';
import loginValidationSchema from '../../../constants/loginValidationSchema.js';

async function login({ name, password }: IUserCredentials, context: IContext): Promise<string> {
  await loginValidationSchema.validate({ name, password }, { abortEarly: false });

  const user = context.db.users.find(u => u.name === name);

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
