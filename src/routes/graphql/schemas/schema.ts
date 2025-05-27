import { GraphQLSchema } from 'graphql';

import { query } from './query.js';
import { mutation } from './mutation.js';

export const finalSchema = new GraphQLSchema({
  query: query,
  mutation: mutation,
});