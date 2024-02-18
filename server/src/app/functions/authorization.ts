import jwt from 'jsonwebtoken';
import { IJwtData, IUser } from '../../types/index.js';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseAuthorizationHeader(request: any): IJwtData | undefined {
  const { authorization } = request.headers;

  if (!authorization) {
    return undefined;
  }

  const [prefix, token] = authorization.split(' ');

  if (!token || !prefix || prefix.toLowerCase() !== 'bearer') {
    return undefined;
  }

  try {
    return jwt.verify(token, JWT_SECRET_KEY) as IJwtData;
  } catch (error) {
    if (!(error instanceof jwt.TokenExpiredError)) {
      console.error('Token verification error:', error);
    }

    return undefined;
  }
}

export const generateToken = (user: IUser): string => {
  return jwt.sign({ name: user.name, userId: user.id }, JWT_SECRET_KEY, {
    expiresIn: '24h',
  });
};
