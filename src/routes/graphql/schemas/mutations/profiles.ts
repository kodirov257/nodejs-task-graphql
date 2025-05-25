import { GraphQLNonNull, GraphQLString } from 'graphql/index.js';

import { GraphQLContext } from '../../types/context.js';
import { UUIDType } from '../../types/uuid.js';
import { ProfileType } from '../../types/profile-type.js';
import { CreateProfileInput } from '../../dto/create-profile-input.js';
import { ChangeProfileInput } from '../../dto/change-profile-input.js';

export const createProfile = {
  type: new GraphQLNonNull(ProfileType),
  args: {
    dto: { type: new GraphQLNonNull(CreateProfileInput) },
  },
  resolve: async (_, args: { dto: { isMale: boolean, yearOfBirth: number, userId: string, memberTypeId: string } }, context: GraphQLContext) => {
    return context.prisma.profile.create({
      data: args.dto,
    });
  },
};

export const changeProfile = {
  type: new GraphQLNonNull(ProfileType),
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(ChangeProfileInput) },
  },
  resolve: async (_, args: { id: string, dto: { isMale: boolean, yearOfBirth: number, memberTypeId: string } }, context: GraphQLContext) => {
    return context.prisma.profile.update({
      where: { id: args.id },
      data: args.dto,
    });
  }
};

export const deleteProfile = {
  type: new GraphQLNonNull(GraphQLString),
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_, args: { id: string }, context: GraphQLContext) => {
    await context.prisma.profile.delete({
      where: {
        id: args.id,
      },
    });

    return args.id;
  }
};