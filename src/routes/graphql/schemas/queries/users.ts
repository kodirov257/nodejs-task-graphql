import { GraphQLList, GraphQLNonNull } from 'graphql';
import { UserType } from '../../types/userType.js';
import { GraphQLContext } from '../../types/context.js';
import { UUIDType } from '../../types/uuid.js';

export const getUsers = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
  resolve: async (_, _args, context: GraphQLContext) => {
    return context.prisma.user.findMany();
  }
}

export const getUser = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_, args: { id: string }, context: GraphQLContext) => {
    return await context.prisma.user.findUnique({
      where: {
        id: args.id,
      },
    });
  }
}