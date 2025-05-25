import { GraphQLSchema } from 'graphql';
import { query } from './query.js';

export const finalSchema = new GraphQLSchema({
  query: query,
});