import { GraphQLList, GraphQLNonNull } from 'graphql';

import { GraphQLContext } from '../../types/context.js';
import { UUIDType } from '../../types/uuid.js';
import { PostType } from '../../types/post-type.js';

export const getPosts = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
  resolve: async (_, _args, context: GraphQLContext) => {
    return context.prisma.post.findMany();
  }
}

export const getPost = {
  type: PostType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_, args: { id: string }, context: GraphQLContext) => {
    return await context.prisma.post.findUnique({
      where: {
        id: args.id,
      },
    });
  }
}