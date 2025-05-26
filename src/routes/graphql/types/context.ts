import { PrismaClient } from '@prisma/client';
import { HttpErrors } from '@fastify/sensible/lib/httpError.js';
import { Loaders } from '../loaders/loader.js';

export interface GraphQLContext {
  prisma: PrismaClient;
  httpErrors: HttpErrors;
  loaders: Loaders,
}