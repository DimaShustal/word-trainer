import mongoose from 'mongoose';
import { IContext } from '../../types/index.js';
import db from '../../db/index.js';
import { IUser } from '../../db/types.js';

async function getUserFromContext(context: IContext, projection?: mongoose.ProjectionType<IUser>): Promise<IUser> {
  if (!context?.user?.userId) {
    throw new Error('User not found');
  }

  const user = await db.User.findById(context.user.userId, projection || null);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

export default getUserFromContext;
