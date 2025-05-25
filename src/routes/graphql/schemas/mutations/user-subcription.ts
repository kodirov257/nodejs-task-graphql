import { UUIDType } from '../../types/uuid.js';
import { GraphQLNonNull, GraphQLString } from 'graphql';
import { GraphQLContext } from '../../types/context.js';

export const subscribeTo = {
  type: new GraphQLNonNull(GraphQLString),
  args: {
    userId: { type: new GraphQLNonNull(UUIDType) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_, args: { userId: string, authorId: string }, context: GraphQLContext) => {
    await context.prisma.subscribersOnAuthors.create({
      data: {
        subscriberId: args.userId,
        authorId: args.authorId,
      },
    });

    return 'Subscribed';
  },
};

export const unsubscribeFrom = {
  type: new GraphQLNonNull(GraphQLString),
  args: {
    userId: { type: new GraphQLNonNull(UUIDType) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_, args: { userId: string, authorId: string }, context: GraphQLContext) => {
    await context.prisma.subscribersOnAuthors.delete({
      where: {
        subscriberId_authorId: {
          subscriberId: args.userId,
          authorId: args.authorId,
        },
      },
    });

    return 'Unsubscribed';
  },
};