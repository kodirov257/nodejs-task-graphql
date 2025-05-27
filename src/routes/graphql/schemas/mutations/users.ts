import { GraphQLNonNull, GraphQLString } from 'graphql/index.js';

import { UserType } from '../../types/user-type.js';
import { CreateUserInput } from '../../dto/create-user-input.js';
import { GraphQLContext } from '../../types/context.js';
import { UUIDType } from '../../types/uuid.js';
import { ChangeUserInput } from '../../dto/change-user-input.js';

export const createUser = {
  type: new GraphQLNonNull(UserType),
  args: {
    dto: { type: new GraphQLNonNull(CreateUserInput) },
  },
  resolve: async (_, args: { dto: { name: string, balance: number } }, context: GraphQLContext) => {
    return context.prisma.user.create({
      data: args.dto,
    });
  },
};

export const changeUser = {
  type: new GraphQLNonNull(UserType),
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(ChangeUserInput) },
  },
  resolve: async (_, args: { id: string, dto: { name: string, balance: number } }, context: GraphQLContext) => {
    return context.prisma.user.update({
      where: { id: args.id },
      data: args.dto,
    });
  }
};

export const deleteUser = {
  type: new GraphQLNonNull(GraphQLString),
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_, args: { id: string }, context: GraphQLContext) => {
    await context.prisma.user.delete({
      where: {
        id: args.id,
      },
    });

    return args.id;
  }
};