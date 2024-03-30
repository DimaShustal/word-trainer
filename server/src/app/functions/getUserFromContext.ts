import { IContext, IUser } from '../../types/index.js';

function getUserFromContext(context: IContext) {
  if (!context?.user?.userId) {
    throw new Error('User not found');
  }

  const user = context.db.users.find((user: IUser) => user.id === context?.user?.userId);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

export default getUserFromContext;
