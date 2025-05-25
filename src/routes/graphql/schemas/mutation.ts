import { GraphQLObjectType } from 'graphql';
import { changeUser, createUser, deleteUser } from './mutations/users.js';
import { createPost, changePost, deletePost } from './mutations/posts.js';

export const mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    createUser,
    createPost,
    changeUser,
    changePost,
    deleteUser,
    deletePost,
  },
});