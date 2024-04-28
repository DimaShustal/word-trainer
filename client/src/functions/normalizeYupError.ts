import { ValidationError } from 'yup';

type YupErrors = Record<string, string[]>;

function normalizeYupError(error: any): YupErrors | null {
  if (error instanceof ValidationError && error.inner?.length > 0) {
    return error.inner.reduce((result: YupErrors, yupError) => {
      if (!yupError.path) return result;
      if (!result[yupError.path]) result[yupError.path] = [];
      result[yupError.path].push(yupError.message);

      return result;
    }, {});
  }

  return null;
}

export default normalizeYupError;
