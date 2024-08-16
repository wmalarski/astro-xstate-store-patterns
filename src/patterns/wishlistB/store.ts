import { createStore } from "@xstate/store";

export type WishlistBProductGroup = {
  productId: string;
  category: string;
  note: string;
};

type CreateWishlistBStoreArgs = {
  initialProductGroups: WishlistBProductGroup[];
};

type CreateWishlistBStoreAddEvent = {
  productId: string;
  category: string;
};

type CreateWishlistBStoreRemoveEvent = {
  productId: string;
};

export const createWishlistBStore = ({
  initialProductGroups,
}: CreateWishlistBStoreArgs) => {
  return createStore(
    { productGroups: initialProductGroups },
    {
      add: (context, event: CreateWishlistBStoreAddEvent) => {
        return {
          ...context,
          productIds: [...context.productGroups, event.productId],
        };
      },
      remove: (context, event: CreateWishlistBStoreRemoveEvent) => {
        return {
          ...context,
          productIds: context.productGroups.filter(
            (product) => product.productId !== event.productId
          ),
        };
      },
    }
  );
};
