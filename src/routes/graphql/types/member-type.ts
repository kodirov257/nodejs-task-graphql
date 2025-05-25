import { GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';

import { MemberTypeEnum } from '../enums/member-type-enum.js';

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: {
    id: { type: new GraphQLNonNull(MemberTypeEnum) },
    discount: { type: new GraphQLNonNull(GraphQLFloat) },
    postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
  }
});