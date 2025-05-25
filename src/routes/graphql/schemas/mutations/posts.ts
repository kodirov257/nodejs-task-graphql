import { GraphQLNonNull, GraphQLString } from 'graphql/index.js';

import { GraphQLContext } from '../../types/context.js';
import { UUIDType } from '../../types/uuid.js';
import { PostType } from '../../types/post-type.js';
import { CreatePostInput } from '../../dto/create-post-input.js';
import { ChangePostInput } from '../../dto/change-post-input.js';

export const createPost = {
  type: new GraphQLNonNull(PostType),
  args: {
    dto: { type: new GraphQLNonNull(CreatePostInput) },
  },
  resolve: async (_, args: { dto: { title: string, content: string, authorId: string } }, context: GraphQLContext) => {
    return context.prisma.post.create({
      data: args.dto,
    });
  },
};

export const changePost = {
  type: new GraphQLNonNull(PostType),
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(ChangePostInput) },
  },
  resolve: async (_, args: { id: string, dto: { title: string, content: string } }, context: GraphQLContext) => {
    return context.prisma.post.update({
      where: { id: args.id },
      data: args.dto,
    });
  }
};

export const deletePost = {
  type: new GraphQLNonNull(GraphQLString),
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_, args: { id: string }, context: GraphQLContext) => {
    await context.prisma.post.delete({
      where: {
        id: args.id,
      },
    });

    return args.id;
  }
};