import { GraphQLObjectType } from 'graphql';

import { getMemberType, getMemberTypes } from './queries/member-type.js';
import { getUser, getUsers } from './queries/users.js';

export const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    memberTypes: getMemberTypes,
    memberType: getMemberType,
    users: getUsers,
    user: getUser,
  }
});