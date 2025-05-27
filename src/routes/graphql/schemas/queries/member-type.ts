import { GraphQLContext } from '../../types/context.js';
import { MemberTypeId } from '../../../member-types/schemas.js';
import { GraphQLList, GraphQLNonNull } from 'graphql/index.js';
import { MemberType } from '../../types/member-type.js';
import { MemberTypeEnum } from '../../enums/member-type-enum.js';

export const getMemberTypes = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
  resolve: async (_, _args, context: GraphQLContext) => {
    return context.prisma.memberType.findMany();
  },
};

export const getMemberType = {
  type: new GraphQLNonNull(MemberType),
  args: {
    id: { type: new GraphQLNonNull(MemberTypeEnum) }
  },
  resolve: async (_, args: { id: MemberTypeId }, context: GraphQLContext) => {
    return await context.prisma.memberType.findUnique({
      where: {
        id: args.id,
      },
    });
  },
};