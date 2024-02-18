import bcrypt from 'bcrypt';
import { IContext } from '../../../../types/index.js';
import { generateToken } from '../../../functions/authorization.js';
import { IUserCredentials } from '../types.js';

async function login({ name, password }: IUserCredentials, context: IContext): Promise<string> {
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
