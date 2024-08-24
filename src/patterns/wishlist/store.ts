import { createStore } from "@xstate/store";

export type WishlistProductGroup = {
  productId: string;
  note: string;
};

type CreateWishlistStoreArgs = {
  initialProductGroups?: WishlistProductGroup[];
};

type CreateWishlistStoreAddEvent = WishlistProductGroup;

type CreateWishlistStoreEditEvent = WishlistProductGroup;

type CreateWishlistStoreRemoveEvent = {
  productId: string;
};

export const createWishlistStore = ({
  initialProductGroups,
}: CreateWishlistStoreArgs = {}) => {
  return createStore(
    { productGroups: initialProductGroups ?? [] },
    {
      add: (context, event: CreateWishlistStoreAddEvent) => {
        return {
          ...context,
          productGroups: [...context.productGroups, event],
        };
      },
      edit: (context, event: CreateWishlistStoreEditEvent) => {
        return {
          ...context,
          productGroups: context.productGroups.map((product) =>
            product.productId === event.productId ? event : product
          ),
        };
      },
      remove: (context, event: CreateWishlistStoreRemoveEvent) => {
        return {
          ...context,
          productGroups: context.productGroups.filter(
            (product) => product.productId !== event.productId
          ),
        };
      },
    }
  );
};

export type WishlistStore = ReturnType<typeof createWishlistStore>;
