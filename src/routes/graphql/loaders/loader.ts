import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export type Loaders = ReturnType<typeof createLoaders>;

export function createLoaders(prisma: PrismaClient) {
  const userLoader = new DataLoader(async (ids: readonly string[]) => {
    const results = await prisma.user.findMany({
      where: {
        id: {
          in: [...ids],
        },
      },
    });
    return ids.map((id: string) => results.find(user => user.id === id) ?? null);
  });

  const profileLoader = new DataLoader(async (userIds: readonly string[]) => {
    const results = await prisma.profile.findMany({
      where: {
        userId: {
          in: [...userIds],
        },
      },
    });
    return userIds.map((id: string) => results.find(profile => profile.userId === id) ?? null);
  });

  const postLoader = new DataLoader(async (userIds: readonly string[]) => {
    const results = await prisma.post.findMany({
      where: {
        authorId: {
          in: [...userIds],
        },
      },
    });
    return userIds.map((id: string) => results.filter(profile => profile.authorId === id) ?? null);
  });

  const memberTypeLoader = new DataLoader(async (memberTypeIds: readonly string[]) => {
    const results = await prisma.memberType.findMany({
      where: {
        id: {
          in: [...memberTypeIds],
        },
      },
    });
    return memberTypeIds.map((id: string) => results.find(memberType => memberType.id === id) ?? null);
  });

  const subscriptionLoader = new DataLoader(async (subscriptionIds: readonly string[]) => {
    const results = await prisma.subscribersOnAuthors.findMany({
      include: {
        author: true,
      },
      where: {
        subscriberId: {
          in: [...subscriptionIds],
        },
      },
    });
    return subscriptionIds.map(
      (id: string) => results
        .filter(subscription => subscription.subscriberId === id)
        .map(subscription => subscription.author)
    );
  });

  const subscriberLoader = new DataLoader(async (subscriberIds: readonly string[]) => {
    const results = await prisma.subscribersOnAuthors.findMany({
      include: {
        subscriber: true,
      },
      where: {
        authorId: {
          in: [...subscriberIds],
        },
      },
    });
    return subscriberIds.map(
      (id: string) => results
        .filter(subscription => subscription.authorId === id)
        .map(subscription => subscription.subscriber)
    );
  });

  return {
    userLoader,
    profileLoader,
    postLoader,
    memberTypeLoader,
    subscriptionLoader,
    subscriberLoader
  };
}