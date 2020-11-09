import { Server, IncomingMessage, ServerResponse } from 'http';
import fastify, { FastifyInstance } from 'fastify';

import loadConfig from './config/config';

loadConfig();

import fastifyPluginSwagger from './plugins/fastify-swagger';
import riskProfileRouter from './modules/risk-profiler/router';

const { NODE_ENV, LOG_LEVEL, API_HOST, API_PORT } = process.env;

export async function createServer() {
  const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
    logger: {
      level: LOG_LEVEL,
    },
  });

  server.register(fastifyPluginSwagger);
  server.register(riskProfileRouter);

  await server.ready();
  // server.swagger();

  return server;
}

const startServer = async (): Promise<void> => {
  process.on('uncaughtException', (error) => {
    console.error(error);
    process.exit(1);
  });

  process.on('unhandledRejection', (error) => {
    console.error(error);
    process.exit(1);
  });

  let server;
  try {
    server = await createServer();
    await server.listen(API_PORT, API_HOST);
  } catch (error) {
    console.error(error);

    if (NODE_ENV === 'production') {
      for (const signal of ['SIGINT', 'SIGTERM']) {
        process.on(signal, () =>
          server.close().then((error) => {
            console.log(`close application on ${signal}`);
            process.exit(error ? 1 : 0);
          }),
        );
      }
    }
  }
};

if (NODE_ENV !== 'test') {
  startServer();
}
