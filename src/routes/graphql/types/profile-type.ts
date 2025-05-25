import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberType } from './member-type.js';
import { GraphQLContext } from './context.js';

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      resolve: async (parent: { memberTypeId: string }, _, context: GraphQLContext) => {
        return context.prisma.memberType.findUnique({
          where: {
            id: parent.memberTypeId,
          },
        });
      },
    },
  },
});