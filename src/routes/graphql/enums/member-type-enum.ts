import { GraphQLEnumType } from 'graphql';

export const MemberTypeEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: {value: 'BASIC'},
    BUSINESS: {value: 'BUSINESS'},
  }
});