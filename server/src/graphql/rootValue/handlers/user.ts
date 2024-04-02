import getUserFromContext from '../../../functions/getUserFromContext.js';
import { IContext, IUser } from '../../../types/index.js';

function user(_: never, context: IContext): Promise<IUser> {
  return getUserFromContext(context, { id: 1, name: 1 });
}

export default user;
