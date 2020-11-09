import { FastifyRequest, FastifyReply } from 'fastify';

import { business } from './business';

import { BodySchema as BodySchemaInterface } from './interfaces/body';

export const controller = {
  preValidation: (
    request: FastifyRequest<{ Body: BodySchemaInterface }>,
    reply: FastifyReply,
    done: Function,
  ) => {
    request.body.age = Number(String(request.body.age));
    request.body.income = Number(String(request.body.income));
    request.body.dependents = Number(String(request.body.dependents));
    request.body.vehicle.year = Number(String(request.body.vehicle.year));
    done();
  },

  handler: async (req: FastifyRequest<{ Body: BodySchemaInterface }>, reply: FastifyReply) => {
    const payload = req.body;
    const riskProfilerResponse = await business.riskProfiler(payload);
    return reply.code(200).send(riskProfilerResponse);
  },
};
