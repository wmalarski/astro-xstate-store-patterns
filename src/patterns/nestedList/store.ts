import { createStore } from "@xstate/store";

export type NestedProductGroup = {
  listId: string;
  name: string;
  productIds: string[];
  parentsIds: string[];
};

type CreateNestedStoreArgs = {
  initialLists: NestedProductGroup[];
};

type NestedStoreAddListEvent = {
  listId: string;
  name: string;
  parentsIds: string[];
};

type NestedStoreAddToListEvent = {
  listId: string;
  productId: string;
};

export type NestedStoreSetParentsEvent = {
  listId: string;
  parentsIds: string[];
};

type NestedStoreRemoveListEvent = {
  listId: string;
};

type NestedStoreRemoveFromListEvent = {
  listId: string;
  productId: string;
};

export const createNestedStore = ({ initialLists }: CreateNestedStoreArgs) => {
  return createStore(
    { lists: initialLists },
    {
      addList: (context, event: NestedStoreAddListEvent) => {
        return {
          ...context,
          lists: [...context.lists, { ...event, productIds: [] }],
        };
      },
      addToList: (context, event: NestedStoreAddToListEvent) => {
        return {
          ...context,
          productIds: context.lists.map((list) =>
            list.listId === event.listId
              ? { ...list, productIds: [...list.productIds, event.productId] }
              : list
          ),
        };
      },
      setParents: (context, event: NestedStoreSetParentsEvent) => {
        return {
          ...context,
          productIds: context.lists.map((list) =>
            list.listId === event.listId
              ? { ...list, parentsIds: event.parentsIds }
              : list
          ),
        };
      },
      removeList: (context, event: NestedStoreRemoveListEvent) => {
        return {
          ...context,
          lists: context.lists.filter((list) => list.listId !== event.listId),
        };
      },
      removeFromList: (context, event: NestedStoreRemoveFromListEvent) => {
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

export type NestedStore = ReturnType<typeof createNestedStore>;
