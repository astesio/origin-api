import path from 'path';
import S from 'fluent-schema';
import { config } from 'dotenv';
import envSchema from 'env-schema';

const { NODE_ENV } = process.env;

export default function loadConfig(): void {
  const result = config({
    path: path.join(__dirname, `../../${NODE_ENV || 'development'}.env`),
  });

  if (result.error) {
    return console.log(result);
    // throw new Error(result.error);
  }

  envSchema({
    data: result.parsed,
    schema: S.object()
      .prop('NODE_ENV', S.string().enum(['development', 'testing', 'production']).required())
      .prop('API_HOST', S.string().required())
      .prop('API_PORT', S.string().required()),
  });
}
