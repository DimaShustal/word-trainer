import bcrypt from 'bcrypt';
import { IContext, IUser } from '../../../../types/index.js';
import { generateToken } from '../../../functions/authorization.js';
import { IUserCredentials } from '../types.js';
import loginValidationSchema from '../../../constants/loginValidationSchema.js';

async function createUser({ name, password }: IUserCredentials, context: IContext): Promise<string> {
  await loginValidationSchema.validate({ name, password }, { abortEarly: false });

  const existingUser = context.db.users.find(user => user.name === name);

  if (existingUser) {
    throw new Error('Username already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const newUser: IUser = { id: String(context.db.users.length + 1), name, passwordHash, salt, languages: [] };

  context.db.users.push(newUser);

  return generateToken(newUser);
}

export default createUser;
