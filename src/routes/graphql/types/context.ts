import { PrismaClient } from '@prisma/client';
import { HttpErrors } from '@fastify/sensible/lib/httpError.js';

export interface GraphQLContext {
  prisma: PrismaClient;
  httpErrors: HttpErrors;
}