import { createStore } from "@xstate/store";

type WishlistProductGroup = {
  productId: string;
  note: string;
  listId: string;
};

export type WishlistStoreAddEvent = WishlistProductGroup;

export type WishlistStoreUpdateEvent = {
  productId: string;
  note?: string;
  listId?: string;
};

export type WishlistStoreRemoveEvent = {
  productId: string;
};

type CreateWishlistStoreArgs = {
  initialProductGroups?: WishlistProductGroup[];
};

export const createWishlistStore = ({
  initialProductGroups,
}: CreateWishlistStoreArgs = {}) => {
  return createStore(
    {
      products: Object.fromEntries(
        (initialProductGroups ?? []).map((product) => [
          product.productId,
          product,
        ])
      ),
    },
    {
      add: (context, event: WishlistStoreAddEvent) => {
        return {
          ...context,
          products: { ...context.products, [event.productId]: event },
        };
      },
      update: (context, event: WishlistStoreUpdateEvent) => {
        const product = context.products[event.productId];

        if (!product) {
          return context;
        }

        return {
          ...context,
          products: {
            ...context.products,
            [event.productId]: { ...product, ...event },
          },
        };
      },
      remove: (context, event: WishlistStoreRemoveEvent) => {
        if (!(event.productId in context.products)) {
          return context;
        }

        const updated = { ...context.products };
        delete updated[event.productId];

        return { ...context, products: updated };
      },
    }
  );
};

export type WishlistStore = ReturnType<typeof createWishlistStore>;
