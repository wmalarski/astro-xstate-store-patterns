import { createStore } from "@xstate/store";

type WishlistStoreAddListEvent = {
  listId: string;
};

type WishlistStoreAddProductEvent = {
  productId: string;
  listId: string;
};

export type WishlistStoreUpdateEvent = {
  productId: string;
  fromListId: string;
  toListId: string;
};

export type WishlistStoreRemoveProductEvent = {
  listId: string;
  productId: string;
};

export type WishlistStoreRemoveListEvent = {
  listId: string;
};

type CreateWishlistStoreArgs = {
  initialLists?: Record<string, string[]>;
};

export const createWishlistStore = (args: CreateWishlistStoreArgs = {}) => {
  return createStore(
    { lists: args.initialLists ?? {} },
    {
      addList: (context, event: WishlistStoreAddListEvent) => {
        return {
          ...context,
          lists: {
            ...context.lists,
            [event.listId]: [],
          },
        };
      },
      addProduct: (context, event: WishlistStoreAddProductEvent) => {
        const list = context.lists[event.listId] ?? [];

        return {
          ...context,
          lists: {
            ...context.lists,
            [event.listId]: [...list, event.productId],
          },
        };
      },
      updateLists: (context, event: WishlistStoreUpdateEvent) => {
        const fromList = context.lists[event.fromListId];

        if (!fromList) {
          return context;
        }

        const updatedFromList = fromList.filter(
          (productId) => productId !== event.productId
        );

        const toList = context.lists[event.toListId] ?? [];
        const updatedToList = [...toList, event.productId];

        return {
          ...context,
          lists: {
            ...context.lists,
            [event.fromListId]: updatedFromList,
            [event.toListId]: updatedToList,
          },
        };
      },
      removeProduct: (context, event: WishlistStoreRemoveProductEvent) => {
        const list = context.lists[event.listId];

        if (!list) {
          return context;
        }

        const updated = list.filter(
          (productId) => productId !== event.productId
        );

        return {
          ...context,
          lists: {
            ...context.lists,
            [event.listId]: updated,
          },
        };
      },
      removeList: (context, event: WishlistStoreRemoveListEvent) => {
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

export type WishlistStore = ReturnType<typeof createWishlistStore>;
