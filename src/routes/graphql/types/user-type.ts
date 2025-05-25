import { GraphQLFloat, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLList } from 'graphql/index.js';

import { UUIDType } from './uuid.js';
import { PostType } from './post-type.js';
import { GraphQLContext } from './context.js';
import { ProfileType } from './profile-type.js';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: ProfileType,
      resolve: async (parent: { id: string }, _, context: GraphQLContext) => {
        return await context.prisma.profile.findUnique({
          where: {
            userId: parent.id,
          },
        });
      }
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
      resolve: async (parent: { id: string }, _, context: GraphQLContext) => {
        return context.prisma.post.findMany({
          where: {
            authorId: parent.id,
          }
        });
      },
    },
  },
});