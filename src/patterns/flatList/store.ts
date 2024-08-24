import { createStore } from "@xstate/store";

export type FlatListProductGroup = {
  listId: string;
  name: string;
  productIds: string[];
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

type FlatListStoreRemoveFromListEvent = {
  listId: string;
  productId: string;
};

type CreateFlatListStoreArgs = {
  initialLists: FlatListProductGroup[];
};

export const createFlatListStore = ({
  initialLists,
}: CreateFlatListStoreArgs) => {
  return createStore(
    { lists: initialLists },
    {
      addList: (context, args: FlatListStoreAddListEvent) => {
        return {
          ...context,
          lists: [...context.lists, { ...args, productIds: [] }],
        };
      },
      addToList: (context, event: FlatListStoreAddToListEvent) => {
        return {
          ...context,
          productIds: context.lists.map((list) =>
            list.listId === event.listId
              ? { ...list, productIds: [...list.productIds, event.productId] }
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
      removeFromList: (context, event: FlatListStoreRemoveFromListEvent) => {
        return {
          ...context,
          lists: context.lists.map((list) =>
            list.listId === event.listId
              ? {
                  ...list,
                  productIds: list.productIds.filter(
                    (productId) => productId !== event.productId
                  ),
                }
              : list
          ),
        };
      },
    }
  );
};

export type FlatListStore = ReturnType<typeof createFlatListStore>;
