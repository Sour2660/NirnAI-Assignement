import 'dotenv/config';

const required = (name: string): string => {
  const v = process.env[name];
  if (!v) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return v;
};

export const env = {
  DATABASE_URL: required('DATABASE_URL'),
  PORT: parseInt(process.env.PORT || '4000', 10),
  LOGIN_USERNAME: required('LOGIN_USERNAME'),
  LOGIN_PASSWORD: required('LOGIN_PASSWORD'),
  JWT_SECRET: required('JWT_SECRET'),
  TRANSLATION_PROVIDER: process.env.TRANSLATION_PROVIDER || 'stub'
};