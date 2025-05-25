import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';

import { MemberType } from '../types/member-type.js';
import { MemberTypeEnum } from '../enums/member-type-enum.js';
import { getMemberType, getMemberTypes } from './queries/member-type.js';

export const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MemberType))),
      resolve: getMemberTypes,
    },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      args: {
        id: { type: new GraphQLNonNull(MemberTypeEnum) }
      },
      resolve: getMemberType,
    }
  }
});