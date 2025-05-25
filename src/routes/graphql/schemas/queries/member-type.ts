import { GraphQLContext } from '../../types/context.js';
import { MemberTypeId } from '../../../member-types/schemas.js';

export const getMemberTypes = async (_, _args, context: GraphQLContext) => {
  return context.prisma.memberType.findMany();
}

export const getMemberType = async (_, args: { id: MemberTypeId }, context: GraphQLContext) => {
  const memberType = await context.prisma.memberType.findUnique({
    where: {
      id: args.id,
    },
  });
  if (memberType === null) {
    throw context.httpErrors.notFound();
  }
  return memberType;
};