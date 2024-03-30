import { IContext, IUserLanguage } from '../../../../types/index.js';
import getUserFromContext from '../../../functions/getUserFromContext.js';
import { IUserResponse } from '../types.js';

async function user(_: never, context: IContext): Promise<IUserResponse | undefined> {
  const user = getUserFromContext(context);
  const languages = user?.languages?.map((language: IUserLanguage) =>
    context.db.languages.find(({ id }) => id === language.id),
  );

  return { ...user, languages };
}

export default user;
