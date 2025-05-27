import { GraphQLList, GraphQLNonNull } from 'graphql';

import { GraphQLContext } from '../../types/context.js';
import { UUIDType } from '../../types/uuid.js';
import { ProfileType } from '../../types/profile-type.js';

export const getProfiles = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ProfileType))),
  resolve: async (_, _args, context: GraphQLContext) => {
    return context.prisma.profile.findMany();
  }
}

export const getProfile = {
  type: ProfileType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_, args: { id: string }, context: GraphQLContext) => {
    return await context.prisma.profile.findUnique({
      where: {
        id: args.id,
      },
    });
  }
}