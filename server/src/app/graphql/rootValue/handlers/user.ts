import { IContext } from '../../../../types/index.js';
import getUserFromContext from '../../../functions/getUserFromContext.js';
import { IUser } from '../../../../db/types.js';

function user(_: never, context: IContext): Promise<IUser> {
  return getUserFromContext(context, { id: 1, name: 1 });
}

export default user;
