import { createStore } from "@xstate/store";

export type WishlistBProductGroup = {
  productId: string;
  note: string;
};

type CreateWishlistBStoreArgs = {
  initialProductGroups: WishlistBProductGroup[];
};

type CreateWishlistBStoreAddEvent = WishlistBProductGroup;

type CreateWishlistBStoreEditEvent = WishlistBProductGroup;

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
          productGroups: [...context.productGroups, event],
        };
      },
      edit: (context, event: CreateWishlistBStoreEditEvent) => {
        return {
          ...context,
          productGroups: context.productGroups.map((product) =>
            product.productId === event.productId ? event : product
          ),
        };
      },
      remove: (context, event: CreateWishlistBStoreRemoveEvent) => {
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

export type WishlistBStore = ReturnType<typeof createWishlistBStore>;
