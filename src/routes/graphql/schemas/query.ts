import { GraphQLObjectType } from 'graphql';
import { GraphQLString } from 'graphql/index.js';

export const query = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    testString: {
      type: GraphQLString,
      resolve: async (parent, args, context, info) => {
        return 'Hello World!';
      }
    }
  }
});