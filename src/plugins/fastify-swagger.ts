import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';

const fastifyPluginSwagger: FastifyPluginAsync = async (fastify) => {
  const opts = {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'Useorigin Swagger',
        description:
          "This is a RESTful API, made with Node.js and Fastify.js created for supporting UseOrigin's Ordem API.",
        version: '0.1.0',
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here',
      },
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    exposeRoute: true,
  };

  fastify.register(require('fastify-swagger'), opts);
};

export default fp(fastifyPluginSwagger, '3.x');
