import { createStore } from "@xstate/store";

export type FlatListBProductGroup = {
  listId: string;
  name: string;
  productIds: string[];
};

type CreateFlatListStoreArgs = {
  initialList: FlatListBProductGroup[];
};

type FlatListStoreAddListEvent = {
  listId: string;
  name: string;
};

type FlatListStoreAddToListEvent = {
  listId: string;
  productId: string;
};

type FlatListStoreRemoveListEvent = {
  listId: string;
};

export const createFlatListStore = ({
  initialList,
}: CreateFlatListStoreArgs) => {
  return createStore(
    { lists: initialList },
    {
      addList: (context, { listId, name }: FlatListStoreAddListEvent) => {
        return {
          ...context,
          lists: [...context.lists, { listId, name, productIds: [] }],
        };
      },
      addToList: (
        context,
        { listId, productId }: FlatListStoreAddToListEvent
      ) => {
        return {
          ...context,
          productIds: context.lists.map((list) =>
            list.listId === listId
              ? { ...list, productIds: [...list.productIds, productId] }
              : list
          ),
        };
      },
      removeList: (context, event: FlatListStoreRemoveListEvent) => {
        return {
          ...context,
          lists: context.lists.filter((list) => list.listId !== event.listId),
        };
      },
      removeFromList: (context, event: FlatListStoreRemoveListEvent) => {
        return {
          ...context,
          lists: context.lists.filter((list) => list.listId !== event.listId),
        };
      },
    }
  );
};

export type FlatListStore = ReturnType<typeof createFlatListStore>;
