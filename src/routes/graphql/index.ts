import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { execute, ExecutionResult, parse, validate } from 'graphql';
import { GraphQLArgs } from 'graphql/graphql.js';
import depthLimit from 'graphql-depth-limit';

import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { finalSchema } from './schemas/schema.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma, httpErrors } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const graphql = async (args: GraphQLArgs): Promise<ExecutionResult> => {
        const doc = parse(args.source);

        const errors = validate(finalSchema, doc, [depthLimit(5)]);

        if (errors.length > 0) {
          return { errors };
        }

        return execute({
          schema: args.schema,
          document: doc,
          variableValues: args.variableValues,
          contextValue: args.contextValue,
        });
      };

      return graphql({
        schema: finalSchema,
        source: req.body.query,
        variableValues: req.body.variables,
        contextValue: {
          prisma,
          httpErrors,
        },
      });
    },
  });
};

export default plugin;
