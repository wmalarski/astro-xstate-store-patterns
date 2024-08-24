import { createStore } from "@xstate/store";
import type { Product } from "./types";

type CreateProductsStoreArgs = {
  initialProducts: Product[];
};

export const createProductsStore = ({
  initialProducts,
}: CreateProductsStoreArgs) => {
  return createStore({ products: initialProducts }, {});
};
