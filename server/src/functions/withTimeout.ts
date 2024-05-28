import { SECOND_IN_MILLISECONDS } from '../constants/time.js';

async function requestTimeout(): Promise<Error> {
  await new Promise(resolve => setTimeout(resolve, SECOND_IN_MILLISECONDS));

  return new Error('Request timeout');
}

const withTimeout = <T extends (...args: Parameters<T>) => ReturnType<T>>(callback: T) => {
  return async (...args: Parameters<T>): Promise<ReturnType<T> | Error> => {
    return Promise.race([callback(...args), requestTimeout()]);
  };
};

export default withTimeout;
