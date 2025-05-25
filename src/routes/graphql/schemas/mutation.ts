import { GraphQLObjectType } from 'graphql';
import { changeUser, createUser, deleteUser } from './mutations/users.js';

export const mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    createUser,
    changeUser,
    deleteUser,
  },
});