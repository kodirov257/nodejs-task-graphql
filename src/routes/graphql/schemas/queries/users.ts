import { GraphQLResolveInfo } from 'graphql/type/definition.js';
import { parseResolveInfo } from 'graphql-parse-resolve-info';
import { GraphQLList, GraphQLNonNull } from 'graphql';
import { User } from '@prisma/client';

import { UserType } from '../../types/user-type.js';
import { GraphQLContext } from '../../types/context.js';
import { UUIDType } from '../../types/uuid.js';

export const getUsers = {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
  resolve: async (_, _args, context: GraphQLContext, info: GraphQLResolveInfo) => {
    const parsedResolveInfo = parseResolveInfo(info);
    const fields = parsedResolveInfo?.fieldsByTypeName?.User ?? {};
    const needSubscriptions = 'userSubscribedTo' in fields;
    const needSubscribers = 'subscribedToUser' in fields;


    const users = await context.prisma.user.findMany({
      include: {
        userSubscribedTo: needSubscriptions,
        subscribedToUser: needSubscribers,
      },
    });

    for (const user of users) {
      if (needSubscriptions) {
        const subscriptions = user.userSubscribedTo.map((sub) =>
          users.find((u) => u.id === sub.authorId),
        );
        context.loaders.subscriptionLoader.prime(user.id, subscriptions as User[]);
      }

      if (needSubscribers) {
        const subscribers = user.subscribedToUser.map((sub) =>
          users.find((u) => u.id === sub.subscriberId),
        );
        context.loaders.subscriberLoader.prime(user.id, subscribers as User[]);
      }
    }

    return users;
  }
}

export const getUser = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_, args: { id: string }, context: GraphQLContext) => {
    return await context.loaders.userLoader.load(args.id);
  }
}