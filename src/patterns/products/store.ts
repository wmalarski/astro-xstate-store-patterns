import { createStore } from "@xstate/store";
import type { Product } from "./types";

type CreateProductsStoreArgs = {
  initialProducts: Product[];
};

export const createProductAStore = ({
  initialProducts,
}: CreateProductsStoreArgs) => {
  return createStore({ products: initialProducts }, {});
};
