import { ValidationError } from 'yup';

function normalizeYupError(error) {
  if (error instanceof ValidationError && error.inner?.length > 0) {
    return error.inner.reduce((result, yupError) => {
      if (!yupError.path) return result;
      if (!result[yupError.path]) result[yupError.path] = [];
      result[yupError.path].push(yupError.message);

      return result;
    }, {});
  }

  return null;
}

export default normalizeYupError;
