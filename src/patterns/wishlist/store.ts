import { createStore } from "@xstate/store";

type WishlistStoreAddListEvent = {
  listId: string;
  name: string;
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

export type WishlistStoreList = {
  listId: string;
  productIds: string[];
  name: string;
};

type CreateWishlistStoreArgs = {
  initialLists?: Record<string, WishlistStoreList>;
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
            [event.listId]: { ...event, productIds: [] },
          },
        };
      },
      addProduct: (context, event: WishlistStoreAddProductEvent) => {
        const list = context.lists[event.listId];

        if (!list) {
          return context;
        }

        return {
          ...context,
          lists: {
            ...context.lists,
            [event.listId]: {
              ...list,
              productIds: [...list.productIds, event.productId],
            },
          },
        };
      },
      updateLists: (context, event: WishlistStoreUpdateEvent) => {
        const fromList = context.lists[event.fromListId];
        const toList = context.lists[event.toListId];

        if (!fromList || !toList) {
          return context;
        }

        const updatedFromList = fromList.productIds.filter(
          (productId) => productId !== event.productId
        );

        const updatedToList = [...toList.productIds, event.productId];

        return {
          ...context,
          lists: {
            ...context.lists,
            [event.fromListId]: { ...fromList, updatedFromList },
            [event.toListId]: { ...toList, updatedToList },
          },
        };
      },
      removeProduct: (context, event: WishlistStoreRemoveProductEvent) => {
        const list = context.lists[event.listId];

        if (!list) {
          return context;
        }

        const updated = list.productIds.filter(
          (productId) => productId !== event.productId
        );

        return {
          ...context,
          lists: {
            ...context.lists,
            [event.listId]: { ...list, productIds: updated },
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
