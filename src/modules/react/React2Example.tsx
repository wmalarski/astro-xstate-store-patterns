import { type FC } from "react";
import * as NestedList from "../../patterns/nestedList";
import type { Product } from "../../patterns/products/types";
import * as Wishlist from "../../patterns/wishlist";
import { nestedStore, wishlistStore } from "../stores";
import { NestedWishlist } from "./NestedWishlist";
import { ProductList } from "./ProductList";

type React2ExampleProps = {
  products: Product[];
};

export const React2Example: FC<React2ExampleProps> = ({ products }) => {
  const wishlistApi = Wishlist.connect(wishlistStore);
  const nestedListApi = NestedList.connect(nestedStore);

  return (
    <div data-theme="retro" className="grid grid-cols-[auto_1fr] gap-2 p-4">
      <ProductList products={products} wishlistApi={wishlistApi} />
      <NestedWishlist
        products={products}
        nestedListApi={nestedListApi}
        wishlistApi={wishlistApi}
      />
    </div>
  );
};
