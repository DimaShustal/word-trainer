import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export interface JwtData {
  name: string;
  userId: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseAuthorizationHeader(request: any): JwtData | undefined {
  const { authorization } = request.headers;

  if (!authorization) {
    return undefined;
  }

  const [prefix, token] = authorization.split(' ');

  if (!token || !prefix || prefix.toLowerCase() !== 'bearer') {
    return undefined;
  }

  return jwt.verify(token, JWT_SECRET_KEY) as JwtData;
}
