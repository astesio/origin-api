import handlePlugin from 'fastify-plugin';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import BodySchema from './schemas/body.json';
import ResponseSchema from './schemas/response.json';

import { BodySchema as BodySchemaInterface } from './interfaces/body';

import { controller } from './controller';

export default handlePlugin(
  async (server: FastifyInstance, opts: FastifyPluginOptions): Promise<void> => {
    server.route<{
      Body: BodySchemaInterface;
    }>({
      method: 'POST',
      url: '/profile/risk',
      schema: {
        body: BodySchema,
        response: {
          200: ResponseSchema,
        },
      },
      preValidation: controller.preValidation,
      handler: controller.handler,
    });
  },
);
