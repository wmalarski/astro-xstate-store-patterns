import { createStore } from "@xstate/store";

type CreateWishlistAStoreArgs = {
  initialProductIds: string[];
};

type CreateWishlistAStoreAddEvent = {
  productId: string;
};

type CreateWishlistAStoreRemoveEvent = {
  productId: string;
};

export const createWishlistAStore = ({
  initialProductIds,
}: CreateWishlistAStoreArgs) => {
  return createStore(
    { productIds: initialProductIds },
    {
      add: (context, event: CreateWishlistAStoreAddEvent) => {
        return {
          ...context,
          productIds: [...context.productIds, event.productId],
        };
      },
      remove: (context, event: CreateWishlistAStoreRemoveEvent) => {
        return {
          ...context,
          productIds: context.productIds.filter(
            (productId) => productId !== event.productId
          ),
        };
      },
    }
  );
};
