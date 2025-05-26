import { GraphQLFloat, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { GraphQLList } from 'graphql/index.js';

import { UUIDType } from './uuid.js';
import { PostType } from './post-type.js';
import { GraphQLContext } from './context.js';
import { ProfileType } from './profile-type.js';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: ProfileType,
      resolve: async (parent: { id: string }, _, context: GraphQLContext) => {
        return context.loaders.profileLoader.load(parent.id);
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
      resolve: async (parent: { id: string }, _, context: GraphQLContext) => {
        return context.loaders.postLoader.load(parent.id);
      },
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: async (parent: { id: string }, _, context: GraphQLContext) => {
        return context.loaders.subscriptionLoader.load(parent.id);
      },
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: async (parent: { id: string }, _, context: GraphQLContext) => {
        return context.loaders.subscriberLoader.load(parent.id);
      },
    },
  }),
});