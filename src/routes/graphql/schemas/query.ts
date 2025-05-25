import { GraphQLObjectType } from 'graphql';

import { getMemberType, getMemberTypes } from './queries/member-type.js';
import { getUser, getUsers } from './queries/users.js';
import { getPost, getPosts } from './queries/posts.js';
import { getProfile, getProfiles } from './queries/profiles.js';

export const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    memberTypes: getMemberTypes,
    memberType: getMemberType,
    users: getUsers,
    user: getUser,
    posts: getPosts,
    post: getPost,
    profiles: getProfiles,
    profile: getProfile,
  }
});