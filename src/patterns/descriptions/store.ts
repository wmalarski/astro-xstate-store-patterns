import { createStore } from "@xstate/store";

export type DescriptionsStoreSetEvent = {
  listId: string;
  description: string;
};

export type DescriptionsStoreRemoveEvent = {
  listId: string;
};

type CreateDescriptionsStoreArgs = {
  initialLists?: Record<string, string>;
};

export const createDescriptionStore = ({
  initialLists,
}: CreateDescriptionsStoreArgs = {}) => {
  return createStore(
    { lists: initialLists ?? {} },
    {
      set: (context, event: DescriptionsStoreSetEvent) => {
        return {
          ...context,
          lists: { ...context.lists, [event.listId]: event.description },
        };
      },
      remove: (context, event: DescriptionsStoreRemoveEvent) => {
        if (!(event.listId in context.lists)) {
          return context;
        }

        const updated = { ...context.lists };
        delete updated[event.listId];

        return { ...context, lists: updated };
      },
    }
  );
};

export type DescriptionsStore = ReturnType<typeof createDescriptionStore>;
