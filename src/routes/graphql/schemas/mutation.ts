import { GraphQLObjectType } from 'graphql';
import { changeUser, createUser, deleteUser } from './mutations/users.js';
import { createPost, changePost, deletePost } from './mutations/posts.js';
import { createProfile, changeProfile, deleteProfile } from './mutations/profiles.js';
import { subscribeTo, unsubscribeFrom } from './mutations/user-subcription.js';

export const mutation = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    createUser,
    createPost,
    createProfile,
    changeUser,
    changePost,
    changeProfile,
    deleteUser,
    deletePost,
    deleteProfile,
    subscribeTo,
    unsubscribeFrom,
  },
});